"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

export function authCheck({ requireAuth = false }: { requireAuth: boolean }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (requireAuth && !token) {
      router.replace("/auth");
      return;
    }

    if (!requireAuth && token) {
      router.replace("/table");
      return;
    }

    setAllowed(true);
    setChecked(true);
  }, [requireAuth, router]);

  return { checked, allowed };
}
