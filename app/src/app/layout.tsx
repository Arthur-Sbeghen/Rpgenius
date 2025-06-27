import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AppProvider } from "@/context/AppProvider";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Rpgenius",
  description: "Next.js App with Laravel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <AppProvider>{children}</AppProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
