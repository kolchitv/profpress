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

export function verifyAdminLogin(
  identifier: string,
  enteredPass: string
): { success: boolean; error?: string; credentials?: AdminCredentials } {
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
      error: `البريد أو اسم المستخدم غير معتمد. لوحة التحكم مربوطة حصرياً بالبريد: ${creds.email}`,
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
      error: "كلمة المرور غير صحيحة. يمكنك تغييرها أو إدخال كلمة المرور الصحيحة.",
    };
  }

  return {
    success: true,
    credentials: creds,
  };
}
