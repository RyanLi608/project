import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { LanguageProvider } from "@/lib/language-context";
import { Providers } from "@/components/providers/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LandmarkAI - AI旅行伴侣",
  description:
    "通过AI驱动的洞察和个性化推荐，体验世界最具标志性的地标",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <Providers>
          <LanguageProvider>
            <main className="flex-1">{children}</main>
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
} 