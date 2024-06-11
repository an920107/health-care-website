import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import NavigationBar from "./navigation-bar";
import { Theme } from "@radix-ui/themes";
import { Noto_Sans_TC } from 'next/font/google';
import Footer from "./footer";

const fontSans = Noto_Sans_TC({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "衛生保健組",
  description: "中央大學衛生保健組 NCU Health Center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-tw">
      <body className={fontSans.className}>
        <Theme>
          <div style={{minHeight: "calc(100vh)"}}>
            <NavigationBar />
            <div className="container">
              {children}
            </div>
          </div>
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
