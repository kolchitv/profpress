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
  UserCheck,
  ArrowRight,
} from "lucide-react";
import { AdminSession } from "../types";
import {
  verifyAdminLogin,
  authenticateWithGoogle,
  DEFAULT_ADMIN_EMAIL,
} from "../utils/adminAuth";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: AdminSession) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  if (!isOpen) return null;

  // Active view: only two options: login with password OR sign in with Google
  const [activeTab, setActiveTab] = useState<"login" | "google">("login");

  // Login Form (Email & Password)
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Google Login Form
  const [googleEmail, setGoogleEmail] = useState("");
  const [googleName, setGoogleName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIdentifier("");
      setPassword("");
      setGoogleEmail("");
      setGoogleName("");
      setErrorMsg(null);
      setSuccessMsg(null);
      setActiveTab("login");
    }
  }, [isOpen]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!identifier.trim()) {
      setErrorMsg("يرجى إدخال البريد الإلكتروني أو اسم المستخدم المصرح به.");
      return;
    }
    if (!password) {
      setErrorMsg("يرجى إدخال كلمة المرور.");
      return;
    }

    const result = verifyAdminLogin(identifier, password);
    if (result.success && result.session) {
      setSuccessMsg(
        result.session.canDeleteTopics
          ? "مرحباً بك يا مدير المنصة! تم تفعيل كامل صلاحيات الإدارة والتحرير."
          : "تم تسجيل الدخول بنجاح."
      );
      setTimeout(() => {
        onLoginSuccess(result.session!);
        onClose();
      }, 700);
    } else {
      setErrorMsg(result.error || "تعذر تسجيل الدخول. تأكد من صحة البريد وكلمة المرور.");
    }
  };

  const handleGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const clean = googleEmail.trim().toLowerCase();
    if (!clean || !clean.includes("@")) {
      setErrorMsg("يرجى إدخال بريد جوجل إلكتروني صحيح.");
      return;
    }

    const res = authenticateWithGoogle(clean, googleName);
    setSuccessMsg(res.message);
    setTimeout(() => {
      onLoginSuccess(res.session);
      onClose();
    }, 800);
  };

  const handleQuickManagerGoogleLogin = () => {
    setErrorMsg(null);
    setSuccessMsg("جارٍ تسجيل الدخول بحساب المدير kolchitv@gmail.com...");
    const res = authenticateWithGoogle(DEFAULT_ADMIN_EMAIL, "مدير المنصة");
    setSuccessMsg(res.message);
    setTimeout(() => {
      onLoginSuccess(res.session);
      onClose();
    }, 700);
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto"
      dir="rtl"
    >
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-emerald-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-xs text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base font-cairo text-white flex items-center gap-2">
                <span>بوابة الدخول إلى إدارة الموقع</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                  محمي
                </span>
              </h3>
              <p className="text-xs text-teal-200">
                تسجيل الدخول بكلمة المرور أو بحساب Google
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs: Only 2 choices - Login vs Google */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => {
              setActiveTab("login");
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "login"
                ? "bg-white text-teal-900 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-teal-700" />
            <span>تسجيل الدخول</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("google");
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "google"
                ? "bg-white text-teal-900 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            {/* Google G Logo */}
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
            <span>سجل الدخول بحساب جوجل</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="p-5 sm:p-6">
          {/* Notifications */}
          {errorMsg && (
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

          {/* TAB 1: STANDARD LOGIN (Email & Password) */}
          {activeTab === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Quick Google sign-in button */}
              <button
                type="button"
                onClick={() => setActiveTab("google")}
                className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-300 shadow-2xs transition flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
                <span>سجل الدخول بحساب جوجل بدلاً من ذلك</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[11px] text-slate-400 font-bold">أو البريد وكلمة المرور</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-teal-700" />
                  <span>البريد الإلكتروني المعتمد:</span>
                </label>
                <input
                  type="email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني المعتمد..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-mono font-bold outline-hidden focus:ring-2 focus:ring-teal-600 text-left"
                  dir="ltr"
                  autoFocus
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-teal-700" />
                  <span>كلمة المرور:</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 pl-10 text-xs font-mono outline-hidden focus:ring-2 focus:ring-teal-600 text-left"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>تسجيل الدخول</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: GOOGLE SIGN IN (سجل الدخول بحساب جوجل) */}
          {activeTab === "google" && (
            <div className="space-y-4">
              {/* 1-Click Fast Manager Login */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-3.5 space-y-2.5">
                <div className="flex items-center gap-2 text-blue-950 font-bold text-xs">
                  <UserCheck className="w-4 h-4 text-blue-700" />
                  <span>تسجيل دخول فوري بحساب جوجل المعتمد:</span>
                </div>
                <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
                  إذا كنت مدير المنصة (<span className="font-bold text-blue-950" dir="ltr">kolchitv@gmail.com</span>)، يمكنك الدخول مباشرة بنقرة واحدة:
                </p>
                <button
                  type="button"
                  onClick={handleQuickManagerGoogleLogin}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2v-2zm0-10h2v8h-2V6z" />
                  </svg>
                  <span>الدخول بحساب {DEFAULT_ADMIN_EMAIL}</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[11px] text-slate-400 font-bold">أو أدخل بريد Google آخر</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Form for any other Google email */}
              <form onSubmit={handleGoogleSubmit} className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>بريد جوجل (Google Email):</span>
                  </label>
                  <input
                    type="email"
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-mono font-bold outline-hidden focus:ring-2 focus:ring-blue-600 text-left"
                    dir="ltr"
                    autoFocus
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">
                    الاسم الكامل / الصفة (اختياري):
                  </label>
                  <input
                    type="text"
                    value={googleName}
                    onChange={(e) => setGoogleName(e.target.value)}
                    placeholder="مثال: ذ. كريم أو المشرف التربوي"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs outline-hidden focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-black text-white font-bold text-xs py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>سجل الدخول بهذا الحساب</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              <button
                type="button"
                onClick={() => setActiveTab("login")}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800 pt-1 font-bold cursor-pointer"
              >
                العودة إلى تسجيل الدخول بكلمة المرور
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
