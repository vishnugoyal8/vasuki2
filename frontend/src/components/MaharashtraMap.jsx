import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MAHARASHTRA_DISTRICTS_DATA } from '../data/districts.data.js';
import {
  MapPin,
  ArrowRight,
  Search,
  Layers,
  Globe,
  RotateCcw,
  CheckCircle2,
  Building2,
  Briefcase,
  AlertTriangle,
  Compass,
  ExternalLink,
} from 'lucide-react';

// Free, Public Tile Providers — 100% Free, ZERO API Key Required
const TILE_PROVIDERS = [
  {
    id: 'osm-standard',
    name: 'OpenStreetMap',
    label: 'Street (OSM)',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  },
  {
    id: 'osm-hot',
    name: 'Humanitarian OSM',
    label: 'Humanitarian',
    url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors, HOT',
    maxZoom: 19,
  },
  {
    id: 'esri-satellite',
    name: 'ESRI Satellite',
    label: 'Satellite (ESRI)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, Maxar, Earthstar Geographics',
    maxZoom: 18,
  },
  {
    id: 'esri-street',
    name: 'ESRI Street Map',
    label: 'Terrain / Topo',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri &mdash; National Geographic, DeLorme',
    maxZoom: 18,
  },
];

const DIVISIONS = ['All', 'Konkan', 'Pune', 'Nashik', 'Chhatrapati Sambhajinagar', 'Amravati', 'Nagpur'];

// Helper to center the map dynamically when district selection changes
// Shifting center slightly North (lat + 0.30) positions the marker lower on the canvas,
// giving maximum headroom for the popup to open without clipping against the top boundary.
const MapController = ({ targetDistrict, resetKey }) => {
  const map = useMap();

  useEffect(() => {
    if (resetKey > 0) {
      map.flyTo([19.25, 76.5], 7, { duration: 1.0 });
      return;
    }
    if (targetDistrict && targetDistrict.lat && targetDistrict.lng) {
      map.flyTo([targetDistrict.lat + 0.32, targetDistrict.lng], 8, { duration: 0.9 });
    }
  }, [targetDistrict, resetKey, map]);

  return null;
};

export const MaharashtraMap = ({
  selectedDistrict,
  onSelectDistrict,
  onOpenDsdpPlan,
}) => {
  const [selectedProviderId, setSelectedProviderId] = useState('osm-standard');
  const [activeDivision, setActiveDivision] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const activeProvider = useMemo(
    () => TILE_PROVIDERS.find(p => p.id === selectedProviderId) || TILE_PROVIDERS[0],
    [selectedProviderId]
  );

  const activeDistrictObj = useMemo(() => {
    return (
      MAHARASHTRA_DISTRICTS_DATA.find(
        d => d.name.toLowerCase() === (selectedDistrict || '').toLowerCase()
      ) || MAHARASHTRA_DISTRICTS_DATA[0]
    );
  }, [selectedDistrict]);

  // Filtered districts list for the quick pill selector
  const filteredDistricts = useMemo(() => {
    return MAHARASHTRA_DISTRICTS_DATA.filter(dist => {
      const matchesDivision =
        activeDivision === 'All' || dist.division === activeDivision;
      const matchesSearch =
        !searchQuery ||
        dist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dist.topSector && dist.topSector.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesDivision && matchesSearch;
    });
  }, [activeDivision, searchQuery]);

  // Custom marker icon with precise popupAnchor to prevent popup overlap
  const createCustomIcon = (district, isSelected) => {
    const isCritical = district.demandScore >= 85;
    const isHigh = district.demandScore >= 75 && district.demandScore < 85;

    const ringColor = isCritical ? '#DC2626' : isHigh ? '#F59E0B' : '#0056A6';
    const bgColor = isSelected ? '#003B70' : '#FFFFFF';
    const textColor = isSelected ? '#FFFFFF' : '#1F2937';
    const pulseStyle = isSelected
      ? 'box-shadow: 0 0 0 4px rgba(0, 86, 166, 0.35), 0 4px 10px rgba(0,0,0,0.25);'
      : 'box-shadow: 0 2px 5px rgba(0,0,0,0.15);';

    const html = `
      <div style="
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        background: ${bgColor};
        color: ${textColor};
        padding: 4px 8px;
        border-radius: 5px;
        ${pulseStyle}
        border: 2px solid ${ringColor};
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        transform: translate(-50%, -50%);
        white-space: nowrap;
        user-select: none;
      ">
        <span style="
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${ringColor};
          flex-shrink: 0;
        "></span>
        <span>${district.name}</span>
        <span style="
          background: ${isCritical ? '#FEE2E2' : isHigh ? '#FEF3C7' : '#E8F1F8'};
          color: ${isCritical ? '#DC2626' : isHigh ? '#B45309' : '#0056A6'};
          padding: 1px 4px;
          border-radius: 3px;
          font-size: 10px;
          font-weight: 800;
        ">${district.demandScore}</span>
      </div>
    `;

    return L.divIcon({
      className: 'custom-leaflet-pin',
      html,
      iconSize: [120, 28],
      iconAnchor: [60, 14],
      popupAnchor: [0, -18],
    });
  };

  return (
    <div className="space-y-2.5 font-sans">
      {/* Top Filter & Toolbar */}
      <div className="bg-white p-2.5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[170px] max-w-xs">
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-[#888888]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search district or trade..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F7F8FA] border border-[#DDE3E8] rounded-md focus:bg-white focus:outline-none focus:border-[#0056A6] transition-colors"
            />
          </div>

          {/* Division Dropdown for compact fit */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-[#666666] hidden sm:inline">Division:</span>
            <select
              value={activeDivision}
              onChange={e => setActiveDivision(e.target.value)}
              className="px-2.5 py-1.5 bg-[#F7F8FA] border border-[#DDE3E8] rounded-md text-xs font-semibold text-[#003B70] focus:outline-none focus:border-[#0056A6] cursor-pointer"
            >
              {DIVISIONS.map(div => (
                <option key={div} value={div}>
                  {div === 'All' ? 'All Divisions (36)' : div}
                </option>
              ))}
            </select>
          </div>

          {/* Right Action Icons: Reset View + Layer Switcher */}
          <div className="flex items-center gap-1.5 ml-auto">
            <button
              type="button"
              onClick={() => setResetKey(prev => prev + 1)}
              className="flex items-center gap-1 px-2 py-1.5 bg-[#F7F8FA] hover:bg-[#E8F1F8] text-[#555555] hover:text-[#003B70] border border-[#DDE3E8] rounded-md text-xs font-semibold cursor-pointer transition-colors"
              title="Reset State Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset</span>
            </button>

            {/* Free Layer Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLayerMenu(!showLayerMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F7F8FA] hover:bg-[#E8F1F8] text-[#003B70] border border-[#DDE3E8] rounded-md text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
                title="Switch Map Tiles (100% Free - No API Key)"
              >
                <Layers className="w-3.5 h-3.5 text-[#0056A6]" />
                <span>{activeProvider.label}</span>
              </button>

              {showLayerMenu && (
                <div className="absolute right-0 top-full mt-1.5 z-30 w-52 bg-white rounded-lg border border-[#DDE3E8] shadow-lg p-1.5 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#888888] px-2 py-1">
                    Free Map Provider (No Key)
                  </div>
                  {TILE_PROVIDERS.map(prov => (
                    <button
                      key={prov.id}
                      type="button"
                      onClick={() => {
                        setSelectedProviderId(prov.id);
                        setShowLayerMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                        selectedProviderId === prov.id
                          ? 'bg-[#E8F1F8] text-[#003B70] font-bold'
                          : 'hover:bg-[#F7F8FA] text-[#444444]'
                      }`}
                    >
                      <span>{prov.name}</span>
                      {selectedProviderId === prov.id && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0056A6]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick District Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar text-xs border-t border-[#F0F2F5] pt-2">
          <span className="text-[#888888] font-bold whitespace-nowrap text-[10px] uppercase tracking-wider mr-1">
            Districts ({filteredDistricts.length}):
          </span>
          {filteredDistricts.map(d => {
            const isSelected = d.name.toLowerCase() === (selectedDistrict || '').toLowerCase();
            return (
              <button
                key={d.id}
                onClick={() => onSelectDistrict(d.name)}
                className={`px-2 py-1 rounded text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#0056A6] text-white border-[#0056A6] shadow-2xs ring-2 ring-[#0056A6]/20'
                    : 'bg-white text-[#555555] hover:bg-[#F7F8FA] border-[#DDE3E8]'
                }`}
              >
                {d.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Map Canvas */}
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-[#DDE3E8] shadow-2xs bg-[#F7F8FA]">
        <MapContainer
          center={[19.25, 76.5]}
          zoom={7}
          scrollWheelZoom={false}
          className="w-full h-full z-0"
        >
          {/* Tile Layer: 100% Free, No Key */}
          <TileLayer
            key={activeProvider.id}
            url={activeProvider.url}
            attribution={activeProvider.attribution}
            maxZoom={activeProvider.maxZoom}
          />

          <MapController targetDistrict={activeDistrictObj} resetKey={resetKey} />

          {/* District Pins with Proportional Header Offset Popups */}
          {MAHARASHTRA_DISTRICTS_DATA.map(dist => {
            const isSelected = dist.name.toLowerCase() === (selectedDistrict || '').toLowerCase();
            const icon = createCustomIcon(dist, isSelected);

            return (
              <Marker
                key={dist.id}
                position={[dist.lat, dist.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => onSelectDistrict(dist.name),
                }}
              >
                <Popup
                  className="gov-district-popup"
                  offset={[0, -14]}
                  autoPan={true}
                  autoPanPadding={[25, 25]}
                  closeButton={true}
                >
                  <div className="p-3 bg-white space-y-2.5">
                    {/* Header: Name + Division + Score */}
                    <div className="flex items-start justify-between gap-2 border-b border-[#EAEAEA] pb-2">
                      <div>
                        <div className="font-bold text-[#003B70] text-sm leading-snug">
                          {dist.name} District
                        </div>
                        <div className="text-[10px] text-[#666666] font-medium">
                          {dist.division ? `${dist.division} Division` : 'Maharashtra'}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border shrink-0 ${
                          dist.demandScore >= 85
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : dist.demandScore >= 75
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-blue-50 text-[#0056A6] border-blue-200'
                        }`}
                      >
                        Score {dist.demandScore}/100
                      </span>
                    </div>

                    {/* Compact Metrics Grid */}
                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      <div className="bg-[#F7F8FA] p-1.5 rounded border border-[#EAEAEA]">
                        <span className="text-[#666666] block text-[10px]">Active Jobs</span>
                        <strong className="text-[#003B70] font-bold">
                          {dist.activeJobCount?.toLocaleString() || '1,200+'}
                        </strong>
                      </div>
                      <div className="bg-[#F7F8FA] p-1.5 rounded border border-[#EAEAEA]">
                        <span className="text-[#666666] block text-[10px]">Govt ITIs / VTPs</span>
                        <strong className="text-[#222222] font-bold">
                          {dist.itiCount || 18} Centers
                        </strong>
                      </div>
                    </div>

                    {/* Sector Info */}
                    <div className="text-[11px] text-[#444444] bg-[#F7F8FA] p-1.5 rounded border border-[#EAEAEA]">
                      <span className="text-[#888888] text-[10px] block font-semibold">Primary Industrial Sector:</span>
                      <span className="font-semibold text-[#222222] line-clamp-1">{dist.topSector}</span>
                    </div>

                    {/* Dynamic Action Buttons */}
                    {isSelected ? (
                      <div className="space-y-1.5 pt-1">
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            if (onOpenDsdpPlan) {
                              onOpenDsdpPlan(dist.name);
                            }
                          }}
                          className="w-full py-2 px-3 rounded text-xs font-bold bg-[#003B70] hover:bg-[#002850] text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <span>Open {dist.name} DSDP Studio</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <div className="text-[10px] text-center text-[#198754] font-semibold flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#198754]" />
                          <span>Active in current dashboard view</span>
                        </div>
                      </div>
                    ) : (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            onSelectDistrict(dist.name);
                          }}
                          className="w-full py-2 px-3 rounded text-xs font-bold bg-[#F28C28] hover:bg-[#D96B1F] text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <span>Filter Dashboard to {dist.name}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Floating Legend Bottom Left */}
        <div className="absolute bottom-3 left-3 z-10 bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-[#DDE3E8] shadow-sm text-xs pointer-events-auto">
          <div className="font-bold text-[#003B70] mb-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#0056A6]" />
            <span>Interactive GIS Labour Map</span>
          </div>
          <div className="text-[10px] text-[#666666] mb-1.5">
            Click any district pin or button to filter statewide data.
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" />
              <span className="text-[#555555] font-medium">Critical (85+)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <span className="text-[#555555] font-medium">High (75-84)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0056A6]" />
              <span className="text-[#555555] font-medium">Aligned (&lt;75)</span>
            </div>
          </div>
        </div>

        {/* Free Map Indicator Bottom Right */}
        <div className="absolute bottom-3 right-3 z-10 bg-white/90 backdrop-blur-xs px-2 py-1 rounded border border-[#DDE3E8] shadow-2xs text-[10px] text-[#555555] hidden sm:flex items-center gap-1 pointer-events-none">
          <Globe className="w-3 h-3 text-[#198754]" />
          <span>OpenStreetMap Leaflet GIS (Zero API Key)</span>
        </div>
      </div>
    </div>
  );
};

export default MaharashtraMap;
