import { useState, useEffect, useCallback } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const SURAHS = [
  { number: 1, name: "Al-Fatihah", arabic: "الفاتحة", verses: 7, juz: 1 },
  { number: 2, name: "Al-Baqarah", arabic: "البقرة", verses: 286, juz: 1 },
  { number: 3, name: "Ali 'Imran", arabic: "آل عمران", verses: 200, juz: 3 },
  { number: 4, name: "An-Nisa", arabic: "النساء", verses: 176, juz: 4 },
  { number: 5, name: "Al-Ma'idah", arabic: "المائدة", verses: 120, juz: 6 },
  { number: 6, name: "Al-An'am", arabic: "الأنعام", verses: 165, juz: 7 },
  { number: 7, name: "Al-A'raf", arabic: "الأعراف", verses: 206, juz: 8 },
  { number: 8, name: "Al-Anfal", arabic: "الأنفال", verses: 75, juz: 9 },
  { number: 9, name: "At-Tawbah", arabic: "التوبة", verses: 129, juz: 10 },
  { number: 10, name: "Yunus", arabic: "يونس", verses: 109, juz: 11 },
  { number: 11, name: "Hud", arabic: "هود", verses: 123, juz: 11 },
  { number: 12, name: "Yusuf", arabic: "يوسف", verses: 111, juz: 12 },
  { number: 13, name: "Ar-Ra'd", arabic: "الرعد", verses: 43, juz: 13 },
  { number: 14, name: "Ibrahim", arabic: "إبراهيم", verses: 52, juz: 13 },
  { number: 15, name: "Al-Hijr", arabic: "الحجر", verses: 99, juz: 14 },
  { number: 16, name: "An-Nahl", arabic: "النحل", verses: 128, juz: 14 },
  { number: 17, name: "Al-Isra", arabic: "الإسراء", verses: 111, juz: 15 },
  { number: 18, name: "Al-Kahf", arabic: "الكهف", verses: 110, juz: 15 },
  { number: 19, name: "Maryam", arabic: "مريم", verses: 98, juz: 16 },
  { number: 20, name: "Ta-Ha", arabic: "طه", verses: 135, juz: 16 },
  { number: 21, name: "Al-Anbiya", arabic: "الأنبياء", verses: 112, juz: 17 },
  { number: 22, name: "Al-Hajj", arabic: "الحج", verses: 78, juz: 17 },
  { number: 23, name: "Al-Mu'minun", arabic: "المؤمنون", verses: 118, juz: 18 },
  { number: 24, name: "An-Nur", arabic: "النور", verses: 64, juz: 18 },
  { number: 25, name: "Al-Furqan", arabic: "الفرقان", verses: 77, juz: 18 },
  { number: 26, name: "Ash-Shu'ara", arabic: "الشعراء", verses: 227, juz: 19 },
  { number: 27, name: "An-Naml", arabic: "النمل", verses: 93, juz: 19 },
  { number: 28, name: "Al-Qasas", arabic: "القصص", verses: 88, juz: 20 },
  { number: 29, name: "Al-'Ankabut", arabic: "العنكبوت", verses: 69, juz: 20 },
  { number: 30, name: "Ar-Rum", arabic: "الروم", verses: 60, juz: 21 },
  { number: 31, name: "Luqman", arabic: "لقمان", verses: 34, juz: 21 },
  { number: 32, name: "As-Sajdah", arabic: "السجدة", verses: 30, juz: 21 },
  { number: 33, name: "Al-Ahzab", arabic: "الأحزاب", verses: 73, juz: 21 },
  { number: 34, name: "Saba", arabic: "سبأ", verses: 54, juz: 22 },
  { number: 35, name: "Fatir", arabic: "فاطر", verses: 45, juz: 22 },
  { number: 36, name: "Ya-Sin", arabic: "يس", verses: 83, juz: 22 },
  { number: 37, name: "As-Saffat", arabic: "الصافات", verses: 182, juz: 23 },
  { number: 38, name: "Sad", arabic: "ص", verses: 88, juz: 23 },
  { number: 39, name: "Az-Zumar", arabic: "الزمر", verses: 75, juz: 23 },
  { number: 40, name: "Ghafir", arabic: "غافر", verses: 85, juz: 24 },
  { number: 41, name: "Fussilat", arabic: "فصلت", verses: 54, juz: 24 },
  { number: 42, name: "Ash-Shura", arabic: "الشورى", verses: 53, juz: 25 },
  { number: 43, name: "Az-Zukhruf", arabic: "الزخرف", verses: 89, juz: 25 },
  { number: 44, name: "Ad-Dukhan", arabic: "الدخان", verses: 59, juz: 25 },
  { number: 45, name: "Al-Jathiyah", arabic: "الجاثية", verses: 37, juz: 25 },
  { number: 46, name: "Al-Ahqaf", arabic: "الأحقاف", verses: 35, juz: 26 },
  { number: 47, name: "Muhammad", arabic: "محمد", verses: 38, juz: 26 },
  { number: 48, name: "Al-Fath", arabic: "الفتح", verses: 29, juz: 26 },
  { number: 49, name: "Al-Hujurat", arabic: "الحجرات", verses: 18, juz: 26 },
  { number: 50, name: "Qaf", arabic: "ق", verses: 45, juz: 26 },
  { number: 51, name: "Adh-Dhariyat", arabic: "الذاريات", verses: 60, juz: 26 },
  { number: 52, name: "At-Tur", arabic: "الطور", verses: 49, juz: 27 },
  { number: 53, name: "An-Najm", arabic: "النجم", verses: 62, juz: 27 },
  { number: 54, name: "Al-Qamar", arabic: "القمر", verses: 55, juz: 27 },
  { number: 55, name: "Ar-Rahman", arabic: "الرحمن", verses: 78, juz: 27 },
  { number: 56, name: "Al-Waqi'ah", arabic: "الواقعة", verses: 96, juz: 27 },
  { number: 57, name: "Al-Hadid", arabic: "الحديد", verses: 29, juz: 27 },
  { number: 58, name: "Al-Mujadila", arabic: "المجادلة", verses: 22, juz: 28 },
  { number: 59, name: "Al-Hashr", arabic: "الحشر", verses: 24, juz: 28 },
  { number: 60, name: "Al-Mumtahanah", arabic: "الممتحنة", verses: 13, juz: 28 },
  { number: 61, name: "As-Saf", arabic: "الصف", verses: 14, juz: 28 },
  { number: 62, name: "Al-Jumu'ah", arabic: "الجمعة", verses: 11, juz: 28 },
  { number: 63, name: "Al-Munafiqun", arabic: "المنافقون", verses: 11, juz: 28 },
  { number: 64, name: "At-Taghabun", arabic: "التغابن", verses: 18, juz: 28 },
  { number: 65, name: "At-Talaq", arabic: "الطلاق", verses: 12, juz: 28 },
  { number: 66, name: "At-Tahrim", arabic: "التحريم", verses: 12, juz: 28 },
  { number: 67, name: "Al-Mulk", arabic: "الملك", verses: 30, juz: 29 },
  { number: 68, name: "Al-Qalam", arabic: "القلم", verses: 52, juz: 29 },
  { number: 69, name: "Al-Haqqah", arabic: "الحاقة", verses: 52, juz: 29 },
  { number: 70, name: "Al-Ma'arij", arabic: "المعارج", verses: 44, juz: 29 },
  { number: 71, name: "Nuh", arabic: "نوح", verses: 28, juz: 29 },
  { number: 72, name: "Al-Jinn", arabic: "الجن", verses: 28, juz: 29 },
  { number: 73, name: "Al-Muzzammil", arabic: "المزمل", verses: 20, juz: 29 },
  { number: 74, name: "Al-Muddaththir", arabic: "المدثر", verses: 56, juz: 29 },
  { number: 75, name: "Al-Qiyamah", arabic: "القيامة", verses: 40, juz: 29 },
  { number: 76, name: "Al-Insan", arabic: "الإنسان", verses: 31, juz: 29 },
  { number: 77, name: "Al-Mursalat", arabic: "المرسلات", verses: 50, juz: 29 },
  { number: 78, name: "An-Naba", arabic: "النبأ", verses: 40, juz: 30 },
  { number: 79, name: "An-Nazi'at", arabic: "النازعات", verses: 46, juz: 30 },
  { number: 80, name: "Abasa", arabic: "عبس", verses: 42, juz: 30 },
  { number: 81, name: "At-Takwir", arabic: "التكوير", verses: 29, juz: 30 },
  { number: 82, name: "Al-Infitar", arabic: "الانفطار", verses: 19, juz: 30 },
  { number: 83, name: "Al-Mutaffifin", arabic: "المطففين", verses: 36, juz: 30 },
  { number: 84, name: "Al-Inshiqaq", arabic: "الانشقاق", verses: 25, juz: 30 },
  { number: 85, name: "Al-Buruj", arabic: "البروج", verses: 22, juz: 30 },
  { number: 86, name: "At-Tariq", arabic: "الطارق", verses: 17, juz: 30 },
  { number: 87, name: "Al-A'la", arabic: "الأعلى", verses: 19, juz: 30 },
  { number: 88, name: "Al-Ghashiyah", arabic: "الغاشية", verses: 26, juz: 30 },
  { number: 89, name: "Al-Fajr", arabic: "الفجر", verses: 30, juz: 30 },
  { number: 90, name: "Al-Balad", arabic: "البلد", verses: 20, juz: 30 },
  { number: 91, name: "Ash-Shams", arabic: "الشمس", verses: 15, juz: 30 },
  { number: 92, name: "Al-Layl", arabic: "الليل", verses: 21, juz: 30 },
  { number: 93, name: "Ad-Duha", arabic: "الضحى", verses: 11, juz: 30 },
  { number: 94, name: "Ash-Sharh", arabic: "الشرح", verses: 8, juz: 30 },
  { number: 95, name: "At-Tin", arabic: "التين", verses: 8, juz: 30 },
  { number: 96, name: "Al-'Alaq", arabic: "العلق", verses: 19, juz: 30 },
  { number: 97, name: "Al-Qadr", arabic: "القدر", verses: 5, juz: 30 },
  { number: 98, name: "Al-Bayyinah", arabic: "البينة", verses: 8, juz: 30 },
  { number: 99, name: "Az-Zalzalah", arabic: "الزلزلة", verses: 8, juz: 30 },
  { number: 100, name: "Al-'Adiyat", arabic: "العاديات", verses: 11, juz: 30 },
  { number: 101, name: "Al-Qari'ah", arabic: "القارعة", verses: 11, juz: 30 },
  { number: 102, name: "At-Takathur", arabic: "التكاثر", verses: 8, juz: 30 },
  { number: 103, name: "Al-'Asr", arabic: "العصر", verses: 3, juz: 30 },
  { number: 104, name: "Al-Humazah", arabic: "الهمزة", verses: 9, juz: 30 },
  { number: 105, name: "Al-Fil", arabic: "الفيل", verses: 5, juz: 30 },
  { number: 106, name: "Quraysh", arabic: "قريش", verses: 4, juz: 30 },
  { number: 107, name: "Al-Ma'un", arabic: "الماعون", verses: 7, juz: 30 },
  { number: 108, name: "Al-Kawthar", arabic: "الكوثر", verses: 3, juz: 30 },
  { number: 109, name: "Al-Kafirun", arabic: "الكافرون", verses: 6, juz: 30 },
  { number: 110, name: "An-Nasr", arabic: "النصر", verses: 3, juz: 30 },
  { number: 111, name: "Al-Masad", arabic: "المسد", verses: 5, juz: 30 },
  { number: 112, name: "Al-Ikhlas", arabic: "الإخلاص", verses: 4, juz: 30 },
  { number: 113, name: "Al-Falaq", arabic: "الفلق", verses: 5, juz: 30 },
  { number: 114, name: "An-Nas", arabic: "الناس", verses: 6, juz: 30 },
];

const TOTAL_VERSES = SURAHS.reduce((sum, s) => sum + s.verses, 0); // 6236

const STATUS = { NONE: "none", LEARNING: "learning", MEMORIZED: "memorized" };

const STORAGE_KEY = "quran_tracker_v1";

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { surahStatus: {}, verseStatus: {} };
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

const LARGE_THRESHOLD = 20;

export default function MemorizationTracker() {
  const [data, setData] = useState(loadData);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [view, setView] = useState("grid"); // grid | stats
  const [filterJuz, setFilterJuz] = useState(0);

  useEffect(() => { saveData(data); }, [data]);

  const getSurahStatus = (num) => data.surahStatus[num] || STATUS.NONE;

  const getVerseMemorized = useCallback((surahNum) => {
    const s = SURAHS.find(s => s.number === surahNum);
    if (!s) return 0;
    const surahStatus = getSurahStatus(surahNum);
    if (surahStatus === STATUS.MEMORIZED) return s.verses;
    const verseMap = data.verseStatus[surahNum] || {};
    return Object.values(verseMap).filter(v => v === STATUS.MEMORIZED).length;
  }, [data]);

  const cycleSurahStatus = (num) => {
    const current = getSurahStatus(num);
    const next = current === STATUS.NONE ? STATUS.LEARNING
      : current === STATUS.LEARNING ? STATUS.MEMORIZED : STATUS.NONE;
    setData(prev => {
      const newData = { ...prev, surahStatus: { ...prev.surahStatus, [num]: next } };
      // If marking memorized, clear individual verse statuses
      if (next === STATUS.MEMORIZED) {
        const vs = { ...prev.verseStatus };
        delete vs[num];
        newData.verseStatus = vs;
      }
      return newData;
    });
  };

  const cycleVerseStatus = (surahNum, verseNum) => {
    setData(prev => {
      const current = (prev.verseStatus[surahNum] || {})[verseNum] || STATUS.NONE;
      const next = current === STATUS.NONE ? STATUS.LEARNING
        : current === STATUS.LEARNING ? STATUS.MEMORIZED : STATUS.NONE;
      const newVerse = { ...(prev.verseStatus[surahNum] || {}), [verseNum]: next };
      const newVerseStatus = { ...prev.verseStatus, [surahNum]: newVerse };

      // Auto-update surah status based on verse completions
      const surah = SURAHS.find(s => s.number === surahNum);
      const allMem = surah && Object.values(newVerse).filter(v => v === STATUS.MEMORIZED).length === surah.verses;
      const anyLearning = Object.values(newVerse).some(v => v !== STATUS.NONE);
      const newSurahStatus = allMem ? STATUS.MEMORIZED : anyLearning ? STATUS.LEARNING : STATUS.NONE;

      return {
        ...prev,
        verseStatus: newVerseStatus,
        surahStatus: { ...prev.surahStatus, [surahNum]: newSurahStatus }
      };
    });
  };

  // Stats
  const totalMemorizedVerses = SURAHS.reduce((sum, s) => sum + getVerseMemorized(s.number), 0);
  const totalLearningVerses = SURAHS.reduce((sum, s) => {
    if (getSurahStatus(s.number) === STATUS.MEMORIZED) return sum;
    const verseMap = data.verseStatus[s.number] || {};
    return sum + Object.values(verseMap).filter(v => v === STATUS.LEARNING).length;
  }, 0);
  const totalBlankVerses = TOTAL_VERSES - totalMemorizedVerses - totalLearningVerses;

  const memorizedSurahs = SURAHS.filter(s => getSurahStatus(s.number) === STATUS.MEMORIZED).length;
  const learningSurahs = SURAHS.filter(s => getSurahStatus(s.number) === STATUS.LEARNING).length;

  const memorizedPct = ((totalMemorizedVerses / TOTAL_VERSES) * 100).toFixed(1);
  const learningPct = ((totalLearningVerses / TOTAL_VERSES) * 100).toFixed(1);

  const pieData = [
    { name: "Memorized", value: totalMemorizedVerses, color: "#4ade80" },
    { name: "Learning", value: totalLearningVerses, color: "#fbbf24" },
    { name: "Not Started", value: totalBlankVerses, color: "#1e293b" },
  ].filter(d => d.value > 0);

  const juzList = Array.from(new Set(SURAHS.map(s => s.juz))).sort((a, b) => a - b);
  const displaySurahs = filterJuz === 0 ? SURAHS : SURAHS.filter(s => s.juz === filterJuz);

  const statusColor = {
    [STATUS.NONE]: "bg-slate-800 border-slate-700 text-slate-400",
    [STATUS.LEARNING]: "bg-amber-900/60 border-amber-600 text-amber-200",
    [STATUS.MEMORIZED]: "bg-emerald-900/60 border-emerald-500 text-emerald-200",
  };

  // TODO why isn't this used?
  const statusDot = {
    [STATUS.NONE]: "bg-slate-600",
    [STATUS.LEARNING]: "bg-amber-400",
    [STATUS.MEMORIZED]: "bg-emerald-400",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-emerald-400" style={{ fontFamily: "Georgia, serif", letterSpacing: "0.02em" }}>
              Quran Hifz Tracker
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">بسم الله الرحمن الرحيم</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-xl font-bold text-emerald-400">{memorizedPct}%</div>
              <div className="text-xs text-slate-500">memorized</div>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <button
              onClick={() => setView(v => v === "grid" ? "stats" : "grid")}
              className="px-4 py-2 rounded-lg text-sm border border-slate-700 hover:border-emerald-600 hover:text-emerald-400 transition-colors bg-slate-800"
            >
              {view === "grid" ? "📊 Stats" : "◉ Grid"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {view === "stats" ? (
          /* STATS VIEW */
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Surahs Memorized", value: memorizedSurahs, sub: "of 114", color: "text-emerald-400" },
                { label: "Surahs Learning", value: learningSurahs, sub: "in progress", color: "text-amber-400" },
                { label: "Verses Memorized", value: totalMemorizedVerses.toLocaleString(), sub: `of ${TOTAL_VERSES.toLocaleString()}`, color: "text-emerald-400" },
                { label: "Overall Progress", value: `${memorizedPct}%`, sub: `+${learningPct}% in progress`, color: "text-emerald-400" },
              ].map(stat => (
                <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>

            {/* Pie chart */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-slate-200 mb-4">Verse Distribution</h2>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div style={{ width: 260, height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={65} outerRadius={110}
                        dataKey="value" paddingAngle={2}>
                        {pieData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} stroke="transparent" />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v, n) => [`${v.toLocaleString()} verses (${((v / TOTAL_VERSES) * 100).toFixed(1)}%)`, n]}
                        contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8, color: "#e2e8f0" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  {pieData.map(d => (
                    <div key={d.name} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: d.color }} />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">{d.name}</span>
                          <span className="text-slate-400">{d.value.toLocaleString()} verses</span>
                        </div>
                        <div className="mt-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${(d.value / TOTAL_VERSES * 100).toFixed(1)}%`, background: d.color }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Juz breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-slate-200 mb-4">Progress by Juz</h2>
              <div className="grid gap-2">
                {juzList.map(juz => {
                  const juzSurahs = SURAHS.filter(s => s.juz === juz);
                  const total = juzSurahs.reduce((a, s) => a + s.verses, 0);
                  const mem = juzSurahs.reduce((a, s) => a + getVerseMemorized(s.number), 0);
                  const pct = total ? (mem / total * 100).toFixed(0) : 0;
                  return (
                    <div key={juz} className="flex items-center gap-3">
                      <div className="text-xs text-slate-500 w-12 shrink-0">Juz {juz}</div>
                      <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="text-xs text-slate-400 w-12 text-right shrink-0">{pct}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* GRID VIEW */
          <div>
            {/* Legend + filter */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-slate-700 border border-slate-600 inline-block" /> Not started</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-900/60 border border-amber-600 inline-block" /> Learning</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-900/60 border border-emerald-500 inline-block" /> Memorized</span>
                <span className="text-slate-600 hidden md:inline">· Click to cycle · Click surah name to expand verses</span>
              </div>
              <select
                value={filterJuz}
                onChange={e => setFilterJuz(Number(e.target.value))}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-300 focus:outline-none focus:border-emerald-600"
              >
                <option value={0}>All Juz</option>
                {juzList.map(j => <option key={j} value={j}>Juz {j}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {displaySurahs.map(surah => {
                const status = getSurahStatus(surah.number);
                const isExpanded = selectedSurah === surah.number;
                const isLarge = surah.verses >= LARGE_THRESHOLD;
                const memCount = getVerseMemorized(surah.number);
                const memPct = Math.round(memCount / surah.verses * 100);

                return (
                  <div key={surah.number}
                    className={`rounded-xl border transition-all duration-200 overflow-hidden ${statusColor[status]}`}>
                    {/* Surah header row */}
                    <div className="flex items-center gap-3 p-3">
                      {/* Number */}
                      <div className="text-xs font-mono text-slate-500 w-6 shrink-0 text-center">{surah.number}</div>

                      {/* Status toggle button */}
                      <button
                        onClick={() => cycleSurahStatus(surah.number)}
                        className={`w-5 h-5 rounded-full border-2 shrink-0 transition-all ${
                          status === STATUS.MEMORIZED ? "bg-emerald-400 border-emerald-400" :
                          status === STATUS.LEARNING ? "bg-amber-400 border-amber-400" :
                          "bg-transparent border-slate-600 hover:border-slate-400"
                        }`}
                        title="Click to cycle status"
                      />

                      {/* Name */}
                      <button
                        className="flex-1 text-left"
                        onClick={() => isLarge ? setSelectedSurah(isExpanded ? null : surah.number) : cycleSurahStatus(surah.number)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-semibold">{surah.name}</span>
                            {isLarge && (
                              <span className="ml-1.5 text-xs opacity-50">{isExpanded ? "▲" : "▼"}</span>
                            )}
                          </div>
                          <span className="text-base font-medium opacity-70" style={{ fontFamily: "'Amiri', 'Scheherazade New', Georgia, serif", direction: "rtl" }}>
                            {surah.arabic}
                          </span>
                        </div>
                        <div className="text-xs opacity-50 mt-0.5">
                          {surah.verses} ayahs · Juz {surah.juz}
                        </div>
                      </button>
                    </div>

                    {/* Progress bar for partial */}
                    {status !== STATUS.MEMORIZED && memCount > 0 && (
                      <div className="px-3 pb-2">
                        <div className="flex justify-between text-xs opacity-50 mb-1">
                          <span>{memCount} / {surah.verses} memorized</span>
                          <span>{memPct}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-900/50 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${memPct}%` }} />
                        </div>
                      </div>
                    )}

                    {/* Verse grid (expanded) */}
                    {isExpanded && isLarge && (
                      <div className="border-t border-slate-700/50 bg-slate-950/60 p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-400">Tap verses to mark progress</span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => {
                                setData(prev => {
                                  const newVerse = {};
                                  for (let i = 1; i <= surah.verses; i++) newVerse[i] = STATUS.MEMORIZED;
                                  return {
                                    ...prev,
                                    verseStatus: { ...prev.verseStatus, [surah.number]: newVerse },
                                    surahStatus: { ...prev.surahStatus, [surah.number]: STATUS.MEMORIZED }
                                  };
                                });
                              }}
                              className="text-xs px-2 py-0.5 rounded bg-emerald-900/50 border border-emerald-700 text-emerald-300 hover:bg-emerald-800/60"
                            >All ✓</button>
                            <button
                              onClick={() => {
                                setData(prev => {
                                  const vs = { ...prev.verseStatus };
                                  delete vs[surah.number];
                                  return {
                                    ...prev,
                                    verseStatus: vs,
                                    surahStatus: { ...prev.surahStatus, [surah.number]: STATUS.NONE }
                                  };
                                });
                              }}
                              className="text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700"
                            >Clear</button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {Array.from({ length: surah.verses }, (_, i) => {
                            const vNum = i + 1;
                            const vStatus = (data.verseStatus[surah.number] || {})[vNum]
                              || (getSurahStatus(surah.number) === STATUS.MEMORIZED ? STATUS.MEMORIZED : STATUS.NONE);
                            return (
                              <button
                                key={vNum}
                                onClick={() => cycleVerseStatus(surah.number, vNum)}
                                title={`Ayah ${vNum} — ${vStatus}`}
                                className={`w-7 h-7 rounded text-xs font-mono transition-all hover:scale-110 border ${
                                  vStatus === STATUS.MEMORIZED ? "bg-emerald-700 border-emerald-500 text-emerald-100" :
                                  vStatus === STATUS.LEARNING ? "bg-amber-800/70 border-amber-600 text-amber-200" :
                                  "bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-500"
                                }`}
                              >
                                {vNum}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Footer hint */}
      <footer className="text-center py-8 text-xs text-slate-700">
        Progress is saved automatically in your browser · {TOTAL_VERSES.toLocaleString()} total verses across 114 surahs
      </footer>
    </div>
  );
}
