"use client";

import { usePathname, useRouter } from "next/navigation";
import { memo } from "react";

export const LoginRedirect = memo(() => {
  const pathname = usePathname();
  const router = useRouter();
  const to = `/auth?redirect=${pathname}`;

  router.push(to);
  return null;
});

LoginRedirect.displayName = "LoginRedirect";
