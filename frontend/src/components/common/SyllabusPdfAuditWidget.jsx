import React, { useState, useEffect, useRef } from 'react';
import {
  FileUp,
  FileText,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Wrench,
  Clock,
  Building2,
  Trash2,
  Download,
  Share2,
  ChevronRight,
  RefreshCw,
  Sliders,
  Check,
  Award,
  Layers,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { auditSyllabusPdf, fetchSampleSyllabi } from '../../lib/api.js';
import { useLanguage } from '../../context/LanguageContext.jsx';

export const SyllabusPdfAuditWidget = ({
  defaultDistrict = 'Pune',
  onDeployToSyllabus,
  onRequestLabGrant,
}) => {
  const { language } = useLanguage();
  const fileInputRef = useRef(null);

  // Form State
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileBase64, setFileBase64] = useState(null);
  const [rawText, setRawText] = useState('');
  const [inputMode, setInputMode] = useState('upload'); // 'upload' | 'text' | 'preset'
  const [selectedPresetId, setSelectedPresetId] = useState('sample-iti-electrician');
  const [selectedDistrict, setSelectedDistrict] = useState(defaultDistrict);
  const [selectedTrade, setSelectedTrade] = useState('Electrician & EV Technician');

  // Async & UI State
  const [samples, setSamples] = useState([]);
  const [auditing, setAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState(null);
  const [error, setError] = useState(null);
  const [deployed, setDeployed] = useState(false);
  const [filterCoverage, setFilterCoverage] = useState('ALL'); // 'ALL' | 'COVERED' | 'PARTIAL' | 'NOT_COVERED'

  // Load sample syllabi on mount
  useEffect(() => {
    fetchSampleSyllabi()
      .then(data => setSamples(data || []))
      .catch(console.error);
  }, []);

  // Update district if prop changes
  useEffect(() => {
    if (defaultDistrict) setSelectedDistrict(defaultDistrict);
  }, [defaultDistrict]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSelectedFile(file);

    // Read base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const b64 = event.target?.result?.toString().split(',')[1];
      setFileBase64(b64 || null);
    };
    reader.readAsDataURL(file);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setFileBase64(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Run audit
  const handleRunAudit = async () => {
    setAuditing(true);
    setError(null);
    setDeployed(false);

    try {
      let payload = {
        tradeSector: selectedTrade,
        district: selectedDistrict,
      };

      if (inputMode === 'upload') {
        if (!selectedFile && !fileBase64) {
          throw new Error('Please choose a syllabus PDF file to upload.');
        }
        payload.file = selectedFile;
        payload.base64 = fileBase64;
        payload.fileName = selectedFile?.name || 'Uploaded_Syllabus.pdf';
      } else if (inputMode === 'text') {
        if (!rawText.trim()) {
          throw new Error('Please enter or paste your syllabus content.');
        }
        payload.rawText = rawText;
        payload.fileName = 'Pasted_Curriculum_Outline.txt';
      } else if (inputMode === 'preset') {
        payload.sampleId = selectedPresetId;
      }

      const res = await auditSyllabusPdf(payload);
      setAuditResult(res);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error occurred while auditing syllabus.');
    } finally {
      setAuditing(false);
    }
  };

  // Deploy action
  const handleDeploy = () => {
    setDeployed(true);
    if (onDeployToSyllabus) {
      onDeployToSyllabus(auditResult?.bridgeRecommendation);
    }
  };

  // Filtered competencies
  const filteredCompetencies = (auditResult?.competencies || []).filter(c => {
    if (filterCoverage === 'ALL') return true;
    return c.coverageStatus === filterCoverage;
  });

  const alignmentScore = auditResult?.overallAlignmentScore || 0;
  const deficit = 100 - alignmentScore;

  const i18n = {
    en: {
      badge: 'DVET Maharashtra AI Curriculum Observatory',
      title: 'Syllabus PDF Upload & Industry Alignment Audit',
      subtitle:
        'Upload your institutional trade syllabus (PDF / text) to automatically benchmark every curriculum topic against 2026 industrial requirements, detect obsolete units, and calculate overall alignment.',
      tabUpload: 'Upload Syllabus PDF',
      tabPreset: 'Use Sample Trade Syllabi',
      tabText: 'Paste Syllabus Content',
      dragDropTitle: 'Upload Institutional Syllabus PDF',
      dragDropSub: 'Supports official DGT, NCVT, or Autonomous ITI syllabi (.pdf up to 30MB)',
      browseBtn: 'Select PDF File',
      fileAttached: 'File attached and ready for AI semantic audit',
      removeFile: 'Remove',
      tradeLabel: 'Target Vocational Trade:',
      districtLabel: 'Industrial Demand Benchmark:',
      auditBtn: 'Run AI Curriculum Alignment Audit',
      auditingText: 'Auditing Syllabus Semantics against Maharashtra Industrial Demands...',
      overallAlignment: 'Overall Industry Alignment',
      deficitLabel: 'Curricular Deficit',
      practicalRatio: 'Practical Lab Ratio',
      awardingBody: 'Awarding Body',
      nsqfLevel: 'Target Qualification',
      sideBySideTitle: 'Side-by-Side Competency Alignment Matrix',
      sideBySideSub: 'Real-time mapping of syllabus coverage vs active industrial demand in Maharashtra corridors.',
      allTab: 'All Competencies',
      coveredTab: 'Fully Covered',
      partialTab: 'Theoretical Only',
      missingTab: 'Missing from Syllabus',
      demandScore: 'Demand Score',
      obsoleteHeading: 'Flagged Obsolete / Legacy Syllabus Modules',
      obsoleteSub: 'Units detected in syllabus that modern industrial shops have phased out.',
      missingHeading: 'Missing Modern Competencies in High Demand',
      bridgeHeading: 'Recommended DVET Bridge Action Plan',
      deployBtn: 'Deploy Bridge Module to Trade Syllabus',
      deployedBtn: '✓ Deployed to Institute Syllabus',
      labGrantBtn: 'Request Modern Lab Hardware Grant',
      printReportBtn: 'Print / Export Audit Certificate',
    },
    mr: {
      badge: 'DVET महाराष्ट्र एआय अभ्यासक्रम वेधशाळा',
      title: 'अभ्यासक्रम पीडीएफ अपलोड आणि औद्योगिक मागणी संरेखन',
      subtitle:
        'आपल्या आयटीआयचा अभ्यासक्रम (PDF) अपलोड करा आणि २०२६ च्या औद्योगिक गरजांनुसार प्रत्येक विषयाचे मूल्यांकन करा.',
      tabUpload: 'पीडीएफ अपलोड करा',
      tabPreset: 'नमुना अभ्यासक्रम वापरा',
      tabText: 'अभ्यासक्रम मजकूर पेस्ट करा',
      dragDropTitle: 'संस्थेचा अभ्यासक्रम पीडीएफ अपलोड करा',
      dragDropSub: 'अधिकृत DGT किंवा NCVT अभ्यासक्रम (.pdf कमाल ३० MB)',
      browseBtn: 'फाइल निवडा',
      fileAttached: 'फाइल तपासणीसाठी सज्ज',
      removeFile: 'काढून टाका',
      tradeLabel: 'व्यवसाय (ट्रेड):',
      districtLabel: 'औद्योगिक मागणी जिल्हा:',
      auditBtn: 'एआय अभ्यासक्रम संरेखन ऑडिट सुरू करा',
      auditingText: 'अभ्यासक्रमाचे औद्योगिक मागण्यांशी मूल्यांकन सुरू आहे...',
      overallAlignment: 'एकूण उद्योग संरेखन',
      deficitLabel: 'अभ्यासक्रम तूट',
      practicalRatio: 'प्रात्यक्षिक गुणोत्तर',
      awardingBody: 'प्रमाणपत्र मंडळ',
      nsqfLevel: 'पात्रता स्तर',
      sideBySideTitle: 'क्षमता संरेखन ऑडिट तपशील',
      sideBySideSub: 'शिकवला जाणारा अभ्यासक्रम आणि प्रत्यक्ष औद्योगिक मागणी यांची थेट तुलना.',
      allTab: 'सर्व क्षमता',
      coveredTab: 'पूर्ण समाविष्ट',
      partialTab: 'केवळ सैद्धांतिक',
      missingTab: 'अभ्यासक्रमात अनुपलब्ध',
      demandScore: 'मागणी गुण',
      obsoleteHeading: 'लबदाड किंवा कालबाह्य ठरलेले घटक',
      obsoleteSub: 'आधुनिक उद्योगांनी वगळलेले घटक जे सध्याच्या अभ्यासक्रमात आढळले.',
      missingHeading: 'उच्च मागणी असलेली अनुपलब्ध आधुनिक कौशल्ये',
      bridgeHeading: 'अनुशंसित DVET सेतू अभ्यासक्रम योजना',
      deployBtn: 'सेतू अभ्यासक्रम लागू करा',
      deployedBtn: '✓ अभ्यासक्रमात लागू केले',
      labGrantBtn: 'प्रयोगशाळा उपकरणांसाठी अनुदान मागणी',
      printReportBtn: 'ऑडिट प्रमाणपत्र प्रिंट करा',
    },
    hi: {
      badge: 'DVET महाराष्ट्र एआई पाठ्यक्रम वेधशाला',
      title: 'पाठ्यक्रम पीडीएफ अपलोड और उद्योग संरेखण ऑडिट',
      subtitle:
        'अपनी आईटीआई का पाठ्यक्रम (PDF) अपलोड करें और २०२६ की औद्योगिक आवश्यकताओं के अनुसार प्रत्येक विषय का मूल्यांकन करें।',
      tabUpload: 'पीडीएफ अपलोड करें',
      tabPreset: 'नमूना पाठ्यक्रम उपयोग करें',
      tabText: 'पाठ्यक्रम पाठ पेस्ट करें',
      dragDropTitle: 'संस्थान का पाठ्यक्रम पीडीएफ अपलोड करें',
      dragDropSub: 'आधिकारिक DGT या NCVT पाठ्यक्रम (.pdf अधिकतम ३० MB)',
      browseBtn: 'फ़ाइल चुनें',
      fileAttached: 'फ़ाइल परीक्षण के लिए तैयार',
      removeFile: 'हटाएं',
      tradeLabel: 'व्यावसायिक ट्रेड:',
      districtLabel: 'औद्योगिक मांग जिला:',
      auditBtn: 'एआई पाठ्यक्रम संरेखण ऑडिट शुरू करें',
      auditingText: 'पाठ्यक्रम का औद्योगिक मांगों के साथ मूल्यांकन किया जा रहा है...',
      overallAlignment: 'समग्र उद्योग संरेखण',
      deficitLabel: 'पाठ्यक्रम घाटा',
      practicalRatio: 'व्यावहारिक अनुपात',
      awardingBody: 'प्रमाणन बोर्ड',
      nsqfLevel: 'योग्यता स्तर',
      sideBySideTitle: 'दक्षता संरेखण ऑडिट विवरण',
      sideBySideSub: 'सिखाए जाने वाले पाठ्यक्रम और प्रत्यक्ष औद्योगिक मांग की तुलना।',
      allTab: 'सभी दक्षताएं',
      coveredTab: 'पूर्ण संरेखित',
      partialTab: 'केवल सैद्धांतिक',
      missingTab: 'पाठ्यक्रम में अनुपस्थित',
      demandScore: 'मांग स्कोर',
      obsoleteHeading: 'अप्रचलित या पुराने पाठ्यक्रम मॉड्यूल',
      obsoleteSub: 'वे विषय जो आधुनिक उद्योगों में अब उपयोग नहीं होते।',
      missingHeading: 'उच्च मांग वाले आधुनिक कौशल',
      bridgeHeading: 'अनुशंसित DVET सेतु पाठ्यक्रम योजना',
      deployBtn: 'सेतु पाठ्यक्रम लागू करें',
      deployedBtn: '✓ पाठ्यक्रम में लागू किया गया',
      labGrantBtn: 'प्रयोगशाला उपकरण अनुदान मांगें',
      printReportBtn: 'ऑडिट प्रमाणपत्र प्रिंट करें',
    },
  };

  const str = i18n[language] || i18n.en;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                {str.badge}
              </span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                DVET State Skill Committee
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
              {str.title}
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              {str.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Multimodal PDF Engine Active
            </span>
          </div>
        </div>
      </div>

      {/* Main Upload & Config Workspace */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        {/* Input Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setInputMode('upload')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                inputMode === 'upload'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileUp className="w-3.5 h-3.5" />
              {str.tabUpload}
            </button>
            <button
              onClick={() => setInputMode('preset')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                inputMode === 'preset'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              {str.tabPreset}
            </button>
            <button
              onClick={() => setInputMode('text')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                inputMode === 'text'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              {str.tabText}
            </button>
          </div>

          {/* Quick Trade & District Selectors */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-700">{str.tradeLabel}</label>
              <select
                value={selectedTrade}
                onChange={e => setSelectedTrade(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Electrician & EV Technician">Electrician &amp; EV Technician</option>
                <option value="Machinist & CNC Programming">Machinist &amp; CNC Programming</option>
                <option value="Solar Technician (Electrical)">Solar Technician (Renewable)</option>
                <option value="IoT & Smart Factory Technician">IoT &amp; Smart Factory Technician</option>
                <option value="Automotive Mechanic">Automotive Mechanic (Mechatronics)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-700">{str.districtLabel}</label>
              <select
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Pune">Pune (Chakan &amp; Talegaon Belt)</option>
                <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar (Waluj)</option>
                <option value="Nashik">Nashik (Ambad &amp; Satpur)</option>
                <option value="Kolhapur">Kolhapur &amp; Solapur Cluster</option>
                <option value="all">All Maharashtra Industrial Corridors</option>
              </select>
            </div>
          </div>
        </div>

        {/* 1. PDF FILE UPLOADER */}
        {inputMode === 'upload' && (
          <div className="space-y-4">
            {!selectedFile ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                    setSelectedFile(file);
                    const reader = new FileReader();
                    reader.onload = ev => {
                      setFileBase64(ev.target?.result?.toString().split(',')[1] || null);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-indigo-50/20 hover:bg-indigo-50/40 rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,application/pdf"
                  className="hidden"
                />
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 group-hover:bg-indigo-600 text-indigo-700 group-hover:text-white flex items-center justify-center mx-auto transition-colors shadow-xs mb-3">
                  <FileUp className="w-8 h-8 transition-transform group-hover:-translate-y-0.5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-900">
                  {str.dragDropTitle}
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  {str.dragDropSub}
                </p>
                <div className="mt-4">
                  <button
                    type="button"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors pointer-events-none"
                  >
                    {str.browseBtn}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs uppercase border border-red-200 shrink-0">
                    PDF
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{selectedFile.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB &middot; {str.fileAttached}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClearFile}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-slate-500" />
                    {str.removeFile}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. PRESET SAMPLES */}
        {inputMode === 'preset' && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 block">
              Select Official Maharashtra / DGT Reference Trade Syllabus:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {samples.map(sample => {
                const isSelected = selectedPresetId === sample.id;
                return (
                  <div
                    key={sample.id}
                    onClick={() => {
                      setSelectedPresetId(sample.id);
                      setSelectedTrade(sample.trade);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer text-left space-y-2 ${
                      isSelected
                        ? 'bg-indigo-50/60 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                        NSQF Level {sample.nsqfLevel}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-indigo-600 font-bold" />}
                    </div>
                    <h5 className="font-bold text-slate-900 text-xs leading-snug">
                      {sample.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {sample.description}
                    </p>
                    <div className="text-[10px] text-slate-400 font-semibold pt-1">
                      Duration: {sample.totalHours} hrs &middot; {sample.academicSession}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. PASTE TEXT */}
        {inputMode === 'text' && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Paste Syllabus Curriculum Units or Module Table:
            </label>
            <textarea
              rows={6}
              value={rawText}
              onChange={e => setRawText(e.target.value)}
              placeholder="Paste units, topics, practical lab exercises, or semester break-down here..."
              className="w-full p-4 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 leading-relaxed"
            />
          </div>
        )}

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              Benchmarking against live hiring criteria across 12,000+ vacancies in Maharashtra.
            </span>
          </div>

          <button
            onClick={handleRunAudit}
            disabled={auditing}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
              auditing
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 active:scale-98 shadow-indigo-200'
            }`}
          >
            {auditing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>{str.auditingText}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{str.auditBtn}</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* AUDIT RESULTS REPORT */}
      {auditResult && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Executive Overview Card */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
                  {auditResult.auditId}
                </span>
                <span className="text-xs text-slate-400">
                  {str.awardingBody}: {auditResult.awardingBody}
                </span>
                <span className="text-xs text-slate-400">&middot; {auditResult.detectedNsqfLevel}</span>
                <span className="text-xs text-slate-400">&middot; {auditResult.district} Benchmark</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {auditResult.courseTitle}
              </h3>

              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                {auditResult.executiveSummary}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Duration: {auditResult.totalHours} hrs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>
                    Practical / Lab Ratio: <strong>{Math.round((auditResult.practicalHoursRatio || 0.4) * 100)}%</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Overall Alignment Score Gauge */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                {str.overallAlignment}
              </div>
              <div
                className={`text-5xl font-black tracking-tight ${
                  alignmentScore >= 75
                    ? 'text-emerald-400'
                    : alignmentScore >= 55
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {alignmentScore}%
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5 mt-3 overflow-hidden max-w-[200px]">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    alignmentScore >= 75
                      ? 'bg-emerald-400'
                      : alignmentScore >= 55
                      ? 'bg-amber-400'
                      : 'bg-rose-400'
                  }`}
                  style={{ width: `${alignmentScore}%` }}
                />
              </div>
              <span
                className={`inline-block mt-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  alignmentScore >= 75
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : alignmentScore >= 55
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-rose-950 text-rose-300 border border-rose-800'
                }`}
              >
                {deficit}% {str.deficitLabel} vs 2026 Chakan OEM Criteria
              </span>
            </div>
          </div>

          {/* Side-by-Side Competency Alignment Audit Table */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {str.sideBySideTitle}
                </h4>
                <p className="text-xs text-slate-500">
                  {str.sideBySideSub}
                </p>
              </div>

              {/* Coverage Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
                <button
                  onClick={() => setFilterCoverage('ALL')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    filterCoverage === 'ALL'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {str.allTab} ({(auditResult.competencies || []).length})
                </button>
                <button
                  onClick={() => setFilterCoverage('COVERED')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                    filterCoverage === 'COVERED'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {str.coveredTab}
                </button>
                <button
                  onClick={() => setFilterCoverage('PARTIAL')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                    filterCoverage === 'PARTIAL'
                      ? 'bg-amber-700 text-white'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {str.partialTab}
                </button>
                <button
                  onClick={() => setFilterCoverage('NOT_COVERED')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                    filterCoverage === 'NOT_COVERED'
                      ? 'bg-rose-700 text-white'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5" />
                  {str.missingTab}
                </button>
              </div>
            </div>

            {/* Competency Cards */}
            <div className="space-y-3 pt-2">
              {filteredCompetencies.map((comp, idx) => {
                const isCovered = comp.coverageStatus === 'COVERED';
                const isPartial = comp.coverageStatus === 'PARTIAL';
                const isMissing = comp.coverageStatus === 'NOT_COVERED';

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all ${
                      isCovered
                        ? 'bg-emerald-50/30 border-emerald-200'
                        : isPartial
                        ? 'bg-amber-50/40 border-amber-200'
                        : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                      {/* Left: Skill Demand */}
                      <div className="md:col-span-5 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">
                            {comp.skillName}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-800">
                            {str.demandScore}: {comp.demandScore}/100
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Category: {comp.category}
                        </p>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {comp.gapDiagnostic}
                        </p>
                      </div>

                      {/* Middle: Syllabus Coverage */}
                      <div className="md:col-span-4 space-y-1 border-t md:border-t-0 md:border-l border-slate-200/80 pt-2 md:pt-0 md:pl-4">
                        <div className="flex items-center gap-1.5 font-bold text-xs">
                          {isCovered && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                          {isPartial && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                          {isMissing && <XCircle className="w-4 h-4 text-rose-600" />}
                          <span
                            className={
                              isCovered
                                ? 'text-emerald-800'
                                : isPartial
                                ? 'text-amber-800'
                                : 'text-rose-800'
                            }
                          >
                            {isCovered
                              ? 'Syllabus Aligned (Taught & Tested)'
                              : isPartial
                              ? 'Theoretical Only (Lacks Lab Drills)'
                              : 'Omitted from Trade Syllabus'}
                          </span>
                        </div>
                        <div className="text-xs text-slate-700">
                          <strong>Syllabus Evidence:</strong> {comp.syllabusTopic}
                        </div>
                        <div className="text-[11px] text-slate-600">
                          <strong>Corrective Recommendation:</strong> {comp.recommendedAction}
                        </div>
                      </div>

                      {/* Right: Lab Hardware Equipment */}
                      <div className="md:col-span-3 space-y-1.5 border-t md:border-t-0 md:border-l border-slate-200/80 pt-2 md:pt-0 md:pl-4">
                        <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                          <Wrench className="w-3.5 h-3.5 text-indigo-600" />
                          Required Hardware Spec:
                        </div>
                        <div className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-2xs font-medium">
                          {comp.requiredLabEquipment || 'Safety Isolation Test Rig'}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2 Grid: Obsolete Modules + Missing Modern Competencies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Obsolete Topics */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>{str.obsoleteHeading}</span>
              </div>
              <p className="text-xs text-slate-500">
                {str.obsoleteSub}
              </p>

              <div className="space-y-3">
                {(auditResult.obsoleteTopics || []).map((obs, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200 space-y-1">
                    <div className="font-bold text-xs text-rose-950">
                      {obs.topicName}
                    </div>
                    <p className="text-[11px] text-slate-600">
                      <strong>Deficit:</strong> {obs.reasonObsolete}
                    </p>
                    <p className="text-[11px] text-indigo-900 font-medium">
                      <strong>Suggested Replacement:</strong> {obs.replacementRecommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Emerging Skills */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>{str.missingHeading}</span>
              </div>
              <p className="text-xs text-slate-500">
                Urgent industry requirements reported by anchor employers in {auditResult.district}.
              </p>

              <div className="space-y-3">
                {(auditResult.missingEmergingSkills || []).map((sk, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-indigo-950">{sk.skillName}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-indigo-700 border border-indigo-200">
                        {sk.recommendedHours || 30} Hours Module
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      {sk.industrialNeed}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Approved DVET Bridge Action Plan Card */}
          {auditResult.bridgeRecommendation && (
            <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/40">
                    State Skill Committee Action Directive
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-white mt-1.5">
                    {auditResult.bridgeRecommendation.moduleTitle}
                  </h4>
                  <p className="text-xs text-indigo-200 mt-1 max-w-2xl leading-relaxed">
                    {auditResult.bridgeRecommendation.syllabusSummary}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs text-indigo-300 font-semibold">Est. Capital / Lab Setup</div>
                  <div className="text-xl font-black text-amber-300">
                    {auditResult.bridgeRecommendation.estimatedLabCost}
                  </div>
                  <div className="text-[10px] text-indigo-300">Target: {auditResult.bridgeRecommendation.targetBatch}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-indigo-700/60 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleDeploy}
                    disabled={deployed}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                      deployed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                    }`}
                  >
                    {deployed ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{str.deployedBtn}</span>
                      </>
                    ) : (
                      <>
                        <Layers className="w-4 h-4" />
                        <span>{str.deployBtn}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      if (onRequestLabGrant) onRequestLabGrant();
                      else window.alert('Grant application dispatched to DVET Modernization Directorate.');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <Wrench className="w-4 h-4 text-amber-300" />
                    <span>{str.labGrantBtn}</span>
                  </button>
                </div>

                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-bold text-xs transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{str.printReportBtn}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SyllabusPdfAuditWidget;
