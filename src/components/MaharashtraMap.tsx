import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MAHARASHTRA_DISTRICTS_DATA } from '../../backend/data/seedData.ts';
import { MapPin, AlertCircle, ArrowRight } from 'lucide-react';

interface Props {
  selectedDistrict: string;
  onSelectDistrict: (districtName: string) => void;
}

// Helper to center the map dynamically when district selection changes
function MapRecenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 8, { duration: 1.2 });
  }, [lat, lng, map]);
  return null;
}

export const MaharashtraMap: React.FC<Props> = ({ selectedDistrict, onSelectDistrict }) => {
  const activeDistrictObj =
    MAHARASHTRA_DISTRICTS_DATA.find(d => d.name.toLowerCase() === selectedDistrict.toLowerCase()) ||
    MAHARASHTRA_DISTRICTS_DATA[0];

  const createCustomIcon = (district: (typeof MAHARASHTRA_DISTRICTS_DATA)[0], isSelected: boolean) => {
    const isCritical = district.demandScore >= 85;
    const isHigh = district.demandScore >= 75 && district.demandScore < 85;

    const ringColor = isCritical ? '#e11d48' : isHigh ? '#d97706' : '#2563eb';
    const bgColor = isSelected ? '#0f172a' : '#ffffff';
    const textColor = isSelected ? '#ffffff' : '#0f172a';

    const html = `
      <div style="
        position: relative;
        display: flex;
        align-items: center;
        gap: 6px;
        background: ${bgColor};
        color: ${textColor};
        padding: 5px 10px;
        border-radius: 9999px;
        box-shadow: 0 4px 14px rgba(0,0,0,0.25);
        border: 2.5px solid ${ringColor};
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
          border-radius: 9999px;
          background: ${ringColor};
        "></span>
        <span>${district.name}</span>
        <span style="
          background: ${isCritical ? '#ffe4e6' : '#f1f5f9'};
          color: ${isCritical ? '#be123c' : '#334155'};
          padding: 1px 5px;
          border-radius: 6px;
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
        <span className="text-slate-400 font-semibold whitespace-nowrap text-[11px]">Quick Select:</span>
        {MAHARASHTRA_DISTRICTS_DATA.map(d => {
          const isSelected = d.name.toLowerCase() === selectedDistrict.toLowerCase();
          return (
            <button
              key={d.id}
              onClick={() => onSelectDistrict(d.name)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              {d.name}
            </button>
          );
        })}
      </div>

      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
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
                    <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5 mb-1.5">
                      <span className="font-bold text-slate-900 text-sm">{dist.name} District</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                        Score: {dist.demandScore}/100
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 space-y-1">
                      <div>
                        <strong className="text-slate-700">Primary Sector:</strong> {dist.topSector}
                      </div>
                      <div>
                        <strong className="text-slate-700">Active Job Postings:</strong> {dist.activeJobCount.toLocaleString()}
                      </div>
                      <div>
                        <strong className="text-slate-700">Critical Skill Gaps:</strong> {dist.criticalGapsCount} identified
                      </div>
                      <div>
                        <strong className="text-slate-700">Govt ITIs / VTPs:</strong> {dist.itiCount} Centers
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
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
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
        <div className="absolute bottom-3 left-3 z-10 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-slate-200 shadow-md text-xs">
          <div className="font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            Interactive GIS Labour Map
          </div>
          <div className="text-[11px] text-slate-500 mb-2">Click any district marker or button to filter.</div>
          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="text-slate-600 font-medium">Critical (85+)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-slate-600 font-medium">High (75-84)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-slate-600 font-medium">Aligned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
