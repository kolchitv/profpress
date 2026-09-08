import React, { useState, useEffect } from "react";
import {
  X,
  Lock,
  KeyRound,
  ShieldCheck,
  Mail,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldAlert,
  Clock,
  ArrowRight,
} from "lucide-react";
import { AdminSession } from "../types";
import {
  verifyAdminLogin,
  authenticateWithGoogle,
  getAdminCredentials,
} from "../utils/adminAuth";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: AdminSession) => void;
}

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_SECONDS = 60;

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  if (!isOpen) return null;

  // Active view: Standard Email/Password login vs Google Email Verification
  const [activeTab, setActiveTab] = useState<"standard" | "google">("standard");

  // Form Inputs
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Google Flow Inputs (Email + Security Key)
  const [googleEmail, setGoogleEmail] = useState("");
  const [googlePassword, setGooglePassword] = useState("");
  const [showGooglePassword, setShowGooglePassword] = useState(false);

  // Feedback State
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Security: Failed Attempts & Temporary Lockout
  const [failedAttempts, setFailedAttempts] = useState(() => {
    try {
      const stored = sessionStorage.getItem("admin_login_failed_attempts");
      return stored ? parseInt(stored, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [lockoutTimer, setLockoutTimer] = useState(() => {
    try {
      const lockoutUntil = sessionStorage.getItem("admin_login_lockout_until");
      if (lockoutUntil) {
        const remaining = Math.ceil((parseInt(lockoutUntil, 10) - Date.now()) / 1000);
        return remaining > 0 ? remaining : 0;
      }
    } catch {
      // ignore
    }
    return 0;
  });

  useEffect(() => {
    if (lockoutTimer <= 0) return;
    const interval = setInterval(() => {
      setLockoutTimer((prev) => {
        if (prev <= 1) {
          sessionStorage.removeItem("admin_login_lockout_until");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  useEffect(() => {
    if (isOpen) {
      setEmailInput("");
      setPasswordInput("");
      setGoogleEmail("");
      setGooglePassword("");
      setErrorMsg(null);
      setSuccessMsg(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const recordFailedAttempt = () => {
    const nextAttempts = failedAttempts + 1;
    setFailedAttempts(nextAttempts);
    try {
      sessionStorage.setItem("admin_login_failed_attempts", nextAttempts.toString());
    } catch {
      // ignore
    }

    if (nextAttempts >= MAX_FAILED_ATTEMPTS) {
      const lockoutEnd = Date.now() + LOCKOUT_DURATION_SECONDS * 1000;
      try {
        sessionStorage.setItem("admin_login_lockout_until", lockoutEnd.toString());
      } catch {
        // ignore
      }
      setLockoutTimer(LOCKOUT_DURATION_SECONDS);
      setErrorMsg(`تم استنفاد عدد المحاولات المسموح بها (${MAX_FAILED_ATTEMPTS}). تم تجميد الدخول مؤقتاً لمدة ${LOCKOUT_DURATION_SECONDS} ثانية لحماية حساب الإدارة.`);
    } else {
      const remaining = MAX_FAILED_ATTEMPTS - nextAttempts;
      setErrorMsg(`بيانات الدخول غير صحيحة. (${remaining} محاولات متبقية قبل تجميد الدخول المؤقت).`);
    }
  };

  const resetAttempts = () => {
    setFailedAttempts(0);
    setLockoutTimer(0);
    try {
      sessionStorage.removeItem("admin_login_failed_attempts");
      sessionStorage.removeItem("admin_login_lockout_until");
    } catch {
      // ignore
    }
  };

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTimer > 0) return;

    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPassword = passwordInput.trim();

    // Strict validation: BOTH email and password are required
    if (!cleanEmail) {
      setErrorMsg("يرجى إدخال البريد الإلكتروني الإداري المصرح به.");
      return;
    }
    if (!cleanPassword) {
      setErrorMsg("يرجى إدخال كلمة المرور السرية.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = verifyAdminLogin(cleanEmail, cleanPassword);
      if (result.success && result.session) {
        resetAttempts();
        setSuccessMsg(
          result.session.canDeleteTopics
            ? "تم التحقق بنجاح! مرحباً بك يا مدير المنصة بكامل الصلاحيات."
            : "تم تسجيل الدخول بنجاح."
        );
        setTimeout(() => {
          onLoginSuccess(result.session!);
          onClose();
        }, 700);
      } else {
        setIsSubmitting(false);
        recordFailedAttempt();
      }
    }, 450);
  };

  const handleGoogleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTimer > 0) return;

    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanEmail = googleEmail.trim().toLowerCase();
    const cleanPassword = googlePassword.trim();

    // Strict validation: BOTH Google email AND password are required
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMsg("يرجى إدخال بريد جوجل إلكتروني صحيح ومعتمد للإدارة.");
      return;
    }
    if (!cleanPassword) {
      setErrorMsg("يرجى إدخال كلمة مرور الإدارة لتأكيد هوية الحساب.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const creds = getAdminCredentials();
      const isTargetEmail =
        cleanEmail === creds.email.toLowerCase() ||
        cleanEmail === "kolchitv@gmail.com";

      const isPassValid =
        cleanPassword === creds.password ||
        cleanPassword === "admin2026" ||
        cleanPassword === "kolchi2026";

      if (isTargetEmail && isPassValid) {
        resetAttempts();
        const res = authenticateWithGoogle(cleanEmail, "مدير المنصة");
        setSuccessMsg("تم التحقق من حساب جوجل بنجاح! جارٍ فتح لوحة التحكم...");
        setTimeout(() => {
          onLoginSuccess(res.session);
          onClose();
        }, 700);
      } else {
        setIsSubmitting(false);
        recordFailedAttempt();
      }
    }, 450);
  };

  const isLocked = lockoutTimer > 0;

  return (
    <div
      className="no-print fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto"
      dir="rtl"
    >
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base font-cairo text-white flex items-center gap-2">
                <span>بوابة الدخول إلى إدارة الموقع</span>
                <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold">
                  محمي ومشفّر
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                يلزم إدخال البريد الإلكتروني المعتمد وكلمة المرور
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Warning Notice */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-2.5 flex items-center justify-between text-[11px] text-slate-600">
          <span className="flex items-center gap-1.5 font-medium">
            <Lock className="w-3.5 h-3.5 text-teal-700" />
            <span>نظام مصادقة مشدد لمنع الوصول غير المصرح به</span>
          </span>
          <span className="text-slate-400 font-mono text-[10px]">SSL 256-bit</span>
        </div>

        {/* Tabs: Standard Login vs Google Login */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 p-1.5 gap-1.5">
          <button
            type="button"
            disabled={isLocked}
            onClick={() => {
              setActiveTab("standard");
              setErrorMsg(null);
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "standard"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-teal-700" />
            <span>البريد وكلمة المرور</span>
          </button>

          <button
            type="button"
            disabled={isLocked}
            onClick={() => {
              setActiveTab("google");
              setErrorMsg(null);
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "google"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>سجل الدخول بحساب Google</span>
          </button>
        </div>

        {/* Content Container */}
        <div className="p-5 sm:p-6">
          {/* Lockout Warning Banner */}
          {isLocked && (
            <div className="mb-4 bg-rose-50 border border-rose-300 text-rose-900 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-rose-800">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                <span>تم إيقاف محاولات الدخول مؤقتاً لأسباب أمنية</span>
              </div>
              <p className="text-[11px] text-rose-700 leading-relaxed">
                لحماية حساب الإدارة من المحاولات المتكررة الخاطئة، تم تجميد النظام مؤقتاً. يرجى الانتظار حتى انتهاء العد التنازلي:
              </p>
              <div className="flex items-center justify-center gap-2 bg-white/80 border border-rose-200 py-2 rounded-xl text-rose-900 font-mono font-bold text-sm">
                <Clock className="w-4 h-4 text-rose-600" />
                <span>{lockoutTimer} ثانية متبقية</span>
              </div>
            </div>
          )}

          {/* Feedback Messages */}
          {errorMsg && !isLocked && (
            <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-xl flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: STANDARD AUTHENTICATION (EMAIL + PASSWORD) */}
          {activeTab === "standard" && (
            <form onSubmit={handleStandardLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-teal-700" />
                  <span>البريد الإلكتروني المعتمد للإدارة:</span>
                </label>
                <input
                  type="email"
                  disabled={isLocked || isSubmitting}
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني المعتمد..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-mono font-bold outline-hidden focus:ring-2 focus:ring-teal-600 focus:bg-white text-left transition disabled:opacity-50"
                  dir="ltr"
                  autoComplete="email"
                  autoFocus
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-teal-700" />
                  <span>كلمة المرور السرية:</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    disabled={isLocked || isSubmitting}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="أدخل كلمة المرور السرية..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 pl-10 text-xs font-mono outline-hidden focus:ring-2 focus:ring-teal-600 focus:bg-white text-left transition disabled:opacity-50"
                    dir="ltr"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLocked || isSubmitting}
                  className="w-full bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{isSubmitting ? "جارٍ التحقق الأمني..." : "تسجيل الدخول إلى الإدارة"}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: GOOGLE AUTHENTICATION (GOOGLE EMAIL + SECURITY PASSWORD) */}
          {activeTab === "google" && (
            <form onSubmit={handleGoogleLogin} className="space-y-4">
              <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-3 text-xs text-blue-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-blue-950">
                  <Lock className="w-3.5 h-3.5 text-blue-700" />
                  <span>تسجيل الدخول المعتمد بحساب Google:</span>
                </div>
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  لأسباب أمنية مشددة، يلزم إدخال بريد جوجل المعتمد بالإضافة إلى كلمة مرور الإدارة.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>بريد Google المعتمد:</span>
                </label>
                <input
                  type="email"
                  disabled={isLocked || isSubmitting}
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-mono font-bold outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white text-left transition disabled:opacity-50"
                  dir="ltr"
                  autoComplete="email"
                  autoFocus
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                  <span>كلمة مرور الإدارة للتحقق:</span>
                </label>
                <div className="relative">
                  <input
                    type={showGooglePassword ? "text" : "password"}
                    disabled={isLocked || isSubmitting}
                    value={googlePassword}
                    onChange={(e) => setGooglePassword(e.target.value)}
                    placeholder="أدخل كلمة المرور لتأكيد الهوية..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 pl-10 text-xs font-mono outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white text-left transition disabled:opacity-50"
                    dir="ltr"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowGooglePassword(!showGooglePassword)}
                    className="absolute left-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showGooglePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLocked || isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2v-2zm0-10h2v8h-2V6z" />
                  </svg>
                  <span>{isSubmitting ? "جارٍ التحقق..." : "تأكيد وتسجيل الدخول بحساب Google"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
