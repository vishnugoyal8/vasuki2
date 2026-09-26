import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

export const DataTable = ({
  columns,
  data = [],
  searchKey = '',
  searchPlaceholder = 'Search records...',
  pageSize = 6,
  onRowClick,
  actionButton,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Filter
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const term = searchTerm.toLowerCase();
    return data.filter(item => {
      if (searchKey && item[searchKey]) {
        return String(item[searchKey]).toLowerCase().includes(term);
      }
      return Object.values(item).some(val =>
        String(val).toLowerCase().includes(term)
      );
    });
  }, [data, searchTerm, searchKey]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      if (aVal === bVal) return 0;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return sortDirection === 'asc' ? -1 : 1;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key) => {
    if (sortColumn === key) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(key);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#DDE3E8] shadow-2xs overflow-hidden">
      {/* Search & Actions Bar */}
      <div className="p-4 border-b border-[#DDE3E8] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F7F8FA]">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#8A8A8A] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-[#DDE3E8] rounded text-[#222222] placeholder:text-[#8A8A8A] focus:border-[#0056A6] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-[#666666] font-medium">
            Showing <strong className="text-[#003B70]">{filteredData.length}</strong> entries
          </span>
          {actionButton}
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#E8F1F8] text-[#003B70] font-bold uppercase tracking-wider text-[11px] border-b border-[#DDE3E8]">
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`py-3 px-4 ${col.sortable ? 'cursor-pointer hover:bg-[#DDE3E8]/50 select-none' : ''} ${col.className || ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.label}</span>
                    {col.sortable && <ArrowUpDown className="w-3 h-3 text-[#0056A6]" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDE3E8]">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`hover:bg-[#F7F8FA] transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                >
                  {columns.map(col => (
                    <td key={col.key} className={`py-3 px-4 text-[#222222] ${col.cellClassName || ''}`}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-[#666666]">
                  No records match your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="px-4 py-3 border-t border-[#DDE3E8] flex items-center justify-between text-xs text-[#666666] bg-[#F7F8FA]">
        <div>
          Page <strong className="text-[#003B70]">{currentPage}</strong> of <strong className="text-[#003B70]">{totalPages}</strong>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded border border-[#DDE3E8] bg-white text-[#222222] hover:bg-[#E8F1F8] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded border border-[#DDE3E8] bg-white text-[#222222] hover:bg-[#E8F1F8] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
