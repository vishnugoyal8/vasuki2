import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const GovFooter = () => {
  return (
    <footer id="govt-footer" className="bg-[#00284D] text-[#E8F1F8] border-t-2 border-[#0056A6] text-xs font-sans">
      {/* Upper Footer Links and Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Organization */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#003B70] border border-[#0056A6] flex items-center justify-center text-white font-bold text-xs">
                MH
              </div>
              <span className="text-base font-black text-white tracking-tight">
                Skill<span className="text-[#F28C28]">Scan</span>
              </span>
            </div>
            <p className="text-xs text-[#E8F1F8]/80 leading-relaxed">
              An institutional vocational skilling and labor market intelligence platform governed by the Directorate of Vocational Education &amp; Training (DVET), Government of Maharashtra.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#E8F1F8]/90">
              <ShieldCheck className="w-4 h-4 text-[#F28C28]" />
              <span>GIGW 3.0 &amp; WCAG 2.1 AA Compliant Portal</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#003B70] pb-1.5">
              Official Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://dvet.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white text-[#E8F1F8]/80 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3 text-[#0056A6]" />
                  DVET Maharashtra Official
                </a>
              </li>
              <li>
                <a
                  href="https://skillindia.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white text-[#E8F1F8]/80 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3 text-[#0056A6]" />
                  Skill India Digital Hub
                </a>
              </li>
              <li>
                <a
                  href="https://dgt.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white text-[#E8F1F8]/80 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3 text-[#0056A6]" />
                  Directorate General of Training (DGT)
                </a>
              </li>
              <li>
                <a
                  href="https://maharashtra.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white text-[#E8F1F8]/80 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3 text-[#0056A6]" />
                  Government of Maharashtra
                </a>
              </li>
              <li>
                <a
                  href="https://ncs.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white text-[#E8F1F8]/80 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3 text-[#0056A6]" />
                  National Career Service (NCS)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Citizen & Statutory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#003B70] pb-1.5">
              Statutory &amp; Policies
            </h4>
            <ul className="space-y-2 text-xs text-[#E8F1F8]/80">
              <li>
                <a href="#rti" className="hover:text-white transition-colors">
                  Right to Information (RTI Act 2005)
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Data Protection &amp; Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Terms &amp; Conditions of Use
                </a>
              </li>
              <li>
                <a href="#hyperlink" className="hover:text-white transition-colors">
                  Hyperlinking &amp; Copyright Policy
                </a>
              </li>
              <li>
                <a href="#screen-reader" className="hover:text-white transition-colors">
                  Screen Reader Access &amp; Accessibility
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Governance & Frameworks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#003B70] pb-1.5">
              Governance &amp; Standards
            </h4>
            <ul className="space-y-2 text-xs text-[#E8F1F8]/80">
              <li>
                <span className="text-white font-semibold">NCVET Aligned:</span> National Skills Qualification Framework
              </li>
              <li>
                <span className="text-white font-semibold">Dual System:</span> Maharashtra Dual Training Architecture
              </li>
              <li>
                <span className="text-white font-semibold">Quality Standard:</span> GIGW 3.0 &amp; ISO-Compliant Telemetry
              </li>
              <li>
                <span className="text-white font-semibold">Jurisdiction:</span> Directorate of Vocational Education &amp; Training
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Institutional Legal Bottom Strip */}
      <div className="bg-[#001F3D] border-t border-[#00284D] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#E8F1F8]/70">
          <div>
            &copy; {new Date().getFullYear()} Directorate of Vocational Education &amp; Training (DVET), Government of Maharashtra. All rights reserved.
          </div>
          <div>
            Conforming to Guidelines for Indian Government Websites (GIGW 3.0).
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GovFooter;
