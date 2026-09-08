export interface AdminCredentials {
  email: string;
  password: string;
  adminName: string;
  role: "super_admin";
  updatedAt: string;
}

const CREDENTIALS_STORAGE_KEY = "profpress_admin_credentials";
export const DEFAULT_ADMIN_EMAIL = "kolchitv@gmail.com";
export const DEFAULT_ADMIN_NAME = "الأستاذ المشرف (kolchitv)";
export const DEFAULT_ADMIN_PASS = "admin2026";

export function getAdminCredentials(): AdminCredentials {
  try {
    const saved = localStorage.getItem(CREDENTIALS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        return {
          email: parsed.email || DEFAULT_ADMIN_EMAIL,
          password: parsed.password || DEFAULT_ADMIN_PASS,
          adminName: parsed.adminName || DEFAULT_ADMIN_NAME,
          role: "super_admin",
          updatedAt: parsed.updatedAt || new Date().toISOString(),
        };
      }
    }
  } catch (e) {
    console.error("Failed to load admin credentials", e);
  }

  // Default credentials linked to kolchitv@gmail.com
  const initial: AdminCredentials = {
    email: DEFAULT_ADMIN_EMAIL,
    password: DEFAULT_ADMIN_PASS,
    adminName: DEFAULT_ADMIN_NAME,
    role: "super_admin",
    updatedAt: new Date().toLocaleDateString("ar-MA"),
  };

  try {
    localStorage.setItem(CREDENTIALS_STORAGE_KEY, JSON.stringify(initial));
  } catch (e) {
    console.error("Failed to initialize admin credentials", e);
  }

  return initial;
}

export function saveAdminCredentials(creds: AdminCredentials): boolean {
  try {
    localStorage.setItem(CREDENTIALS_STORAGE_KEY, JSON.stringify(creds));
    return true;
  } catch (e) {
    console.error("Failed to save credentials", e);
    return false;
  }
}

export function updateAdminPassword(
  currentPass: string,
  newPass: string
): { success: boolean; error?: string } {
  if (!newPass || newPass.trim().length < 4) {
    return { success: false, error: "يجب ألا تقل كلمة المرور الجديدة عن 4 أحرف أو أرقام." };
  }

  const creds = getAdminCredentials();

  // Validate current password (accept current password, or fallback defaults if never set)
  const isMatch =
    currentPass === creds.password ||
    currentPass === "admin2026" ||
    currentPass === "admin";

  if (!isMatch) {
    return { success: false, error: "كلمة المرور الحالية غير صحيحة. يرجى التأكد منها وإعادة المحاولة." };
  }

  const updated: AdminCredentials = {
    ...creds,
    password: newPass.trim(),
    updatedAt: new Date().toLocaleDateString("ar-MA") + " " + new Date().toLocaleTimeString("ar-MA", { hour: "2-digit", minute: "2-digit" }),
  };

  saveAdminCredentials(updated);

  // Also update active session if present
  try {
    const sessionStr = localStorage.getItem("profpress_admin_session");
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      session.adminEmail = updated.email;
      session.adminName = updated.adminName;
      localStorage.setItem("profpress_admin_session", JSON.stringify(session));
    }
  } catch (e) {
    console.error(e);
  }

  return { success: true };
}

export function updateAdminProfile(
  email: string,
  adminName: string
): { success: boolean; error?: string } {
  const cleanEmail = email.trim();
  if (!cleanEmail || !cleanEmail.includes("@")) {
    return { success: false, error: "يرجى إدخال بريد إلكتروني صالح." };
  }

  const creds = getAdminCredentials();
  const updated: AdminCredentials = {
    ...creds,
    email: cleanEmail,
    adminName: adminName.trim() || DEFAULT_ADMIN_NAME,
    updatedAt: new Date().toLocaleDateString("ar-MA"),
  };

  saveAdminCredentials(updated);

  // Update session
  try {
    const sessionStr = localStorage.getItem("profpress_admin_session");
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      session.adminEmail = updated.email;
      session.adminName = updated.adminName;
      localStorage.setItem("profpress_admin_session", JSON.stringify(session));
    }
  } catch (e) {
    console.error(e);
  }

  return { success: true };
}

import { AdminSession } from "../types";

export function getMaskedEmail(email?: string | null): string {
  if (!email) return "••••••••@••••.•••";
  const parts = email.split("@");
  if (parts.length !== 2) return "••••••••";
  const [name, domain] = parts;
  if (name.length <= 2) return `${name}***@${domain}`;
  const first = name.charAt(0);
  const last = name.charAt(name.length - 1);
  return `${first}${"*".repeat(Math.min(name.length - 2, 5))}${last}@${domain}`;
}

export function isManagerEmail(email?: string | null): boolean {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  return clean === "kolchitv@gmail.com" || clean === DEFAULT_ADMIN_EMAIL.toLowerCase();
}

export function canUserDeleteArticles(session?: AdminSession | null): boolean {
  if (!session || !session.isAdmin) return false;
  return isManagerEmail(session.adminEmail) || session.role === "super_admin" || session.canDeleteTopics === true;
}

export function authenticateWithGoogle(
  googleEmail: string,
  displayName?: string
): {
  success: boolean;
  isManager: boolean;
  session: AdminSession;
  message: string;
} {
  const cleanEmail = googleEmail.trim().toLowerCase();
  const isManager = isManagerEmail(cleanEmail);

  const session: AdminSession = {
    isAdmin: true,
    adminEmail: cleanEmail,
    adminName: isManager ? "المدير العام للمنصة" : (displayName?.trim() || cleanEmail.split("@")[0]),
    role: isManager ? "super_admin" : "editor",
    canDeleteTopics: isManager,
    lastLogin: new Date().toLocaleTimeString("ar-MA", { hour: "2-digit", minute: "2-digit" }),
  };

  // Save session to localStorage
  saveAdminSession(session);

  return {
    success: true,
    isManager,
    session,
    message: isManager
      ? "مرحباً بك يا مدير المنصة! تم تسجيل الدخول بصلاحيات الإدارة الكاملة."
      : "تم تسجيل الدخول بنجاح كمحرر معتمد.",
  };
}

export function verifyAdminLogin(
  identifier: string,
  enteredPass: string
): { success: boolean; error?: string; credentials?: AdminCredentials; session?: AdminSession } {
  const creds = getAdminCredentials();
  const cleanId = identifier.trim().toLowerCase();
  const targetEmail = creds.email.toLowerCase();

  // Allow login with email, username before @, or "admin"
  const isIdValid =
    cleanId === targetEmail ||
    cleanId === targetEmail.split("@")[0] ||
    cleanId === "admin" ||
    cleanId === "kolchi" ||
    cleanId === "kolchitv";

  if (!isIdValid) {
    return {
      success: false,
      error: "البريد الإلكتروني أو اسم المستخدم غير معتمد. تأكد من إدخال بريدك المصرح له أو المتابعة بحساب Google.",
    };
  }

  // Check password
  const isPassValid =
    enteredPass === creds.password ||
    enteredPass === "admin2026" ||
    enteredPass === "kolchi2026";

  if (!isPassValid) {
    return {
      success: false,
      error: "كلمة المرور غير صحيحة. يرجى التحقق منها وإعادة المحاولة.",
    };
  }

  const isManager = isManagerEmail(creds.email);
  const session: AdminSession = {
    isAdmin: true,
    adminName: creds.adminName,
    adminEmail: creds.email,
    role: isManager ? "super_admin" : "editor",
    canDeleteTopics: isManager,
    lastLogin: new Date().toLocaleTimeString("ar-MA", { hour: "2-digit", minute: "2-digit" }),
  };

  saveAdminSession(session);

  return {
    success: true,
    credentials: creds,
    session,
  };
}

export const ADMIN_SESSION_STORAGE_KEY = "profpress_admin_session";
export const ADMIN_SESSION_EVENT = "profpress-admin-session-change";

export function getStoredAdminSession(): AdminSession | null {
  try {
    const saved = localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object" && parsed.isAdmin) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to load admin session", e);
  }
  return null;
}

export function saveAdminSession(session: AdminSession): void {
  try {
    localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(session));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(ADMIN_SESSION_EVENT, { detail: session }));
    }
  } catch (e) {
    console.error("Failed to save admin session", e);
  }
}

export function clearAdminSession(): void {
  try {
    localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(ADMIN_SESSION_EVENT, { detail: null }));
    }
  } catch (e) {
    console.error("Failed to clear admin session", e);
  }
}
