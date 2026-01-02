import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WANTED.git - Open Source Bug Bounty",
  description: "AI-Powered Issue Discovery & Crowdfunded Micro-Bounties",
};

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
