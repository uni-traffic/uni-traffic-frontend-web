import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { MaintenanceWrapper } from "@/components/common/Maintenance";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { ReactQueryProvider } from "@/context/QueryProvider";
import type { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto"
});

export const metadata: Metadata = {
  title: "UniTraffic",
  description: "New Era University Campus Vehicle Management"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
      >
        <MaintenanceWrapper>
          <ReactQueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </ReactQueryProvider>
        </MaintenanceWrapper>
        <Toaster richColors theme="light" />
      </body>
    </html>
  );
}
