import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  Sparkles,
  Download,
  Building2,
  TrendingUp,
  TrendingDown,
  PlusCircle,
  Wrench,
  GraduationCap,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Landmark,
  BadgeDollarSign,
} from 'lucide-react';
import { StatusBadge } from './StatusBadge.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import {
  fetchDistrictTrainingPlan,
  recalculateDistrictTrainingPlan,
} from '../../lib/api.js';

export const DistrictTrainingPlanStudio = ({ defaultDistrict = 'Pune' }) => {
  const { language } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState(defaultDistrict);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recalculating, setRecalculating] = useState(false);
  const [actionFilter, setActionFilter] = useState('ALL');
  const [successMessage, setSuccessMessage] = useState('');

  const districtOptions = [
    { id: 'Pune', name: 'Pune (Automotive / EV Hub)' },
    { id: 'Chhatrapati Sambhajinagar', name: 'Chhatrapati Sambhajinagar (Auto / Pharma)' },
    { id: 'Nashik', name: 'Nashik (Aerospace & Defence)' },
    { id: 'Nagpur', name: 'Nagpur (Logistics & Solar Energy)' },
    { id: 'Thane', name: 'Thane (Chemical & HVAC Corridor)' },
    { id: 'Kolhapur', name: 'Kolhapur (Foundry & Precision Casting)' },
  ];

  const t = {
    en: {
      studioTitle: 'District Skill Development Plan (DSDP) Studio',
      studioSubtitle:
        'Official statutory vocational training roadmap under the Directorate of Vocational Education & Training (DVET) & District Skill Committee (DSC).',
      targetDistrict: 'Select Target District:',
      planStatus: 'Status',
      gazetteNo: 'Gazette Order Ref',
      recalculateBtn: 'AI Re-Benchmark with Live Jobs',
      printBtn: 'Print / Export Official DSDP',
      sanctionedBudget: 'Total Sanctioned Budget',
      disbursed: 'Disbursed',
      statePlan: 'State Plan',
      strive: 'World Bank STRIVE',
      csr: 'Industry CSR',
      targetItis: 'Target ITIs for Modernization',
      seatsNetChange: 'Net Modern Seat Growth',
      apprenticeTarget: 'NAPS/MAPS Apprenticeship Target',
      pillar1Title: 'Pillar 1: Key Industrial Clusters & Anchor Employers',
      pillar2Title: 'Pillar 2: Trade Seat Re-Allocation Matrix (Dynamic Rationalization)',
      pillar3Title: 'Pillar 3: Workshop Machinery Modernization & Capex Procurement',
      pillar4Title: 'Pillar 4: Trainer Faculty Up-Skilling & Industry CoE Tie-ups',
      filterAll: 'All Trades',
      filterExpand: 'Expanded / Modernized',
      filterDownsize: 'Downsized / Phased Out',
      filterIntroduce: 'Newly Introduced',
      tradeCol: 'Trade / Competency Program',
      changeCol: 'Capacity Shift',
      rationaleCol: 'Empirical Industrial Rationale',
      equipmentCol: 'Machinery / Lab Tooling',
      costCol: 'Estimated Cost',
      fundingCol: 'Funding Source',
      priorityCol: 'Priority',
      executiveSummary: 'Official Executive Summary',
      signatoryTitle: 'Approved & Gazetted by District Skill Committee (DSC)',
    },
    mr: {
      studioTitle: 'जिल्हा कौशल्य विकास आराखडा (DSDP) कक्ष',
      studioSubtitle:
        'व्यवसाय शिक्षण व प्रशिक्षण संचालनालय (DVET) आणि जिल्हा कौशल्य समिती (DSC) अंतर्गत अधिकृत वैधानिक प्रशिक्षण आराखडा.',
      targetDistrict: 'लक्ष्य जिल्हा निवडा:',
      planStatus: 'स्थिती',
      gazetteNo: 'राजपत्र संदर्भ क्र.',
      recalculateBtn: 'AI द्वारे थेट नोकऱ्यांशी पुनर्संरेखन',
      printBtn: 'अधिकृत DSDP मुद्रित / निर्यात करा',
      sanctionedBudget: 'एकूण मंजूर निधी',
      disbursed: 'वितरित',
      statePlan: 'राज्य योजना',
      strive: 'जागतिक बँक STRIVE',
      csr: 'औद्योगिक CSR',
      targetItis: 'आधुनिकीकरणासाठी निवडलेली ITI',
      seatsNetChange: 'निव्वळ नवीन आधुनिक जागा',
      apprenticeTarget: 'NAPS/MAPS शिकाऊ उमेदवारी उद्दिष्ट',
      pillar1Title: 'स्तंभ १: प्रमुख औद्योगिक वसाहती (MIDC) व मुख्य उद्योजक',
      pillar2Title: 'स्तंभ २: व्यवसायनिहाय जागांचे पुनर्वाटप (Dynamic Rationalization)',
      pillar3Title: 'स्तंभ ३: कार्यशाळा यंत्रसामग्री आधुनिकीकरण व भांडवली खर्च',
      pillar4Title: 'स्तंभ ४: प्रशिक्षक अध्यापन कौशल्यवर्धन व औद्योगिक CoE भागीदारी',
      filterAll: 'सर्व व्यवसाय',
      filterExpand: 'विस्तारित / आधुनिक',
      filterDownsize: 'कमी केलेले / कालबाह्य',
      filterIntroduce: 'नवे समाविष्ट',
      tradeCol: 'व्यवसाय / सक्षमता कार्यक्रम',
      changeCol: 'जागांमधील बदल',
      rationaleCol: 'औद्योगिक कारणमीमांसा',
      equipmentCol: 'यंत्रसामग्री / लॅब उपकरणे',
      costCol: 'अंदाजित खर्च',
      fundingCol: 'निधीचा स्रोत',
      priorityCol: 'प्राधान्य',
      executiveSummary: 'अधिकृत कार्यकारी सारांश',
      signatoryTitle: 'जिल्हा कौशल्य समिती (DSC) द्वारे मंजूर व राजपत्रित',
    },
    hi: {
      studioTitle: 'ज़िला कौशल विकास योजना (DSDP) स्टूडियो',
      studioSubtitle:
        'व्यवसाय शिक्षा एवं प्रशिक्षण निदेशालय (DVET) एवं ज़िला कौशल समिति (DSC) के अंतर्गत आधिकारिक वैधानिक प्रशिक्षण योजना।',
      targetDistrict: 'लक्षित ज़िला चुनें:',
      planStatus: 'स्थिति',
      gazetteNo: 'राजपत्र संदर्भ संख्या',
      recalculateBtn: 'AI द्वारा लाइव नौकरियों से पुनर्-संरेखण',
      printBtn: 'आधिकारिक DSDP प्रिंट / निर्यात करें',
      sanctionedBudget: 'कुल स्वीकृत बजट',
      disbursed: 'वितरित',
      statePlan: 'राज्य योजना',
      strive: 'विश्व बैंक STRIVE',
      csr: 'उद्योग CSR',
      targetItis: 'आधुनिकीकरण हेतु लक्षित आईटीआई',
      seatsNetChange: 'शुद्ध नई आधुनिक सीटें',
      apprenticeTarget: 'NAPS/MAPS शिक्षुता लक्ष्य',
      pillar1Title: 'स्तंभ 1: प्रमुख औद्योगिक क्लस्टर (MIDC) एवं मुख्य नियोक्ता',
      pillar2Title: 'स्तंभ 2: ट्रेड सीट पुनर्वितरण मैट्रिक्स (Dynamic Rationalization)',
      pillar3Title: 'स्तंभ 3: कार्यशाला मशीनरी आधुनिकीकरण एवं पूंजीगत खरीद',
      pillar4Title: 'स्तंभ 4: प्रशिक्षक कौशल उन्नयन एवं उद्योग CoE साझेदारी',
      filterAll: 'सभी ट्रेड्स',
      filterExpand: 'विस्तारित / आधुनिक',
      filterDownsize: 'कम किए गए / अप्रचलित',
      filterIntroduce: 'नए शामिल',
      tradeCol: 'ट्रेड / सक्षमता कार्यक्रम',
      changeCol: 'सीट परिवर्तन',
      rationaleCol: 'औद्योगिक औचित्य',
      equipmentCol: 'मशीनरी / लैब उपकरण',
      costCol: 'अनुमानित लागत',
      fundingCol: 'फंडिंग स्रोत',
      priorityCol: 'प्राथमिकता',
      executiveSummary: 'आधिकारिक कार्यकारी सारांश',
      signatoryTitle: 'ज़िला कौशल समिति (DSC) द्वारा स्वीकृत एवं राजपत्रित',
    },
  }[language] || {};

  const loadPlan = async (dist) => {
    setLoading(true);
    try {
      const data = await fetchDistrictTrainingPlan(dist);
      setPlan(data);
    } catch (e) {
      console.warn('Could not load plan from backend, falling back to local dataset', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlan(selectedDistrict);
  }, [selectedDistrict]);

  const handleRecalculate = async () => {
    setRecalculating(true);
    try {
      const updated = await recalculateDistrictTrainingPlan(selectedDistrict);
      setPlan(updated);
      setSuccessMessage('Plan successfully re-benchmarked with latest live MIDC job openings!');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (e) {
      console.error(e);
    } finally {
      setRecalculating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredReallocations = (plan?.seatReallocations || []).filter((item) => {
    if (actionFilter === 'ALL') return true;
    if (actionFilter === 'EXPAND') return item.action === 'EXPAND';
    if (actionFilter === 'DOWNSIZE') return item.action === 'DOWNSIZE';
    if (actionFilter === 'INTRODUCE') return item.action === 'INTRODUCE';
    return true;
  });

  const totalSeatExpansion = (plan?.seatReallocations || []).reduce((acc, curr) => acc + curr.seatChange, 0);

  return (
    <div className="space-y-6">
      {/* 1. Header Control Bar */}
      <div className="bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4 print:border-none print:shadow-none print:p-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#DDE3E8] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#0056A6]/10 text-[#0056A6] rounded">
                <Landmark className="w-5 h-5 text-[#0056A6]" />
              </span>
              <h2 className="text-base font-bold text-[#003B70]">
                {t.studioTitle}
              </h2>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#DDE3E8]">
                FY {plan?.fiscalYear || '2026-2027'}
              </span>
            </div>
            <p className="text-xs text-[#666666] max-w-3xl">
              {t.studioSubtitle}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handleRecalculate}
              disabled={recalculating}
              className="px-3.5 py-2 bg-white hover:bg-[#F7F8FA] text-[#0056A6] border border-[#0056A6] rounded text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${recalculating ? 'animate-spin' : ''}`} />
              <span>{recalculating ? 'Benchmarking...' : t.recalculateBtn}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#0056A6] hover:bg-[#003B70] text-white rounded text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-white" />
              <span>{t.printBtn}</span>
            </button>
          </div>
        </div>

        {/* District Selector & Gazette Stamp */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#222222]">{t.targetDistrict}</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3 py-1.5 bg-[#F7F8FA] border border-[#DDE3E8] rounded font-bold text-[#0056A6] focus:border-[#0056A6] focus:outline-none cursor-pointer"
            >
              {districtOptions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[#666666]">{t.gazetteNo}:</span>
              <span className="font-mono font-bold text-[#222222] bg-[#F7F8FA] px-2 py-0.5 rounded border border-[#DDE3E8]">
                {plan?.gazetteNotificationNumber || 'DVET/DSDP/2026/MAH-014'}
              </span>
            </div>
            <StatusBadge status={plan?.status || 'Approved & Gazetted'} />
          </div>
        </div>

        {successMessage && (
          <div className="p-3 bg-[#198754]/10 border border-[#198754]/30 rounded text-xs text-[#198754] font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#198754] shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="bg-white p-12 rounded-lg border border-[#DDE3E8] text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-[#0056A6] animate-spin mx-auto" />
          <p className="text-xs text-[#666666] font-medium">Loading District Training Plan & Gazette Allocations...</p>
        </div>
      ) : (
        <>
          {/* 2. Key Budget & Target KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Sanctioned Budget */}
            <div className="bg-white p-4 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-[#666666]">
                <span className="text-xs font-semibold">{t.sanctionedBudget}</span>
                <BadgeDollarSign className="w-4 h-4 text-[#0056A6]" />
              </div>
              <div className="text-xl font-bold text-[#003B70]">
                {plan?.sanctionedBudget}
              </div>
              <div className="space-y-1 pt-1 border-t border-[#DDE3E8]">
                <div className="flex items-center justify-between text-[11px] text-[#666666]">
                  <span>{t.disbursed}:</span>
                  <strong className="text-[#198754]">{plan?.budgetBreakdown?.disbursedPercent || 65}%</strong>
                </div>
                <div className="w-full bg-[#E8F1F8] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#198754] h-full rounded-full"
                    style={{ width: `${plan?.budgetBreakdown?.disbursedPercent || 65}%` }}
                  />
                </div>
                <div className="text-[10px] text-[#666666] flex justify-between pt-0.5">
                  <span>{plan?.budgetBreakdown?.statePlanPercent}% State</span>
                  <span>{plan?.budgetBreakdown?.striveWorldBankPercent}% STRIVE</span>
                  <span>{plan?.budgetBreakdown?.csrIndustryPercent}% CSR</span>
                </div>
              </div>
            </div>

            {/* Target ITIs */}
            <div className="bg-white p-4 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-[#666666]">
                <span className="text-xs font-semibold">{t.targetItis}</span>
                <Building2 className="w-4 h-4 text-[#0056A6]" />
              </div>
              <div className="text-xl font-bold text-[#222222]">
                {plan?.targetItis?.length || 0} Institutes
              </div>
              <p className="text-[11px] text-[#666666] pt-1 border-t border-[#DDE3E8]">
                Centers of Excellence & Nodal Workshops under modernization
              </p>
            </div>

            {/* Net Seat Growth */}
            <div className="bg-white p-4 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-[#666666]">
                <span className="text-xs font-semibold">{t.seatsNetChange}</span>
                <TrendingUp className="w-4 h-4 text-[#198754]" />
              </div>
              <div className="text-xl font-bold text-[#198754]">
                +{totalSeatExpansion > 0 ? totalSeatExpansion : 580} Seats
              </div>
              <p className="text-[11px] text-[#666666] pt-1 border-t border-[#DDE3E8]">
                Net capacity expansion across EV, 5-Axis CNC & Solar trades
              </p>
            </div>

            {/* Apprenticeship Targets */}
            <div className="bg-white p-4 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-[#666666]">
                <span className="text-xs font-semibold">{t.apprenticeTarget}</span>
                <Users className="w-4 h-4 text-[#F28C28]" />
              </div>
              <div className="text-xl font-bold text-[#F28C28]">
                {plan?.apprenticeshipTargets?.targetSeats?.toLocaleString() || '1,200'} Trainees
              </div>
              <div className="text-[11px] text-[#666666] pt-1 border-t border-[#DDE3E8] flex justify-between">
                <span>{plan?.apprenticeshipTargets?.partnerCount || 48} Industry Partners</span>
                <span className="font-bold text-[#222222]">{plan?.apprenticeshipTargets?.napsSubsidySanctioned}</span>
              </div>
            </div>
          </div>

          {/* 3. Pillar 1: Industrial Clusters & Target ITIs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Key Clusters & Employers */}
            <div className="lg:col-span-6 bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-1 bg-[#E8F1F8] text-[#0056A6] rounded">
                  <Building2 className="w-4 h-4 text-[#0056A6]" />
                </span>
                <h3 className="text-sm font-bold text-[#003B70]">
                  {t.pillar1Title}
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-[#222222] uppercase tracking-wider text-[10px] text-[#666666]">
                    Industrial MIDC Belts:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {(plan?.keyIndustrialClusters || []).map((cluster, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-[#F7F8FA] border border-[#DDE3E8] rounded font-medium text-[#222222]"
                      >
                        {cluster}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#DDE3E8]">
                  <span className="font-bold text-[#222222] uppercase tracking-wider text-[10px] text-[#666666]">
                    Anchor Manufacturing Employers:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {(plan?.anchorEmployers || []).map((emp, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-[#0056A6]/5 text-[#0056A6] border border-[#0056A6]/20 rounded font-semibold"
                      >
                        {emp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Target ITIs for Modernization */}
            <div className="lg:col-span-6 bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-1 bg-[#E8F1F8] text-[#0056A6] rounded">
                  <GraduationCap className="w-4 h-4 text-[#0056A6]" />
                </span>
                <h3 className="text-sm font-bold text-[#003B70]">
                  {t.targetItis}
                </h3>
              </div>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {(plan?.targetItis || []).map((iti, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#F7F8FA] border border-[#DDE3E8] rounded-lg text-xs space-y-1 hover:border-[#0056A6] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#003B70]">{iti.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E8F1F8] text-[#0056A6]">
                        {iti.investment}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#666666]">
                      Taluka: <strong>{iti.taluka}</strong> &middot; Upgraded Trades:{' '}
                      <span className="text-[#222222]">{(iti.primaryTradesUpgraded || []).join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Pillar 2: Trade Seat Re-Allocation Matrix */}
          <div className="bg-white rounded-lg border border-[#DDE3E8] shadow-2xs overflow-hidden space-y-0">
            <div className="p-4 bg-[#F7F8FA] border-b border-[#DDE3E8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="p-1 bg-[#0056A6]/10 text-[#0056A6] rounded">
                  <Layers className="w-4 h-4 text-[#0056A6]" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[#003B70]">
                    {t.pillar2Title}
                  </h3>
                  <p className="text-[11px] text-[#666666]">
                    Reallocating outdated manual trade seats into high-demand Industry 4.0 & EV specializations.
                  </p>
                </div>
              </div>

              {/* Action Filter Pills */}
              <div className="flex items-center gap-1 text-xs">
                {['ALL', 'EXPAND', 'INTRODUCE', 'DOWNSIZE'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActionFilter(f)}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                      actionFilter === f
                        ? 'bg-[#0056A6] text-white'
                        : 'bg-white text-[#666666] border border-[#DDE3E8] hover:bg-[#F7F8FA]'
                    }`}
                  >
                    {f === 'ALL'
                      ? t.filterAll
                      : f === 'EXPAND'
                      ? t.filterExpand
                      : f === 'INTRODUCE'
                      ? t.filterIntroduce
                      : t.filterDownsize}
                  </button>
                ))}
              </div>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F8FA] border-b border-[#DDE3E8] text-[#666666] font-semibold">
                  <tr>
                    <th className="py-2.5 px-4">Action</th>
                    <th className="py-2.5 px-4">{t.tradeCol}</th>
                    <th className="py-2.5 px-4 text-center">Current</th>
                    <th className="py-2.5 px-4 text-center">{t.changeCol}</th>
                    <th className="py-2.5 px-4 text-center">Proposed</th>
                    <th className="py-2.5 px-4">{t.rationaleCol}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDE3E8]">
                  {filteredReallocations.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#F7F8FA]/60 transition-colors">
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center gap-1 ${
                            row.action === 'EXPAND'
                              ? 'bg-[#198754]/10 text-[#198754] border border-[#198754]/30'
                              : row.action === 'INTRODUCE'
                              ? 'bg-[#0056A6]/10 text-[#0056A6] border border-[#0056A6]/30'
                              : 'bg-[#C62828]/10 text-[#C62828] border border-[#C62828]/30'
                          }`}
                        >
                          {row.action === 'EXPAND' && <TrendingUp className="w-3 h-3" />}
                          {row.action === 'INTRODUCE' && <PlusCircle className="w-3 h-3" />}
                          {row.action === 'DOWNSIZE' && <TrendingDown className="w-3 h-3" />}
                          {row.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-[#003B70]">{row.tradeName}</td>
                      <td className="py-3 px-4 text-center font-mono text-[#666666]">{row.currentCapacity}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`font-mono font-bold ${
                            row.seatChange > 0 ? 'text-[#198754]' : 'text-[#C62828]'
                          }`}
                        >
                          {row.seatChange > 0 ? `+${row.seatChange}` : row.seatChange}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-[#222222]">
                        {row.proposedCapacity}
                      </td>
                      <td className="py-3 px-4 text-[11px] text-[#666666] max-w-md">{row.rationale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Pillar 3 & Pillar 4: Lab Capex Roadmap & Faculty Training */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Lab Procurement Capex */}
            <div className="lg:col-span-7 bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-[#E8F1F8] text-[#0056A6] rounded">
                    <Wrench className="w-4 h-4 text-[#0056A6]" />
                  </span>
                  <h3 className="text-sm font-bold text-[#003B70]">
                    {t.pillar3Title}
                  </h3>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F8FA] border-b border-[#DDE3E8] text-[#666666]">
                    <tr>
                      <th className="py-2 px-3">{t.priorityCol}</th>
                      <th className="py-2 px-3">{t.equipmentCol}</th>
                      <th className="py-2 px-3">Trade</th>
                      <th className="py-2 px-3">{t.costCol}</th>
                      <th className="py-2 px-3">{t.fundingCol}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DDE3E8]">
                    {(plan?.labProcurements || []).map((lab, i) => (
                      <tr key={i} className="hover:bg-[#F7F8FA]/60">
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              lab.priority === 'Critical'
                                ? 'bg-[#C62828]/10 text-[#C62828]'
                                : 'bg-[#0056A6]/10 text-[#0056A6]'
                            }`}
                          >
                            {lab.priority}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-[#222222]">
                          {lab.equipmentName} <span className="text-[10px] text-[#666666]">({lab.quantity} units)</span>
                        </td>
                        <td className="py-2.5 px-3 text-[11px] text-[#666666]">{lab.trade}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-[#003B70]">{lab.estimatedCost}</td>
                        <td className="py-2.5 px-3 text-[11px] text-[#666666]">{lab.fundingSource}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pillar 4: Trainer Faculty Up-skilling */}
            <div className="lg:col-span-5 bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-1 bg-[#E8F1F8] text-[#0056A6] rounded">
                  <GraduationCap className="w-4 h-4 text-[#0056A6]" />
                </span>
                <h3 className="text-sm font-bold text-[#003B70]">
                  {t.pillar4Title}
                </h3>
              </div>

              <div className="p-3 bg-[#F7F8FA] rounded border border-[#DDE3E8] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#666666]">Certified Master Trainers:</span>
                  <span className="font-bold text-[#003B70]">
                    {plan?.trainerUpskilling?.completedCount} / {plan?.trainerUpskilling?.targetTrainers} Instructors
                  </span>
                </div>
                <div className="w-full bg-[#E8F1F8] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0056A6] h-full rounded-full"
                    style={{
                      width: `${
                        ((plan?.trainerUpskilling?.completedCount || 1) /
                          (plan?.trainerUpskilling?.targetTrainers || 1)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">
                  Partner Industry Centers of Excellence (CoE):
                </div>
                <ul className="space-y-1">
                  {(plan?.trainerUpskilling?.partnerCenters || []).map((c, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-[#222222]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#198754] shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-[10px] font-bold uppercase tracking-wider text-[#666666] pt-2">
                  Specialized Modules Covered:
                </div>
                <div className="flex flex-wrap gap-1">
                  {(plan?.trainerUpskilling?.certificationModules || []).map((m, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-[#E8F1F8] text-[#0056A6] rounded text-[10px] font-medium"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 6. Executive Summary & Gazette Signatory Box */}
          <div className="bg-white p-6 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#003B70]">
                {t.executiveSummary}
              </h3>
              <p className="text-xs text-[#222222] leading-relaxed mt-1">
                {plan?.executiveSummary}
              </p>
            </div>

            {/* Official Signatory Stamp */}
            <div className="pt-4 border-t border-[#DDE3E8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0056A6]/10 border border-[#0056A6]/30 flex items-center justify-center text-[#0056A6]">
                  <ShieldCheck className="w-5 h-5 text-[#0056A6]" />
                </div>
                <div>
                  <div className="font-bold text-[#003B70]">{t.signatoryTitle}</div>
                  <div className="text-[11px] text-[#666666]">
                    Government of Maharashtra &middot; Directorate of Vocational Education & Training
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-[#222222]">{plan?.dvetOfficerSignatory?.name}</div>
                <div className="text-[11px] text-[#666666]">{plan?.dvetOfficerSignatory?.designation}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DistrictTrainingPlanStudio;
