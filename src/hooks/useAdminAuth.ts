"use client";

import { useEffect, useState } from "react";
import type { AuthUser } from "@/types/auth";
import { AdminAPI } from "@/lib/api/admin";

export interface StoredAuth {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export function useAdminAuth() {
  const [auth, setAuth] = useState<StoredAuth | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem("mhdev-admin-auth");

    const restore = async () => {
      if (!raw) {
        setIsReady(true);
        return;
      }

      try {
        const parsed = JSON.parse(raw) as StoredAuth;

        if (parsed && parsed.user && parsed.accessToken) {
          setAuth(parsed);
          setIsReady(true);
          return;
        }

        if (parsed && parsed.accessToken) {
          try {
            const profile = await AdminAPI.getProfile(parsed.accessToken);
            const fixed: StoredAuth = {
              user: profile,
              accessToken: parsed.accessToken,
              refreshToken: parsed.refreshToken,
            };
            setAuth(fixed);
            window.localStorage.setItem(
              "mhdev-admin-auth",
              JSON.stringify(fixed),
            );
          } catch {
            window.localStorage.removeItem("mhdev-admin-auth");
          }
        } else {
          window.localStorage.removeItem("mhdev-admin-auth");
        }
      } catch {
        window.localStorage.removeItem("mhdev-admin-auth");
      } finally {
        setIsReady(true);
      }
    };

    void restore();
  }, []);

  const login = (payload: StoredAuth) => {
    setAuth(payload);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("mhdev-admin-auth", JSON.stringify(payload));
    }
  };

  const logout = () => {
    setAuth(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("mhdev-admin-auth");
    }
  };

  return { auth, isReady, login, logout };
}

