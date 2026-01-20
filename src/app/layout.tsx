import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/global.css";
import AuthBroadcastListener from "@/components/AuthBroadcastListener";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "DadaChat | 웹 CS 관리 서비스",
  description: "웹사이트 고객 문의(CS)를 대시보드에서는 관리하는 서비스",
  openGraph: {
    title: "DadaChat | 웹 CS 관리 서비스",
    description: "웹사이트 고객 문의를 한 곳에서 관리하세요",
    url: baseUrl,
    siteName: "DadaChat",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthBroadcastListener />
        {children}
      </body>
    </html>
  );
}
