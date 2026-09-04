import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE_NAME = "shaydha_admin_token";
const DEFAULT_PASSCODE = "shaydha2026";

export function getAdminPasscode(): string {
  return process.env.ADMIN_PASSCODE || DEFAULT_PASSCODE;
}

export function verifyAdminToken(token?: string): boolean {
  if (!token) return false;
  // Valid token contains the passcode hash signature
  return token === `auth_${getAdminPasscode()}`;
}

export function isAuthenticated(req?: NextRequest): boolean {
  try {
    if (req) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);
        if (verifyAdminToken(token)) return true;
      }
      const passcodeHeader = req.headers.get("x-admin-passcode");
      if (passcodeHeader && passcodeHeader === getAdminPasscode()) {
        return true;
      }
    }
    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return verifyAdminToken(token);
  } catch {
    return false;
  }
}

export function getAuthTokenValue(): string {
  return `auth_${getAdminPasscode()}`;
}

export { ADMIN_COOKIE_NAME };
