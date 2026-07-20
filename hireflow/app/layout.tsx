import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import SupportChat from "@/components/popup/SupportChat";

export const metadata: Metadata = {
  title: "HireFlow",
  description: "Build your profile, discover roles, and manage every application in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <SupportChat />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
