import type { Metadata } from "next";
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import GlobalLoader from "./components/GlobalLoader";

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "云舒亭小站",
  description: "于无常之中，寻觅须臾之美。光影、尘埃、裂纹、静默。一个情绪寄托的港湾，这里记录着那些不完美却充满诗意的瞬间，以及对生活本质的朴素思考。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${notoSansSC.variable} ${notoSerifSC.variable} bg-theme-bg text-theme-text antialiased`}
      >
        <ThemeProvider>
          <GlobalLoader>
        {children}
          </GlobalLoader>
        </ThemeProvider>
      </body>
    </html>
  );
}
