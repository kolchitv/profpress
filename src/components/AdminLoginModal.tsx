import React, { useState, useEffect } from "react";
import {
  X,
  Lock,
  KeyRound,
  ShieldCheck,
  Mail,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { AdminSession } from "../types";
import {
  getAdminCredentials,
  verifyAdminLogin,
  updateAdminPassword,
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

  // Active view: login vs change password
  const [activeTab, setActiveTab] = useState<"login" | "change_password">("login");

  // Credentials
  const [currentCreds, setCurrentCreds] = useState(getAdminCredentials);

  // Login Form
  const [identifier, setIdentifier] = useState(currentCreds.email);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Change Password Form
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showChangePass, setShowChangePass] = useState(false);

  useEffect(() => {
    const creds = getAdminCredentials();
    setCurrentCreds(creds);
    setIdentifier(creds.email);
  }, [isOpen]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const result = verifyAdminLogin(identifier, password);
    if (result.success && result.credentials) {
      const session: AdminSession = {
        isAdmin: true,
        adminName: result.credentials.adminName,
        adminEmail: result.credentials.email,
        role: "super_admin",
        lastLogin: new Date().toLocaleTimeString("ar-MA", { hour: "2-digit", minute: "2-digit" }),
      };
      onLoginSuccess(session);
      onClose();
    } else {
      setErrorMsg(result.error || "تعذر تسجيل الدخول. تأكد من صحة البريد وكلمة المرور.");
    }
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (newPassword !== confirmPassword) {
      setErrorMsg("كلمة المرور الجديدة وتأكيدها غير متطابقين.");
      return;
    }

    const result = updateAdminPassword(oldPassword, newPassword);
    if (result.success) {
      setSuccessMsg("تم تغيير كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول بها.");
      const updated = getAdminCredentials();
      setCurrentCreds(updated);
      setPassword(newPassword);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setActiveTab("login");
      }, 1200);
    } else {
      setErrorMsg(result.error || "فشل تغيير كلمة المرور.");
    }
  };

  const handleQuickLoginAsLinkedEmail = () => {
    const creds = getAdminCredentials();
    const session: AdminSession = {
      isAdmin: true,
      adminName: creds.adminName,
      adminEmail: creds.email,
      role: "super_admin",
      lastLogin: new Date().toLocaleTimeString("ar-MA", { hour: "2-digit", minute: "2-digit" }),
    };
    onLoginSuccess(session);
    onClose();
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
                <span>لوحة تحكم مدير الموقع</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                  محمي
                </span>
              </h3>
              <p className="text-xs text-teal-200">
                التحرير والنشر ومراقبة السيو وإدارة المنظومة
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

        {/* Linked Email Badge */}
        <div className="bg-teal-50/80 border-b border-teal-100 p-3.5 px-5 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-teal-900">
            <Mail className="w-4 h-4 text-teal-700 shrink-0" />
            <span>البريد الإداري المربوط:</span>
            <span className="font-mono font-bold text-teal-800 bg-white border border-teal-200 px-2 py-0.5 rounded-lg">
              {currentCreds.email}
            </span>
          </div>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>موثق</span>
          </span>
        </div>

        {/* Tabs: Login vs Change Password */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 p-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab("login");
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "login"
                ? "bg-white text-teal-900 shadow-2xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>تسجيل الدخول</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("change_password");
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "change_password"
                ? "bg-white text-teal-900 shadow-2xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-600" />
            <span>تغيير كلمة المرور</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="p-5">
          {/* Notifications */}
          {errorMsg && (
            <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: LOGIN */}
          {activeTab === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-teal-700" />
                  <span>البريد الإلكتروني للإدارة:</span>
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin@profpress.net أو بريد المدير"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-mono font-bold outline-hidden focus:ring-2 focus:ring-teal-600 text-left"
                  dir="ltr"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-teal-700" />
                    <span>كلمة المرور:</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveTab("change_password")}
                    className="text-[11px] text-teal-700 hover:text-teal-900 font-bold hover:underline cursor-pointer"
                  >
                    تغيير كلمة المرور؟
                  </button>
                </div>
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

              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>دخول لوحة التحكم</span>
                </button>

                <button
                  type="button"
                  onClick={handleQuickLoginAsLinkedEmail}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>دخول فوري مباشر كمسؤول</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: CHANGE PASSWORD */}
          {activeTab === "change_password" && (
            <form onSubmit={handleChangePasswordSubmit} className="space-y-3.5">
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  يمكنك هنا تعيين كلمة مرور جديدة لحساب المسؤول متى أردت.
                </span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  كلمة المرور الحالية (أو الافتراضية admin2026):
                </label>
                <input
                  type={showChangePass ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="كلمة المرور الحالية"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs font-mono outline-hidden focus:ring-2 focus:ring-teal-600 text-left"
                  dir="ltr"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  كلمة المرور الجديدة:
                </label>
                <input
                  type={showChangePass ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="اكتب كلمة المرور الجديدة التي تختارها..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs font-mono outline-hidden focus:ring-2 focus:ring-teal-600 text-left"
                  dir="ltr"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  تأكيد كلمة المرور الجديدة:
                </label>
                <div className="relative">
                  <input
                    type={showChangePass ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="أعد كتابة كلمة المرور الجديدة..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 pl-9 text-xs font-mono outline-hidden focus:ring-2 focus:ring-teal-600 text-left"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowChangePass(!showChangePass)}
                    className="absolute left-2.5 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showChangePass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>تحديث وحفظ كلمة المرور</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 px-3 rounded-xl transition cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
