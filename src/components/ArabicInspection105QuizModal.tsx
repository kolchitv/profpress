import React, { useState, useMemo } from "react";
import {
  ARABIC_INSPECTION_105_QUIZ,
  ArabicQuizQuestion,
} from "../data/arabicInspectionQuizData";
import {
  BookOpen,
  Info,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Filter,
  Check,
  AlertTriangle,
  Award,
  BookMarked,
  Layers,
  X,
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ArabicInspection105QuizModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(true);
  const [filterOnlyMistakes, setFilterOnlyMistakes] = useState<boolean>(false);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    let list = ARABIC_INSPECTION_105_QUIZ;
    if (selectedLevel !== "all") {
      list = list.filter((q) => q.level === selectedLevel);
    }
    if (filterOnlyMistakes) {
      list = list.filter((q) => {
        const userAns = answers[q.id];
        return userAns !== undefined && userAns !== q.correctIndex;
      });
    }
    return list;
  }, [selectedLevel, filterOnlyMistakes, answers]);

  // Keep index in valid bounds when filter changes
  const activeQuestion: ArabicQuizQuestion | undefined = filteredQuestions[currentIdx] || filteredQuestions[0];

  // Stats
  const stats = useMemo(() => {
    let answered = 0;
    let correct = 0;
    let incorrect = 0;

    ARABIC_INSPECTION_105_QUIZ.forEach((q) => {
      const userAns = answers[q.id];
      if (userAns !== undefined) {
        answered++;
        if (userAns === q.correctIndex) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });

    const scorePercentage = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    return { answered, correct, incorrect, total: ARABIC_INSPECTION_105_QUIZ.length, scorePercentage };
  }, [answers]);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleReset = () => {
    if (window.confirm("هل أنت متأكد من إعادة تعيين جميع إجاباتك والبدء من جديد؟")) {
      setAnswers({});
      setCurrentIdx(0);
      setFilterOnlyMistakes(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto font-cairo">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[95vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-right animate-in fade-in duration-200">
        
        {/* Modal Top Close Bar */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-300">
              الاختبار التفاعلي الشامل لمباراة التفتيش التربوي (105 سؤال)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://profpressma.blogspot.com/p/quiz-arabe-inspection-primaire.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold px-3 py-1 rounded-lg flex items-center gap-1 transition shadow-xs"
              title="فتح الرابط الأصلي على مدونة ProfPress"
            >
              <ExternalLink className="w-3 h-3" />
              <span className="hidden sm:inline">مدونة ProfPress</span>
            </a>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition cursor-pointer"
              title="إغلاق الاختبار"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 flex-1 bg-slate-50/50">

          {/* =================================================================== */}
          {/* EXACT SCREENSHOT BANNER & DIRECTIVES (مطابق للصورة تماماً)          */}
          {/* =================================================================== */}
          <div className="text-center space-y-3 pt-2">
            {/* 1. Green Circular Book Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E8F8F0] text-[#1E7B4E] flex items-center justify-center mx-auto shadow-xs border border-[#C5EED9]">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            {/* 2. Main Center Titles */}
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                المركز الوطني للتقويم والامتحانات
              </h2>
              <h3 className="text-base sm:text-xl font-black text-slate-800">
                مباراة التفتيش التربوي - بنك شامل (105 سؤال)
              </h3>
            </div>

            {/* 3. Directives Card (موجهات الاختبار) */}
            <div className="max-w-2xl mx-auto bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 text-right space-y-3.5 shadow-2xs">
              <div className="flex items-center gap-2 font-black text-slate-800 text-sm sm:text-base border-b border-slate-100 pb-2">
                <Info className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>موجهات الاختبار:</span>
              </div>

              {/* Bullet 1 */}
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  يضم الاختبار 105 أسئلة دقيقة في المستويات: <strong>الصوتي</strong>، <strong>الصرفي</strong>، <strong>التركيبي</strong>، <strong>البلاغي</strong> و<strong>فهم المقروء</strong>.
                </span>
              </div>

              {/* Bullet 2 */}
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>التغذية الراجعة المفصلة:</strong> إعراب الجمل كاملاً في مستوى التركيب، وشرح دقيق لباقي المستويات.
                </span>
              </div>

              {/* Yellow Warning Trap Alert Box */}
              <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3.5 sm:p-4 text-[#92400E] text-xs sm:text-sm font-bold flex items-center gap-2.5 mt-2">
                <span className="text-amber-600 font-black text-lg shrink-0">!</span>
                <span className="leading-snug">
                  <strong>فخ منهجي:</strong> خيار "جميع الأجوبة خاطئة" وارد جداً كجواب صحيح لاختبار دقة المتدرب.
                </span>
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* STATS & PROGRESS TRACKER                                            */}
          {/* =================================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <span className="font-black text-xs sm:text-sm text-slate-800">
                  تقدمك في بنك الأسئلة ({stats.answered} من أصل {stats.total})
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg">
                  صحيحة: {stats.correct}
                </span>
                <span className="bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-lg">
                  خاطئة: {stats.incorrect}
                </span>
                <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-lg">
                  النسبة: {stats.scorePercentage}%
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg flex items-center gap-1 transition cursor-pointer"
                  title="إعادة تعيين الاختبار"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">إعادة البدء</span>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${(stats.correct / stats.total) * 100}%` }}
              ></div>
              <div
                className="bg-rose-500 h-full transition-all duration-300"
                style={{ width: `${(stats.incorrect / stats.total) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* LEVEL FILTER TABS (الصوتي، الصرفي، التركيبي، البلاغي، فهم المقروء)  */}
          {/* =================================================================== */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: "all", label: "جميع الأسئلة (105)" },
              { id: "المستوى الصوتي", label: "المستوى الصوتي (20)" },
              { id: "المستوى الصرفي", label: "المستوى الصرفي (22)" },
              { id: "المستوى التركيبي", label: "المستوى التركيبي والإعراب (33)" },
              { id: "المستوى البلاغي", label: "المستوى البلاغي (15)" },
              { id: "فهم المقروء", label: "فهم المقروء والديداكتيك (15)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedLevel(tab.id);
                  setCurrentIdx(0);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer whitespace-nowrap ${
                  selectedLevel === tab.id
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* =================================================================== */}
          {/* QUESTION CARD & INTERACTION                                         */}
          {/* =================================================================== */}
          {activeQuestion ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 space-y-6 shadow-sm">
              {/* Question Header */}
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full">
                    السؤال {activeQuestion.id} من 105
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    {activeQuestion.level}
                  </span>
                </div>

                <span className="text-xs text-slate-400 font-bold">
                  {currentIdx + 1} / {filteredQuestions.length} في هذا القسم
                </span>
              </div>

              {/* Question Text */}
              <h4 className="text-base sm:text-lg font-black text-slate-900 leading-relaxed">
                {activeQuestion.question}
              </h4>

              {/* Options */}
              <div className="space-y-3">
                {activeQuestion.options.map((option, optIdx) => {
                  const userAnswer = answers[activeQuestion.id];
                  const isAnswered = userAnswer !== undefined;
                  const isThisSelected = userAnswer === optIdx;
                  const isThisCorrect = activeQuestion.correctIndex === optIdx;

                  let optionStyle =
                    "border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-slate-800 bg-white";

                  if (isAnswered) {
                    if (isThisCorrect) {
                      optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-black shadow-xs ring-1 ring-emerald-300";
                    } else if (isThisSelected && !isThisCorrect) {
                      optionStyle = "bg-rose-50 border-rose-400 text-rose-950 font-bold";
                    } else {
                      optionStyle = "border-slate-100 text-slate-400 opacity-60 bg-slate-50/50";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(activeQuestion.id, optIdx)}
                      className={`w-full text-right p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-xl font-bold flex items-center justify-center shrink-0 text-xs ${
                            isAnswered && isThisCorrect
                              ? "bg-emerald-600 text-white"
                              : isAnswered && isThisSelected && !isThisCorrect
                              ? "bg-rose-600 text-white"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed">{option}</span>
                      </div>

                      {isAnswered && (
                        <div>
                          {isThisCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {isThisSelected && !isThisCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Comprehensive Grammatical & Pedagogical Explanation Box (التغذية الراجعة والإعراب الكامل) */}
              {answers[activeQuestion.id] !== undefined && activeQuestion.explanation && (
                <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 sm:p-5 space-y-2 text-slate-800 animate-in fade-in duration-150">
                  <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-amber-900">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>التغذية الراجعة والتعليل المعرفي / الإعراب الكامل:</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">
                    {activeQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Navigation Toolbar */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                  className="bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>السابق</span>
                </button>

                <div className="text-xs font-black text-slate-500">
                  {currentIdx + 1} من أصل {filteredQuestions.length}
                </div>

                <button
                  type="button"
                  disabled={currentIdx >= filteredQuestions.length - 1}
                  onClick={() => setCurrentIdx((prev) => Math.min(filteredQuestions.length - 1, prev + 1))}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 text-white font-black px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                >
                  <span>التالي</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
              <BookMarked className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-slate-600 font-bold text-sm">
                لا توجد أسئلة تطابق الفلتر المختار حالياً.
              </p>
            </div>
          )}

          {/* =================================================================== */}
          {/* FAST JUMP QUESTION GRID (1 to 105)                                  */}
          {/* =================================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>الانتقال السريع لأسئلة الاختبار (1 - 105):</span>
              </span>
              <span className="text-[11px] text-slate-400 font-bold">
                أخضر: إجابة صحيحة | أحمر: إجابة خاطئة | رمادي: لم يُجب بعد
              </span>
            </div>

            <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-15 gap-1.5 max-h-48 overflow-y-auto p-1">
              {filteredQuestions.map((q, idx) => {
                const userAns = answers[q.id];
                const isCurrent = idx === currentIdx;
                let tileColor = "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200";

                if (userAns !== undefined) {
                  if (userAns === q.correctIndex) {
                    tileColor = "bg-emerald-500 text-white border-emerald-600";
                  } else {
                    tileColor = "bg-rose-500 text-white border-rose-600";
                  }
                }

                if (isCurrent) {
                  tileColor += " ring-2 ring-blue-600 ring-offset-1 font-black";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-8 rounded-lg text-xs font-bold border transition flex items-center justify-center cursor-pointer ${tileColor}`}
                    title={`سؤال رقم ${q.id}: ${q.level}`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
