import { redirect } from "next/navigation";

// Provisorio. Redireciona para /home/page.tsx
export default function RootRedirect() {
  redirect("/home");
}
