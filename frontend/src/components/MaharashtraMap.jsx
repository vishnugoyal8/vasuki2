import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MAHARASHTRA_DISTRICTS_DATA } from '../data/districts.data.js';
import { MapPin, ArrowRight } from 'lucide-react';

// Helper to center the map dynamically when district selection changes
const MapRecenter = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 8, { duration: 1.2 });
  }, [lat, lng, map]);
  return null;
};

export const MaharashtraMap = ({ selectedDistrict, onSelectDistrict }) => {
  const activeDistrictObj =
    MAHARASHTRA_DISTRICTS_DATA.find(d => d.name.toLowerCase() === selectedDistrict.toLowerCase()) ||
    MAHARASHTRA_DISTRICTS_DATA[0];

  const createCustomIcon = (district, isSelected) => {
    const isCritical = district.demandScore >= 85;
    const isHigh = district.demandScore >= 75 && district.demandScore < 85;

    const ringColor = isCritical ? '#C62828' : isHigh ? '#F28C28' : '#0056A6';
    const bgColor = isSelected ? '#003B70' : '#ffffff';
    const textColor = isSelected ? '#ffffff' : '#222222';

    const html = `
      <div style="
        position: relative;
        display: flex;
        align-items: center;
        gap: 6px;
        background: ${bgColor};
        color: ${textColor};
        padding: 5px 10px;
        border-radius: 4px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        border: 2px solid ${ringColor};
        font-family: system-ui, sans-serif;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        transform: translate(-50%, -50%);
        white-space: nowrap;
        user-select: none;
      ">
        <span style="
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${ringColor};
        "></span>
        <span>${district.name}</span>
        <span style="
          background: ${isCritical ? '#C6282815' : isHigh ? '#F28C2815' : '#E8F1F8'};
          color: ${isCritical ? '#C62828' : isHigh ? '#D96B1F' : '#0056A6'};
          padding: 1px 5px;
          border-radius: 3px;
          font-size: 10px;
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
    <div className="space-y-3">
      {/* Quick District Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-[#666666] font-semibold whitespace-nowrap text-[11px]">Quick Select:</span>
        {MAHARASHTRA_DISTRICTS_DATA.map(d => {
          const isSelected = d.name.toLowerCase() === selectedDistrict.toLowerCase();
          return (
            <button
              key={d.id}
              onClick={() => onSelectDistrict(d.name)}
              className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-[#0056A6] text-white border-[#0056A6] shadow-2xs'
                  : 'bg-white text-[#666666] hover:bg-[#F7F8FA] border-[#DDE3E8]'
              }`}
            >
              {d.name}
            </button>
          );
        })}
      </div>

      <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-[#DDE3E8] shadow-2xs bg-[#F7F8FA]">
        <MapContainer
          center={[19.3, 76.0]}
          zoom={6.8}
          scrollWheelZoom={false}
          className="w-full h-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          <MapRecenter lat={activeDistrictObj.lat} lng={activeDistrictObj.lng} />

          {MAHARASHTRA_DISTRICTS_DATA.map(dist => {
            const isSelected = dist.name.toLowerCase() === selectedDistrict.toLowerCase();
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
                <Popup>
                  <div className="p-1 min-w-[210px]">
                    <div className="flex items-center justify-between gap-2 border-b border-[#DDE3E8] pb-1.5 mb-1.5">
                      <span className="font-bold text-[#003B70] text-sm">{dist.name} District</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C62828]/10 text-[#C62828] border border-[#C62828]/30">
                        Score: {dist.demandScore}/100
                      </span>
                    </div>
                    <div className="text-xs text-[#666666] space-y-1">
                      <div>
                        <strong className="text-[#222222]">Primary Sector:</strong> {dist.topSector}
                      </div>
                      <div>
                        <strong className="text-[#222222]">Active Job Postings:</strong> {dist.activeJobCount.toLocaleString()}
                      </div>
                      <div>
                        <strong className="text-[#222222]">Critical Skill Gaps:</strong> {dist.criticalGapsCount} identified
                      </div>
                      <div>
                        <strong className="text-[#222222]">Govt ITIs / VTPs:</strong> {dist.itiCount} Centers
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDistrict(dist.name);
                      }}
                      className={`mt-2.5 w-full py-1.5 rounded text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#198754] hover:bg-[#198754]/90 text-white'
                          : 'bg-[#F28C28] hover:bg-[#D96B1F] text-white border border-[#F28C28]'
                      }`}
                    >
                      <span>{isSelected ? `Active: ${dist.name}` : `Filter Dashboards to ${dist.name}`}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Floating Legend / Quick Filter Hint */}
        <div className="absolute bottom-3 left-3 z-10 bg-white p-3 rounded-lg border border-[#DDE3E8] shadow-2xs text-xs">
          <div className="font-bold text-[#003B70] mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#0056A6]" />
            Interactive GIS Labour Map
          </div>
          <div className="text-[11px] text-[#666666] mb-2">Click any district marker or button to filter.</div>
          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C62828]" />
              <span className="text-[#666666] font-medium">Critical (85+)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F28C28]" />
              <span className="text-[#666666] font-medium">High (75-84)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0056A6]" />
              <span className="text-[#666666] font-medium">Aligned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaharashtraMap;
