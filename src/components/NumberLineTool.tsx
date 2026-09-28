import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Ruler,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers,
  Pizza,
  Compass,
  Tag,
  ArrowLeftRight,
  Share2,
  Printer,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

interface NumberLineToolProps {
  isModalMode?: boolean;
  onCloseModal?: () => void;
}

export const NumberLineTool: React.FC<NumberLineToolProps> = ({
  isModalMode = false,
  onCloseModal,
}) => {
  // Range limits: from -extent to +extent
  const [extent, setExtent] = useState<number>(5);
  // Mode: integer, decimal, fraction
  const [mode, setMode] = useState<"integer" | "decimal" | "fraction">("fraction");
  // Denominator: 2 to 12
  const [denominator, setDenominator] = useState<number>(10);
  // Current numerator / steps
  const [currentNumerator, setCurrentNumerator] = useState<number>(0);
  // Direct input fields
  const [inputVal, setInputVal] = useState<string>("0");
  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // Copy notification
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const minExtent = -extent;
  const maxExtent = extent;

  // Active denominator depending on mode
  const activeDenominator = useMemo(() => {
    if (mode === "integer") return 1;
    if (mode === "decimal") return 10;
    return denominator;
  }, [mode, denominator]);

  const minSteps = minExtent * activeDenominator;
  const maxSteps = maxExtent * activeDenominator;

  // GCD helper for simplification
  const gcd = (a: number, b: number): number => {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
  };

  // Format value into HTML / rich JSX
  const formatFraction = (num: number, den: number) => {
    if (num === 0) return <span>0</span>;

    if (mode === "decimal") {
      const val = (num / 10).toFixed(1);
      return <span>{Number(val) > 0 ? `+${val}` : val}</span>;
    }

    const sign = num < 0 ? "-" : "";
    const absNum = Math.abs(num);

    if (den === 1) {
      return <span>{sign + absNum}</span>;
    }

    const whole = Math.floor(absNum / den);
    const rem = absNum % den;

    if (rem === 0) {
      return <span>{sign + whole}</span>;
    }

    const common = gcd(rem, den);
    const simpNum = rem / common;
    const simpDen = den / common;

    if (whole === 0) {
      return (
        <span className="inline-flex items-center gap-0.5">
          {sign}
          <span className="inline-flex flex-col text-center text-xs leading-none">
            <span className="border-b border-current px-0.5 font-bold">{simpNum}</span>
            <span className="px-0.5 font-bold">{simpDen}</span>
          </span>
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1">
          <span>{sign + whole}</span>
          <span className="inline-flex flex-col text-center text-xs leading-none">
            <span className="border-b border-current px-0.5 font-bold">{simpNum}</span>
            <span className="px-0.5 font-bold">{simpDen}</span>
          </span>
        </span>
      );
    }
  };

  // Plain text format for badges, voice, and labels
  const formatPlainValue = (num: number, den: number): string => {
    if (num === 0) return "0";
    if (mode === "decimal") {
      const val = (num / 10).toFixed(1);
      return Number(val) > 0 ? `+${val}` : val;
    }
    const sign = num < 0 ? "-" : "";
    const absNum = Math.abs(num);
    if (den === 1) return sign + absNum;
    const whole = Math.floor(absNum / den);
    const rem = absNum % den;
    if (rem === 0) return sign + whole;
    const common = gcd(rem, den);
    const simpNum = rem / common;
    const simpDen = den / common;
    if (whole === 0) return `${sign}${simpNum}/${simpDen}`;
    return `${sign}${whole} و (${simpNum}/${simpDen})`;
  };

  // Clamp & update value
  const updateValue = (newStep: number) => {
    let val = Math.max(minSteps, Math.min(maxSteps, newStep));
    setCurrentNumerator(val);
    if (mode === "decimal") {
      setInputVal((val / 10).toFixed(1));
    } else {
      setInputVal(val.toString());
    }
  };

  // Keep input in sync when mode or denominator changes
  useEffect(() => {
    updateValue(currentNumerator);
  }, [mode, activeDenominator, extent]);

  // Step change (+1, -1)
  const stepChange = (delta: number) => {
    updateValue(currentNumerator + delta);
  };

  // Reset
  const resetToZero = () => {
    updateValue(0);
  };

  // Classification info
  const classification = useMemo(() => {
    if (currentNumerator === 0) {
      return {
        text: "محايد (الصفر 0)",
        color: "text-purple-700 bg-purple-50 border-purple-300",
        badge: "محايد",
      };
    }
    if (currentNumerator > 0) {
      if (mode === "decimal") {
        return {
          text: "كسر عشري موجب (+)",
          color: "text-emerald-700 bg-emerald-50 border-emerald-300",
          badge: "عشري موجب",
        };
      }
      if (activeDenominator === 1) {
        return {
          text: "عدد صحيح طبيعي / موجب",
          color: "text-emerald-700 bg-emerald-50 border-emerald-300",
          badge: "صحيح موجب",
        };
      }
      return {
        text: "كسر / عدد كسري موجب (+)",
        color: "text-emerald-700 bg-emerald-50 border-emerald-300",
        badge: "كسري موجب",
      };
    }
    // Negative
    if (mode === "decimal") {
      return {
        text: "كسر عشري سالب (-)",
        color: "text-rose-700 bg-rose-50 border-rose-300",
        badge: "عشري سالب",
      };
    }
    if (activeDenominator === 1) {
      return {
        text: "عدد صحيح نسبي سالب (-)",
        color: "text-rose-700 bg-rose-50 border-rose-300",
        badge: "صحيح سالب",
      };
    }
    return {
      text: "كسر / عدد كسري سالب (-)",
      color: "text-rose-700 bg-rose-50 border-rose-300",
      badge: "كسري سالب",
    };
  }, [currentNumerator, mode, activeDenominator]);

  // Pronounce in Arabic
  const handleSpeak = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    let speakStr = "";
    if (currentNumerator === 0) {
      speakStr = "العدد صفر، وهو عنصر محايد يفصل بين الأعداد الموجبة والسالبة.";
    } else if (mode === "decimal") {
      const dec = (currentNumerator / 10).toFixed(1);
      const isNeg = currentNumerator < 0;
      speakStr = `${isNeg ? "ناقص" : "زائد"} ${Math.abs(Number(dec))}`;
    } else if (activeDenominator === 1) {
      speakStr = `${currentNumerator < 0 ? "سالب" : "موجب"} ${Math.abs(currentNumerator)}`;
    } else {
      const abs = Math.abs(currentNumerator);
      const whole = Math.floor(abs / activeDenominator);
      const rem = abs % activeDenominator;
      const isNeg = currentNumerator < 0;
      const signWord = isNeg ? "سالب" : "موجب";
      if (rem === 0) {
        speakStr = `${signWord} ${whole}`;
      } else {
        const common = gcd(rem, activeDenominator);
        const sNum = rem / common;
        const sDen = activeDenominator / common;
        if (whole === 0) {
          speakStr = `${signWord} ${sNum} على ${sDen}`;
        } else {
          speakStr = `${signWord} ${whole} و ${sNum} على ${sDen}`;
        }
      }
    }

    const utterance = new SpeechSynthesisUtterance(speakStr);
    utterance.lang = "ar-SA";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  // Copy current value
  const handleCopy = () => {
    const text = formatPlainValue(currentNumerator, activeDenominator);
    navigator.clipboard?.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const inverseNumerator = -currentNumerator;
  const absNumerator = Math.abs(currentNumerator);

  return (
    <div
      ref={containerRef}
      className={`font-cairo text-right transition-all ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-slate-50 p-4 md:p-6 overflow-y-auto"
          : "space-y-4"
      }`}
      dir="rtl"
    >
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white rounded-2xl p-4 md:p-5 shadow-md border border-purple-700/40 relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[11px] font-black px-3 py-0.5 rounded-full uppercase tracking-wide shadow-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                أداة بيداغوجية تفاعلية
              </span>
              <span className="text-[11px] bg-white/10 text-amber-300 px-2.5 py-0.5 rounded-full font-bold">
                الرياضيات • سلك التعليم الابتدائي والإعدادي
              </span>
            </div>
            <h1 className="text-lg md:text-2xl font-black text-white flex items-center gap-2">
              <Ruler className="w-6 h-6 text-amber-400 shrink-0" />
              <span>وسيلة تمثيل الأعداد والكسور على خط الأعداد</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed max-w-2xl">
              أداة ديداكتيكية رقمية ممتعة لاستيعاب مفهوم الأعداد النسبية، تدريج المستقيم، تمثيل الكسور الاعتيادية والعشرية، المعكوس الجمعي (-x)، والقيمة المطلقة (|x|).
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              type="button"
              onClick={handleSpeak}
              className="bg-purple-600/80 hover:bg-purple-500 text-white font-bold p-2 md:px-3 md:py-1.5 rounded-xl text-xs transition cursor-pointer flex items-center gap-1 shadow-xs border border-purple-400/40"
              title="نطق العدد شفهياً باللغة العربية"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span className="hidden md:inline">نطق العدد</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="bg-blue-600/80 hover:bg-blue-500 text-white font-bold p-2 md:px-3 md:py-1.5 rounded-xl text-xs transition cursor-pointer flex items-center gap-1 shadow-xs border border-blue-400/40"
              title="نسخ القيمة الحالية"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span className="hidden md:inline">تم النسخ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-200" />
                  <span className="hidden md:inline">نسخ</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="bg-slate-800/90 hover:bg-slate-700 text-white font-bold p-2 md:px-3 md:py-1.5 rounded-xl text-xs transition cursor-pointer flex items-center gap-1 shadow-xs border border-slate-600"
              title="عرض على كامل الشاشة للسبورة التفاعلية"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-4 h-4 text-amber-300" />
                  <span className="hidden md:inline">تصغير</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4 text-amber-300" />
                  <span className="hidden md:inline">ملء الشاشة</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4 Interactive Display Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Card 1: نوع العدد */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/80 rounded-2xl p-3 shadow-xs border-2 border-purple-200 flex flex-col items-center justify-center transform transition hover:scale-[1.02]">
          <span className="text-purple-700 text-[11px] font-bold flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-purple-600" />
            <span>نوع وتصنيف العدد</span>
          </span>
          <div className="text-xs md:text-sm font-black mt-1 text-purple-950 text-center line-clamp-1">
            {classification.text}
          </div>
        </div>

        {/* Card 2: القيمة المطلقة (|x|) */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/80 rounded-2xl p-3 shadow-xs border-2 border-emerald-200 flex flex-col items-center justify-center transform transition hover:scale-[1.02]">
          <span className="text-emerald-700 text-[11px] font-bold flex items-center gap-1">
            <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-600" />
            <span>القيمة المطلقة (|x|)</span>
          </span>
          <div className="text-lg md:text-xl font-black mt-1 text-emerald-800" dir="ltr">
            {formatFraction(absNumerator, activeDenominator)}
          </div>
        </div>

        {/* Card 3: المعكوس الجمعي (-x) */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/80 rounded-2xl p-3 shadow-xs border-2 border-amber-200 flex flex-col items-center justify-center transform transition hover:scale-[1.02]">
          <span className="text-amber-700 text-[11px] font-bold flex items-center gap-1">
            <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
            <span>المعكوس الجمعي (-x)</span>
          </span>
          <div className="text-lg md:text-xl font-black mt-1 text-amber-800" dir="ltr">
            {formatFraction(inverseNumerator, activeDenominator)}
          </div>
        </div>

        {/* Card 4: القيمة الحالية (x) */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/80 rounded-2xl p-3 shadow-xs border-2 border-blue-200 flex flex-col items-center justify-center transform transition hover:scale-[1.02]">
          <span className="text-blue-700 text-[11px] font-bold flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>الموقع الحالي (x)</span>
          </span>
          <div
            className={`text-lg md:text-xl font-black mt-1 ${
              currentNumerator > 0
                ? "text-emerald-700"
                : currentNumerator < 0
                ? "text-rose-700"
                : "text-purple-700"
            }`}
            dir="ltr"
          >
            {formatFraction(currentNumerator, activeDenominator)}
          </div>
        </div>
      </div>

      {/* Control Panel: Mode, Denominator, Extent, and Direct Inputs */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Mode Selector */}
          <div className="flex flex-col space-y-1">
            <label className="text-slate-700 font-bold text-xs flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              <span>نمط التمثيل البيداغوجي:</span>
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as any)}
              className="px-3 py-1.5 border border-purple-200 rounded-xl font-bold text-slate-800 bg-purple-50/70 focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs cursor-pointer"
            >
              <option value="integer">أعداد صحيحة / كلية (Integer)</option>
              <option value="decimal">كسور عشرية (أعشار من 10 Décimal)</option>
              <option value="fraction">كسور اعتيادية وأعداد كسرية (Fraction)</option>
            </select>
          </div>

          {/* Denominator Selector (visible only when mode === 'fraction') */}
          <div className="flex flex-col space-y-1">
            <label className="text-slate-700 font-bold text-xs flex items-center gap-1">
              <Pizza className="w-3.5 h-3.5 text-pink-600" />
              <span>تقسيم الوحدة (المقام):</span>
            </label>
            <select
              value={denominator}
              disabled={mode !== "fraction"}
              onChange={(e) => setDenominator(Number(e.target.value))}
              className={`px-3 py-1.5 border rounded-xl font-bold text-slate-800 text-xs transition cursor-pointer ${
                mode === "fraction"
                  ? "border-pink-200 bg-pink-50/70 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  : "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <option value="2">جزئين (أنصاف / 2)</option>
              <option value="3">3 أجزاء (أثلاث / 3)</option>
              <option value="4">4 أجزاء (أرباع / 4)</option>
              <option value="5">5 أجزاء (أخماس / 5)</option>
              <option value="6">6 أجزاء (أسداس / 6)</option>
              <option value="7">7 أجزاء (أسباع / 7)</option>
              <option value="8">8 أجزاء (أثمان / 8)</option>
              <option value="9">9 أجزاء (أتساع / 9)</option>
              <option value="10">10 أجزاء (أعشار / 10)</option>
              <option value="11">11 جزءاً (11)</option>
              <option value="12">12 جزءاً (أجزاء من 12)</option>
            </select>
          </div>

          {/* Extent Selector */}
          <div className="flex flex-col space-y-1">
            <label className="text-slate-700 font-bold text-xs flex items-center gap-1">
              <Ruler className="w-3.5 h-3.5 text-blue-600" />
              <span>مدى خط الأعداد (الحدود):</span>
            </label>
            <select
              value={extent}
              onChange={(e) => setExtent(Number(e.target.value))}
              className="px-3 py-1.5 border border-blue-200 rounded-xl font-bold text-slate-800 bg-blue-50/70 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs cursor-pointer"
            >
              <option value="3">من -3 إلى +3 (تركيز عالي)</option>
              <option value="5">من -5 إلى +5 (معياري)</option>
              <option value="10">من -10 إلى +10 (مدى واسع)</option>
            </select>
          </div>
        </div>

        {/* Custom Input & Fast Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-slate-700 font-bold text-xs">إدخال مباشر:</span>
            {mode === "fraction" ? (
              <div
                className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-xl border border-slate-300"
                dir="ltr"
              >
                <input
                  type="number"
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                    const n = parseInt(e.target.value, 10);
                    if (!isNaN(n)) updateValue(n);
                  }}
                  className="w-16 px-2 py-1 border border-slate-300 rounded-lg text-center font-bold text-xs bg-white text-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="البسط"
                />
                <span className="text-base font-bold text-slate-500">/</span>
                <span className="w-14 px-2 py-1 border border-slate-300 rounded-lg text-center font-bold text-xs bg-slate-200 text-slate-700">
                  {activeDenominator}
                </span>
              </div>
            ) : mode === "decimal" ? (
              <input
                type="number"
                step="0.1"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  const f = parseFloat(e.target.value);
                  if (!isNaN(f)) updateValue(Math.round(f * 10));
                }}
                className="w-24 px-3 py-1.5 border border-slate-300 rounded-xl text-center font-bold text-xs bg-white text-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="عدد عشري"
              />
            ) : (
              <input
                type="number"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  const n = parseInt(e.target.value, 10);
                  if (!isNaN(n)) updateValue(n);
                }}
                className="w-24 px-3 py-1.5 border border-slate-300 rounded-xl text-center font-bold text-xs bg-white text-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="عدد صحيح"
              />
            )}
          </div>

          {/* Quick Step Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => stepChange(-1)}
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1 shadow-xs text-xs cursor-pointer"
              title="انتقال خطوة إلى اليسار في الاتجاه السالب"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>يسار (-)</span>
            </button>

            <button
              type="button"
              onClick={() => stepChange(1)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1 shadow-xs text-xs cursor-pointer"
              title="انتقال خطوة إلى اليمين في الاتجاه الموجب"
            >
              <span>يمين (+)</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={resetToZero}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-3.5 py-1.5 rounded-xl transition flex items-center gap-1 shadow-xs text-xs cursor-pointer"
              title="إعادة ضبط المؤشر عند الصفر"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط (0)</span>
            </button>
          </div>
        </div>

        {/* Range Slider Track */}
        <div className="space-y-1 pt-1" dir="ltr">
          <div className="flex justify-between text-[11px] font-bold text-slate-500 px-1 select-none">
            <span className="text-rose-600">{minExtent} (يسار سالب)</span>
            <span className="text-purple-700 font-black">0 (محايد)</span>
            <span className="text-emerald-600">+{maxExtent} (يمين موجب)</span>
          </div>
          <input
            type="range"
            min={minSteps}
            max={maxSteps}
            value={currentNumerator}
            step={1}
            onChange={(e) => updateValue(parseInt(e.target.value, 10))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
        </div>
      </div>

      {/* Main Number Line Visual Container */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-200 overflow-hidden relative space-y-3">
        <div className="text-center space-y-0.5">
          <h3 className="text-slate-800 font-black text-xs md:text-sm">
            تمثيل خط الأعداد البصري (السالبة يساراً والموجبة يميناً)
          </h3>
          <p className="text-[11px] text-purple-700 font-bold">
            {mode === "decimal"
              ? "الواحد الصحيح مقسم إلى 10 أجزاء متساوية (أعشار)"
              : mode === "integer"
              ? "التمثيل القياسي للأعداد الصحيحة والكلية"
              : `الواحد الصحيح مقسم إلى ${activeDenominator} أجزاء متساوية`}
          </p>
        </div>

        {/* Scrollable Number Line Track Area */}
        <div className="relative py-12 px-4 overflow-x-auto select-none" dir="ltr">
          {/* Main Horizontal Line */}
          <div className="absolute top-1/2 left-4 right-4 h-2 bg-gradient-to-r from-rose-400 via-purple-300 to-emerald-400 rounded-full transform -translate-y-1/2 shadow-inner"></div>

          {/* Ticks Flex Container strictly in LTR */}
          <div className="relative flex justify-between items-center min-w-[760px]">
            {Array.from({ length: extent * 2 + 1 }).map((_, idx) => {
              const i = minExtent + idx;
              const iStep = i * activeDenominator;
              const isSelected = iStep === currentNumerator;
              const isInverse = iStep === inverseNumerator;
              const isZero = i === 0;

              return (
                <div key={i} className="flex items-center">
                  {/* Main Integer Tick */}
                  <div
                    onClick={() => updateValue(iStep)}
                    className="flex flex-col items-center relative group cursor-pointer"
                  >
                    {/* Upper Badge: Current Value (x) */}
                    {isSelected && (
                      <div className="absolute -top-11 bg-blue-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-lg shadow-md animate-bounce whitespace-nowrap z-20 flex items-center gap-1">
                        <span>x = {formatPlainValue(currentNumerator, activeDenominator)}</span>
                      </div>
                    )}

                    {/* Lower Badge: Additive Inverse (-x) */}
                    {isInverse && (
                      <div className="absolute -bottom-11 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-md whitespace-nowrap z-20 flex items-center gap-1">
                        <span>عكسه = {formatPlainValue(inverseNumerator, activeDenominator)}</span>
                      </div>
                    )}

                    {/* Tick Mark Line */}
                    <div
                      className={`rounded-full transition-all duration-200 ${
                        isZero
                          ? "w-1.5 h-8 bg-purple-700 shadow-xs"
                          : isSelected
                          ? "w-2 h-10 bg-blue-600 shadow-md ring-2 ring-blue-300"
                          : isInverse
                          ? "w-2 h-10 bg-amber-500 shadow-md"
                          : "w-1 h-6 bg-slate-400 hover:bg-slate-600"
                      }`}
                    />

                    {/* Tick Label */}
                    <span
                      className={`text-xs mt-1.5 font-bold transition-transform ${
                        isSelected
                          ? "text-blue-700 font-black scale-125"
                          : isInverse
                          ? "text-amber-700 font-black scale-110"
                          : isZero
                          ? "text-purple-900 font-black"
                          : "text-slate-600 group-hover:text-slate-900"
                      }`}
                    >
                      {i}
                    </span>
                  </div>

                  {/* Subdivisions between i and i + 1 */}
                  {activeDenominator > 1 && i < maxExtent && (
                    <div className="flex-1 flex justify-evenly items-center px-1">
                      {Array.from({ length: activeDenominator - 1 }).map((__, subIdx) => {
                        const t = subIdx + 1;
                        const subStep = i * activeDenominator + t;
                        const isSubSelected = subStep === currentNumerator;
                        const isSubInverse = subStep === inverseNumerator;

                        return (
                          <div
                            key={t}
                            onClick={() => updateValue(subStep)}
                            className="flex flex-col items-center relative cursor-pointer group/sub py-1"
                          >
                            {/* Sub Upper Badge */}
                            {isSubSelected && (
                              <div className="absolute -top-11 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-md animate-bounce whitespace-nowrap z-20">
                                <span>x = {formatPlainValue(subStep, activeDenominator)}</span>
                              </div>
                            )}

                            {/* Sub Lower Badge */}
                            {isSubInverse && (
                              <div className="absolute -bottom-11 bg-amber-600 text-white text-[9.5px] font-bold px-1.5 py-0.5 rounded shadow-md whitespace-nowrap z-20">
                                <span>عكسه = {formatPlainValue(inverseNumerator, activeDenominator)}</span>
                              </div>
                            )}

                            <div
                              className={`rounded-full transition-all duration-200 ${
                                isSubSelected
                                  ? "w-1.5 h-6 bg-blue-600 shadow-xs"
                                  : isSubInverse
                                  ? "w-1.5 h-6 bg-amber-500 shadow-xs"
                                  : "w-0.5 h-3 bg-slate-300 group-hover/sub:bg-purple-400 group-hover/sub:h-4"
                              }`}
                            />
                            <div className="h-4" />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend Key */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-[11px] font-bold text-slate-600 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-600 shadow-xs inline-block"></span>
            <span>الموقع الحالي للعدد (x)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-xs inline-block"></span>
            <span>المعكوس الجمعي للعدد (-x)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs inline-block"></span>
            <span>القيم الموجبة (+) في اليمين</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 shadow-xs inline-block"></span>
            <span>القيم السالبة (-) في اليسار</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-purple-700 shadow-xs inline-block"></span>
            <span>الصفر (0) النقطة المرجعية</span>
          </div>
        </div>
      </div>

      {/* Pedagogical Guidance Box */}
      <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-4 text-xs text-slate-700 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sky-950">
          <HelpCircle className="w-4 h-4 text-sky-700" />
          <span>إرشادات ديداكتيكية لتوظيف خط الأعداد بالقسم:</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-[11.5px] leading-relaxed">
          <div className="bg-white/80 p-2.5 rounded-xl border border-sky-100 space-y-1">
            <strong className="text-sky-900 block font-bold">1. بناء مفهوم الكسر:</strong>
            <p className="text-slate-600">
              ساعد التلميذ على إدراك أن الكسر هو نقطة ومسافة على المستقيم العددي بين صفر والأعداد الصحيحة وليس مجرد بسط ومقام.
            </p>
          </div>
          <div className="bg-white/80 p-2.5 rounded-xl border border-sky-100 space-y-1">
            <strong className="text-sky-900 block font-bold">2. المعكوس والقيمة المطلقة:</strong>
            <p className="text-slate-600">
              القيمة المطلقة تمثل المسافة الفاصلة عن الصفر وهي موجبة دوماً (|x| ≥ 0)، بينما المعكوس يبعد نفس المسافة في الاتجاه المعاكس.
            </p>
          </div>
          <div className="bg-white/80 p-2.5 rounded-xl border border-sky-100 space-y-1">
            <strong className="text-sky-900 block font-bold">3. المقارنة والترتيب:</strong>
            <p className="text-slate-600">
              كل عدد يقع على يمين عدد آخر على خط الأعداد هو أكبر منه دائماً قطعا (مثلا: -1 أكبر من -3 لأن -1 يقع على يمين -3).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
