export type Role = "admin" | "user";

export type AuthState = {
  email: string;
  role: Role;
};

const AUTH_KEY = "revoshop_auth";

export function getAuth(): AuthState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as AuthState) : null;
  } catch {
    return null;
  }
}

export function setAuth(state: AuthState) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(state));
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}
