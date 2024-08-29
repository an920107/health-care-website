import { BACKEND_HOST } from "@/module/config/config";
import { redirect } from "@/navigation";

export default function LoginPage() {
  const url = new URL("https://portal.ncu.edu.tw/oauth2/authorization");
  url.searchParams.append("response_type", "code");
  url.searchParams.append("state", "0");
  url.searchParams.append("client_id", "20240524005413cH6En5RFZc35");
  url.searchParams.append("redirect_uri", `${BACKEND_HOST}/api/auth/return-to`);
  url.searchParams.append("scope", "identifier chinese-name");

  return redirect(url.href);
}
