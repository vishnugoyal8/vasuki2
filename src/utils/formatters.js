export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return 'N/A';
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatPercentage = (val) => {
  if (val === null || val === undefined) return '0%';
  return `${val}%`;
};

export const formatNumber = (num) => {
  if (!num && num !== 0) return '0';
  return Number(num).toLocaleString('en-IN');
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
};
