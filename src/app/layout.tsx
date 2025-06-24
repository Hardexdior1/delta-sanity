import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { AuthProvider } from "./context/AuthContext";
import ClientLayout from "./clientLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Verse One Hotel & Suites || Hotel in Bayelsa",
   icons: {
    icon: '/verse-one-favicon.ico',
  },
  description:
    "Book your stay at Verse One Hotel & Suites – offering comfort, elegance, and convenience. Browse rooms, check availability, and reserve your perfect getaway today.",
    other: {
    'google-site-verification': 'tF0Tx3i4j-4v6gFmL7YT02j6dMeVkA-_XxEfHSVAS0E',
  },
};

// <meta name="google-site-verification" content="tF0Tx3i4j-4v6gFmL7YT02j6dMeVkA-_XxEfHSVAS0E" />
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <AuthProvider>


       <ClientLayout>

       <main>
        
        {children}
        </main>
       </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
