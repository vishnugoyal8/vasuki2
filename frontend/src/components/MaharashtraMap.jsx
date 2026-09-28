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
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  Building2,
  Briefcase,
  AlertTriangle,
} from 'lucide-react';

// Free, Public Tile Providers — 100% Free, NO API Key Required
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
    attribution: '&copy; Esri &mdash; National Geographic, DeLorme, NAVTEQ',
    maxZoom: 18,
  },
];

// Administrative divisions of Maharashtra
const DIVISIONS = ['All', 'Konkan', 'Pune', 'Nashik', 'Chhatrapati Sambhajinagar', 'Amravati', 'Nagpur'];

// Helper to center the map dynamically when district selection changes
const MapRecenter = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 8, { duration: 1.2 });
    }
  }, [lat, lng, map]);
  return null;
};

export const MaharashtraMap = ({ selectedDistrict, onSelectDistrict }) => {
  const [selectedProviderId, setSelectedProviderId] = useState('osm-standard');
  const [activeDivision, setActiveDivision] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLayerMenu, setShowLayerMenu] = useState(false);

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
        dist.topSector.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDivision && matchesSearch;
    });
  }, [activeDivision, searchQuery]);

  // Dynamic custom marker icon using pure HTML/CSS (avoids Leaflet missing PNG bug)
  const createCustomIcon = (district, isSelected) => {
    const isCritical = district.demandScore >= 85;
    const isHigh = district.demandScore >= 75 && district.demandScore < 85;

    const ringColor = isCritical ? '#DC2626' : isHigh ? '#F59E0B' : '#0056A6';
    const bgColor = isSelected ? '#003B70' : '#FFFFFF';
    const textColor = isSelected ? '#FFFFFF' : '#1F2937';
    const pulseStyle = isSelected
      ? 'box-shadow: 0 0 0 4px rgba(0, 86, 166, 0.35), 0 4px 12px rgba(0,0,0,0.25);'
      : 'box-shadow: 0 2px 6px rgba(0,0,0,0.18);';

    const html = `
      <div style="
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: ${bgColor};
        color: ${textColor};
        padding: 5px 9px;
        border-radius: 6px;
        ${pulseStyle}
        border: 2px solid ${ringColor};
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        transform: translate(-50%, -50%);
        white-space: nowrap;
        user-select: none;
        transition: transform 0.15s ease;
      ">
        <span style="
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${ringColor};
          flex-shrink: 0;
        "></span>
        <span>${district.name}</span>
        <span style="
          background: ${isCritical ? '#FEE2E2' : isHigh ? '#FEF3C7' : '#E8F1F8'};
          color: ${isCritical ? '#DC2626' : isHigh ? '#B45309' : '#0056A6'};
          padding: 1px 5px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 800;
        ">${district.demandScore}</span>
      </div>
    `;

    return L.divIcon({
      className: 'custom-leaflet-pin',
      html,
      iconSize: [130, 32],
      iconAnchor: [65, 16],
    });
  };

  return (
    <div className="space-y-3 font-sans">
      {/* Controls Bar: Division Filters + Search + Free Tile Provider Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white p-2.5 rounded-lg border border-[#DDE3E8] shadow-2xs">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-[#666666]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search district or trade..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F7F8FA] border border-[#DDE3E8] rounded-md focus:bg-white focus:outline-none focus:border-[#0056A6] transition-colors"
          />
        </div>

        {/* Division Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          {DIVISIONS.map(div => {
            const isDivActive = activeDivision === div;
            return (
              <button
                key={div}
                type="button"
                onClick={() => setActiveDivision(div)}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  isDivActive
                    ? 'bg-[#003B70] text-white border-[#003B70] shadow-2xs'
                    : 'bg-white text-[#555555] hover:bg-[#F7F8FA] border-[#DDE3E8]'
                }`}
              >
                {div === 'All' ? 'All (36)' : div}
              </button>
            );
          })}
        </div>

        {/* Free Map Tile Layer Selector (100% Key-Free) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F7F8FA] hover:bg-[#E8F1F8] text-[#003B70] border border-[#DDE3E8] rounded-md text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
            title="Switch Free Map View (No API Key Required)"
          >
            <Layers className="w-3.5 h-3.5 text-[#0056A6]" />
            <span className="hidden sm:inline">{activeProvider.label}</span>
          </button>

          {showLayerMenu && (
            <div className="absolute right-0 top-full mt-1.5 z-30 w-52 bg-white rounded-lg border border-[#DDE3E8] shadow-lg p-2 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#888888] px-2 py-1">
                Free Tile Layer (No Key)
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

      {/* Quick District Selector Pills (Filtered) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-[#666666] font-semibold whitespace-nowrap text-[11px] flex items-center gap-1">
          <Compass className="w-3 h-3 text-[#0056A6]" />
          District:
        </span>
        {filteredDistricts.map(d => {
          const isSelected = d.name.toLowerCase() === (selectedDistrict || '').toLowerCase();
          return (
            <button
              key={d.id}
              onClick={() => onSelectDistrict(d.name)}
              className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-[#0056A6] text-white border-[#0056A6] shadow-2xs ring-2 ring-[#0056A6]/20'
                  : 'bg-white text-[#666666] hover:bg-[#F7F8FA] border-[#DDE3E8]'
              }`}
            >
              {d.name}
            </button>
          );
        })}
      </div>

      {/* Main Leaflet Interactive Map Container */}
      <div className="relative w-full h-[460px] rounded-lg overflow-hidden border border-[#DDE3E8] shadow-2xs bg-[#F7F8FA]">
        <MapContainer
          center={[19.3, 76.2]}
          zoom={7}
          scrollWheelZoom={false}
          className="w-full h-full z-0"
        >
          {/* Tile Layer: OpenStreetMap Standard by default (100% Free, NO API Key) */}
          <TileLayer
            key={activeProvider.id}
            url={activeProvider.url}
            attribution={activeProvider.attribution}
            maxZoom={activeProvider.maxZoom}
          />

          <MapRecenter lat={activeDistrictObj.lat} lng={activeDistrictObj.lng} />

          {/* District Markers with Custom HTML Pin */}
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
                <Popup className="gov-district-popup">
                  <div className="p-1.5 min-w-[240px]">
                    <div className="flex items-center justify-between gap-2 border-b border-[#DDE3E8] pb-2 mb-2">
                      <div>
                        <div className="font-bold text-[#003B70] text-sm leading-tight">
                          {dist.name} District
                        </div>
                        <div className="text-[10px] text-[#666666] font-medium">
                          {dist.division ? `${dist.division} Division` : 'Maharashtra'}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                          dist.demandScore >= 85
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : dist.demandScore >= 75
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-blue-50 text-[#0056A6] border-blue-200'
                        }`}
                      >
                        Score: {dist.demandScore}/100
                      </span>
                    </div>

                    <div className="text-xs text-[#555555] space-y-1.5">
                      <div className="flex items-start gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-[#0056A6] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#222222]">Primary Sector:</strong> {dist.topSector}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] bg-[#F7F8FA] p-1.5 rounded border border-[#EAEAEA]">
                        <span>Active Job Openings:</span>
                        <strong className="text-[#003B70] font-bold">
                          {dist.activeJobCount.toLocaleString()}
                        </strong>
                      </div>

                      <div className="flex items-center justify-between text-[11px] bg-[#F7F8FA] p-1.5 rounded border border-[#EAEAEA]">
                        <span>Govt ITIs / VTP Centers:</span>
                        <strong className="text-[#222222] font-bold">
                          {dist.itiCount} Centers
                        </strong>
                      </div>

                      <div className="flex items-center justify-between text-[11px] bg-[#F7F8FA] p-1.5 rounded border border-[#EAEAEA]">
                        <span>Critical Skill Gaps:</span>
                        <span className="text-red-600 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {dist.criticalGapsCount} Identified
                        </span>
                      </div>

                      {dist.focusRoles && dist.focusRoles.length > 0 && (
                        <div className="pt-1">
                          <div className="text-[10px] uppercase font-bold text-[#888888] tracking-wider mb-1">
                            Key In-Demand Roles
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {dist.focusRoles.map((role, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.5 rounded text-[10px] bg-white border border-[#DDE3E8] text-[#333333]"
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        onSelectDistrict(dist.name);
                      }}
                      className={`mt-3 w-full py-1.5 rounded text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-2xs ${
                        isSelected
                          ? 'bg-[#198754] hover:bg-[#157347] text-white'
                          : 'bg-[#F28C28] hover:bg-[#D96B1F] text-white'
                      }`}
                    >
                      <span>
                        {isSelected ? `Active: ${dist.name}` : `Filter Dashboards to ${dist.name}`}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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
