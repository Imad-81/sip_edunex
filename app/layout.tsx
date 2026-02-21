import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduNex — AI Career Intelligence for Indian Students",
  description:
    "Structured, ranked, actionable career blueprints for Indian students in grades 9–12 and college. Powered by multi-factor AI scoring.",
  keywords: "career guidance, India, students, AI, career mapping, JEE, UPSC",
  openGraph: {
    title: "EduNex — AI Career Intelligence",
    description: "Structured, ranked, actionable career blueprints for Indian students.",
    url: "https://edunex.in",
    siteName: "EduNex",
    images: [
      {
        url: "https://edunex.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EduNex AI Career Intelligence",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduNex — AI Career Intelligence",
    description: "Multi-factor AI scoring for Indian students.",
    images: ["https://edunex.in/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable} suppressHydrationWarning>
        <body>
          <Providers>
            {children}
            <ThemeToggle />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}