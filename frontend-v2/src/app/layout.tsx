import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Noto_Sans_TC } from 'next/font/google';

const fontSans = Noto_Sans_TC({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "中央大學衛生保健組",
  description: "健康檢查、緊急醫療、健康服務、健康職場、教育訓練、餐飲衛生、下載專區",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={fontSans.className}>
        <Theme>
          {children}
        </Theme>
      </body>
    </html>
  );
}
