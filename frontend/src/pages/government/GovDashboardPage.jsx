import React, { useState } from 'react';
import {
  MapPin,
  TrendingUp,
  Award,
  ShieldCheck,
  Building2,
  FileText,
  AlertTriangle,
  Users,
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout.jsx';
import { StatCard } from '../../components/common/StatCard.jsx';
import { StatusBadge } from '../../components/common/StatusBadge.jsx';
import { GovBarChart } from '../../components/charts/GovBarChart.jsx';
import { MaharashtraMap } from '../../components/MaharashtraMap.jsx';
import { DistrictTrainingPlanStudio } from '../../components/common/DistrictTrainingPlanStudio.jsx';
import {
  MAHARASHTRA_DISTRICTS_DATA,
} from '../../data/districts.data.js';
import {
  GOV_DISTRICT_PLANS,
  GOV_POLICY_BRIEFS,
  GOV_ECOSYSTEM_HEALTH,
} from '../../data/mockData.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

export const GovDashboardPage = ({
  selectedDistrict = 'Pune',
  onSelectDistrict,
  onNavigate,
}) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('demand-analysis');
  const [district, setDistrict] = useState(selectedDistrict);

  const i18n = {
    en: {
      targetDistrict: 'Target District:',
      clusterScore: 'Regional Cluster Score:',
      demandIndex: 'Demand Index',
      openingsTitle: 'Active Job Openings',
      openingsSub: 'Chakan, Bhosari & Talegaon',
      deficitTitle: 'Trainee Deficit Gap',
      deficitSub: 'Unmet industrial demand ratio',
      itisTitle: 'Govt ITI Centers',
      itisSub: 'Sanctioned vocational capacity',
      grantsTitle: 'State Grant Disbursed',
      grantsSub: 'Modernization scheme 2025-26',
      gisHeading: 'Maharashtra District Vocational Demand GIS Map',
      gisSub: 'Click pins or select dropdown to re-center regional cluster telemetry.',
      supplyDemandHeading: (d) => `Supply vs. Demand Deficit (${d})`,
      supplyDemandSub: 'Comparison between industrial hiring demand and annual ITI passouts.',
      industryDemandBar: 'Industry Demand',
      itiPassoutsBar: 'ITI Passouts',
      criticalAlertTitle: 'Critical Deficit in High-Voltage EV Technicians',
      criticalAlertSub: 'Immediate seat expansion required in Govt ITI Aundh & Haveli centers.',
      planningHeading: 'District Skill Development Plans (DSDP) Allocation Matrix',
      planningSub: 'State budget allocations, seat expansions, and World Bank STRIVE co-funding targets.',
      policyHeading: 'State Vocational Policy Directives & Executive Briefings',
      policySub: 'Strategic whitepapers guiding Maharashtra’s skilling ecosystem transition into EV and Industry 4.0.',
      ecosystemHeading: 'Ecosystem Health Indicators',
      capacityTitle: 'Statewide ITI Capacity',
      capacitySub: 'Govt & Private Accredited',
      enrolledTitle: 'Enrolled Trainees',
      enrolledSub: 'Across all 36 districts',
      placementTitle: 'State Placement Ratio',
      placementSub: 'Formal manufacturing placements',
      modernizationTitle: 'Modernization Grants',
      modernizationSub: 'State Plan & World Bank STRIVE',
      activePartners: 'Active Industrial Partners',
      mouPartners: 'MOU partnerships for apprenticeships',
      annualCertified: 'Annual Certified Passouts',
      certifiedBoard: 'Certified by NCVET examination board',
      deficitClusters: 'Identified Deficit Clusters',
      targetedGrants: 'Targeted for lab equipment grants',
    },
    mr: {
      targetDistrict: 'निवडलेला जिल्हा:',
      clusterScore: 'प्रादेशिक क्लस्टर गुण:',
      demandIndex: 'मागणी निर्देशांक',
      openingsTitle: 'सक्रिय नोकरी पदे',
      openingsSub: 'चाकण, भोसरी आणि तळेगाव',
      deficitTitle: 'प्रशिक्षणार्थी तूट अंतर',
      deficitSub: 'अपूर्ण औद्योगिक मागणी गुणोत्तर',
      itisTitle: 'शासकीय ITI केंद्रे',
      itisSub: 'मंजूर व्यावसायिक क्षमता',
      grantsTitle: 'वितरित राज्य अनुदान',
      grantsSub: 'आधुनिकीकरण योजना २०२५-२६',
      gisHeading: 'महाराष्ट्र जिल्हा व्यावसायिक मागणी GIS नकाशा',
      gisSub: 'प्रादेशिक क्लस्टर डेटा पाहण्यासाठी नकाशावर क्लिक करा किंवा निवडा.',
      supplyDemandHeading: (d) => `मागणी वि. पुरवठा तूट (${d})`,
      supplyDemandSub: 'औद्योगिक भरती मागणी आणि वार्षिक ITI उत्तीर्ण उमेदवारांची तुलना.',
      industryDemandBar: 'औद्योगिक मागणी',
      itiPassoutsBar: 'ITI उत्तीर्ण',
      criticalAlertTitle: 'हाय-व्होल्टेज ईव्ही तंत्रज्ञांची गंभीर तूट',
      criticalAlertSub: 'शासकीय ITI औंध आणि हवेली केंद्रांमध्ये तातडीने जागा वाढवणे आवश्यक.',
      planningHeading: 'जिल्हा कौशल्य विकास योजना (DSDP) वाटप मॅट्रिक्स',
      planningSub: 'राज्य अर्थसंकल्प वाटप, जागा वाढ आणि जागतिक बँक STRIVE सह-निधी उद्दिष्टे.',
      policyHeading: 'राज्य व्यवसाय शिक्षण राजपत्रित धोरण अहवाल',
      policySub: 'ईव्ही व उद्योग ४.० दिशेने महाराष्ट्राच्या कौशल्य परिसंस्थेचे मार्गदर्शन करणारे अहवाल.',
      ecosystemHeading: 'संस्थात्मक प्रणाली आरोग्य निर्देशक',
      capacityTitle: 'राज्यव्यापी ITI क्षमता',
      capacitySub: 'शासकीय व खाजगी मान्यताप्राप्त',
      enrolledTitle: 'नोंदणीकृत प्रशिक्षणार्थी',
      enrolledSub: 'सर्व ३६ जिल्ह्यांमध्ये',
      placementTitle: 'राज्य प्लेसमेंट प्रमाण',
      placementSub: 'औपचारिक उत्पादन क्षेत्रातील नियुक्त्या',
      modernizationTitle: 'आधुनिकीकरण अनुदान',
      modernizationSub: 'राज्य योजना व जागतिक बँक STRIVE',
      activePartners: 'सक्रिय औद्योगिक भागीदार',
      mouPartners: 'शिकाऊ उमेदवारीसाठी सामंजस्य करार',
      annualCertified: 'वार्षिक प्रमाणित उत्तीर्ण',
      certifiedBoard: 'NCVET परीक्षा मंडळाद्वारे प्रमाणित',
      deficitClusters: 'ओळखलेले तूट क्लस्टर्स',
      targetedGrants: 'प्रयोगशाळा उपकरणांसाठी अनुदान',
    },
    hi: {
      targetDistrict: 'लक्षित ज़िला:',
      clusterScore: 'क्षेत्रीय क्लस्टर स्कोर:',
      demandIndex: 'मांग सूचकांक',
      openingsTitle: 'सक्रिय नौकरी रिक्तियां',
      openingsSub: 'चाकण, भोसरी एवं तालेगांव',
      deficitTitle: 'प्रशिक्षु कमी अंतराल',
      deficitSub: 'अपूरित औद्योगिक मांग अनुपात',
      itisTitle: 'सरकारी आईटीआई केंद्र',
      itisSub: 'स्वीकृत व्यावसायिक क्षमता',
      grantsTitle: 'संवितरित राज्य अनुदान',
      grantsSub: 'आधुनिकीकरण योजना 2025-26',
      gisHeading: 'महाराष्ट्र ज़िला व्यावसायिक मांग GIS मानचित्र',
      gisSub: 'क्षेत्रीय डेटा देखने के लिए मानचित्र पर क्लिक करें या चुनें।',
      supplyDemandHeading: (d) => `मांग बनाम आपूर्ति कमी (${d})`,
      supplyDemandSub: 'औद्योगिक भर्ती मांग और वार्षिक आईटीआई पासआउट की तुलना।',
      industryDemandBar: 'औद्योगिक मांग',
      itiPassoutsBar: 'आईटीआई पासआउट',
      criticalAlertTitle: 'हाई-वोल्टेज ईवी तकनीशियनों की गंभीर कमी',
      criticalAlertSub: 'सरकारी आईटीआई औंध और हवेली केंद्रों में तत्काल सीट वृद्धि आवश्यक।',
      planningHeading: 'ज़िला कौशल विकास योजना (DSDP) आवंटन मैट्रिक्स',
      planningSub: 'राज्य बजट आवंटन, सीट विस्तार और विश्व बैंक STRIVE सह-वित्तपोषण लक्ष्य।',
      policyHeading: 'राज्य व्यावसायिक नीति निर्देश एवं कार्यकारी ब्रीफिंग',
      policySub: 'महाराष्ट्र के कौशल पारिस्थितिकी तंत्र को ईवी और उद्योग 4.0 की ओर ले जाने वाले रणनीतिक पत्र।',
      ecosystemHeading: 'पारिस्थितिकी तंत्र स्वास्थ्य संकेतक',
      capacityTitle: 'राज्यव्यापी आईटीआई क्षमता',
      capacitySub: 'सरकारी एवं निजी मान्यता प्राप्त',
      enrolledTitle: 'नामांकित छात्र',
      enrolledSub: 'सभी 36 ज़िलों में',
      placementTitle: 'राज्य प्लेसमेंट अनुपात',
      placementSub: 'औपचारिक विनिर्माण नियुक्तियां',
      modernizationTitle: 'आधुनिकीकरण अनुदान',
      modernizationSub: 'राज्य योजना एवं विश्व बैंक STRIVE',
      activePartners: 'सक्रिय औद्योगिक भागीदार',
      mouPartners: 'शिक्षुता हेतु एमओयू साझेदारी',
      annualCertified: 'वार्षिक प्रमाणित पासआउट',
      certifiedBoard: 'NCVET परीक्षा बोर्ड द्वारा प्रमाणित',
      deficitClusters: 'पहचाने गए कमी क्लस्टर',
      targetedGrants: 'लैब उपकरण अनुदान हेतु लक्षित',
    },
  };
  const str = i18n[language] || i18n.en;

  const handleDistrictChange = (distName) => {
    setDistrict(distName);
    if (onSelectDistrict) {
      onSelectDistrict(distName);
    }
  };

  const activeDistrictObj =
    MAHARASHTRA_DISTRICTS_DATA.find(d => d.name.toLowerCase() === district.toLowerCase()) ||
    MAHARASHTRA_DISTRICTS_DATA[0];

  const baseVolume = activeDistrictObj.activeJobCount || 1500;

  const supplyDemandData = [
    {
      role: activeDistrictObj.focusRoles?.[0] || 'EV Technician',
      industryDemand: Math.round(baseVolume * 0.35),
      itiPassouts: Math.round(baseVolume * 0.15),
    },
    {
      role: activeDistrictObj.focusRoles?.[1] || 'Battery Specialist',
      industryDemand: Math.round(baseVolume * 0.24),
      itiPassouts: Math.round(baseVolume * 0.08),
    },
    {
      role: activeDistrictObj.focusRoles?.[2] || 'CNC Precision Tech',
      industryDemand: Math.round(baseVolume * 0.18),
      itiPassouts: Math.round(baseVolume * 0.10),
    },
    {
      role: 'Wiring Harness Tech',
      industryDemand: Math.round(baseVolume * 0.14),
      itiPassouts: Math.round(baseVolume * 0.08),
    },
  ];

  const menuItems = [
    { id: 'demand-analysis', label: 'District Demand Analysis', icon: MapPin },
    { id: 'training-planning', label: 'District Training Plan (DSDP)', icon: Layers, badge: 'Official DSDP' },
    { id: 'policy-insights', label: 'Policy Insights', icon: FileText, badge: 'Gazetted' },
    { id: 'ecosystem-monitoring', label: 'Ecosystem Monitoring', icon: Activity },
  ];

  return (
    <DashboardLayout
      role="government"
      roleTitle="State Skilling Governance Intelligence"
      menuItems={menuItems}
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      onNavigate={onNavigate}
    >
      {/* 1. DISTRICT-WISE DEMAND ANALYSIS */}
      {activeTab === 'demand-analysis' && (
        <div className="space-y-6">
          {/* Top District Control Bar */}
          <div className="bg-white p-4 rounded-lg border border-[#DDE3E8] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#222222]">{str.targetDistrict}</span>
              <select
                value={district}
                onChange={e => handleDistrictChange(e.target.value)}
                className="px-3 py-1.5 bg-[#F7F8FA] border border-[#DDE3E8] rounded text-xs font-bold text-[#222222] focus:border-[#0056A6] focus:outline-none cursor-pointer"
              >
                {MAHARASHTRA_DISTRICTS_DATA.map(d => (
                  <option key={d.id} value={d.name}>
                    {d.name} {d.name === 'Pune' ? '(Pilot Hub)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#666666]">{str.clusterScore}</span>
              <span className="px-2.5 py-0.5 rounded font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#DDE3E8]">
                {activeDistrictObj.demandScore}/100 {str.demandIndex}
              </span>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title={str.openingsTitle}
              value={activeDistrictObj.activeJobCount?.toLocaleString() || '3,840'}
              subtext={str.openingsSub}
              trend="+14% MoM"
              badgeColor="blue"
            />
            <StatCard
              title={str.deficitTitle}
              value={`${activeDistrictObj.deficitGap || 58}%`}
              subtext={str.deficitSub}
              badgeText="Action Needed"
              badgeColor="rose"
            />
            <StatCard
              title={str.itisTitle}
              value="28 Institutes"
              subtext={str.itisSub}
              badgeText="All Operational"
              badgeColor="emerald"
            />
            <StatCard
              title={str.grantsTitle}
              value="₹14.80 Cr"
              subtext={str.grantsSub}
              badgeText="68% Utilized"
              badgeColor="blue"
            />
          </div>

          {/* Interactive GIS Map & Supply-Demand Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* GIS Map */}
            <div className="lg:col-span-7 bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#003B70]">
                  {str.gisHeading}
                </h3>
                <p className="text-xs text-[#666666]">
                  {str.gisSub}
                </p>
              </div>

              <div className="w-full">
                <MaharashtraMap
                  selectedDistrict={district}
                  onSelectDistrict={handleDistrictChange}
                />
              </div>
            </div>

            {/* Supply vs Demand Deficit Breakdown */}
            <div className="lg:col-span-5 bg-white p-5 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#003B70]">
                  {str.supplyDemandHeading(district)}
                </h3>
                <p className="text-xs text-[#666666]">
                  {str.supplyDemandSub}
                </p>
              </div>

              <GovBarChart
                data={supplyDemandData}
                xKey="role"
                height={300}
                bars={[
                  { key: 'industryDemand', label: str.industryDemandBar, color: '#D96B1F' },
                  { key: 'itiPassouts', label: str.itiPassoutsBar, color: '#F28C28' },
                ]}
              />

              <div className="p-3 bg-[#C62828]/10 border border-[#C62828]/30 rounded text-xs text-[#C62828] space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-[#C62828]">
                  <AlertTriangle className="w-4 h-4 text-[#C62828] shrink-0" />
                  <span>{str.criticalAlertTitle}</span>
                </div>
                <p className="text-[11px] text-[#C62828]/90">
                  {str.criticalAlertSub}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. DISTRICT SKILL DEVELOPMENT PLAN (DSDP) STUDIO */}
      {activeTab === 'training-planning' && (
        <DistrictTrainingPlanStudio defaultDistrict={district} />
      )}

      {/* 3. POLICY INSIGHTS */}
      {activeTab === 'policy-insights' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-6">
            <div>
              <h3 className="text-sm font-bold text-[#003B70]">
                {str.policyHeading}
              </h3>
              <p className="text-xs text-[#666666]">
                {str.policySub}
              </p>
            </div>

            <div className="space-y-4">
              {GOV_POLICY_BRIEFS.map(brief => (
                <div
                  key={brief.id}
                  className="p-5 rounded-lg border border-[#DDE3E8] bg-white hover:border-[#0056A6] transition-colors space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#F7F8FA] text-[#666666] font-bold border border-[#DDE3E8]">
                        {brief.id}
                      </span>
                      <h4 className="text-sm font-bold text-[#003B70]">{brief.title}</h4>
                    </div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#E8F1F8] text-[#0056A6] border border-[#DDE3E8] self-start sm:self-auto">
                      {brief.actionBadge}
                    </span>
                  </div>

                  <p className="text-xs text-[#666666] leading-relaxed">
                    {brief.summary}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-[#666666]">
                    <span>Category: <strong>{brief.category}</strong></span>
                    <span>Gazetted: {brief.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. ECOSYSTEM MONITORING */}
      {activeTab === 'ecosystem-monitoring' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title={str.capacityTitle}
              value={`${GOV_ECOSYSTEM_HEALTH.totalITIs} ITIs`}
              subtext={str.capacitySub}
              badgeColor="blue"
            />
            <StatCard
              title={str.enrolledTitle}
              value={GOV_ECOSYSTEM_HEALTH.totalEnrolledTrainees.toLocaleString()}
              subtext={str.enrolledSub}
              trend="+9.4% YoY"
              badgeColor="emerald"
            />
            <StatCard
              title={str.placementTitle}
              value={GOV_ECOSYSTEM_HEALTH.overallPlacementRate}
              subtext={str.placementSub}
              trend="+4.2% vs 2024"
              badgeColor="emerald"
            />
            <StatCard
              title={str.modernizationTitle}
              value={GOV_ECOSYSTEM_HEALTH.activeModernizationGrants}
              subtext={str.modernizationSub}
              badgeText="Disbursing"
              badgeColor="blue"
            />
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#DDE3E8] shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-[#003B70]">
              {str.ecosystemHeading}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-[#F7F8FA] rounded border border-[#DDE3E8] space-y-1">
                <span className="text-[#666666] font-semibold">{str.activePartners}</span>
                <div className="text-2xl font-black text-[#222222]">{GOV_ECOSYSTEM_HEALTH.industrialPartners} Employers</div>
                <p className="text-[11px] text-[#666666]">{str.mouPartners}</p>
              </div>

              <div className="p-4 bg-[#F7F8FA] rounded border border-[#DDE3E8] space-y-1">
                <span className="text-[#666666] font-semibold">{str.annualCertified}</span>
                <div className="text-2xl font-black text-[#222222]">{GOV_ECOSYSTEM_HEALTH.certifiedThisYear.toLocaleString()} Trainees</div>
                <p className="text-[11px] text-[#666666]">{str.certifiedBoard}</p>
              </div>

              <div className="p-4 bg-[#C62828]/10 rounded border border-[#C62828]/30 space-y-1">
                <span className="text-[#C62828] font-semibold">{str.deficitClusters}</span>
                <div className="text-2xl font-black text-[#C62828]">{GOV_ECOSYSTEM_HEALTH.activeDeficitAreas} Trades</div>
                <p className="text-[11px] text-[#C62828]/90">{str.targetedGrants}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default GovDashboardPage;
