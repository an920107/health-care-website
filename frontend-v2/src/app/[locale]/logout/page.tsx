"use client";

import { BACKEND_HOST } from "@/module/config/config";
import { useRouter } from "@/navigation";

export default function LogoutPage() {
  const router = useRouter();

  const url = new URL("/api/auth/sign-out", BACKEND_HOST);
  router.replace(url.href);

  return (<></>);
}
