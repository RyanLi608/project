"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/language-context";
import { useLanguage } from "@/lib/language-context";

function ErrorContent({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-background text-foreground">
      <h2 className="text-4xl md:text-6xl font-bold mb-4">{t("somethingWentWrong")}</h2>
      <div className="h-1 w-20 bg-primary my-6 mx-auto"></div>
      <p className="text-muted-foreground mb-8 max-w-md">
        {t("errorOccurred")}
      </p>
      <Button 
        onClick={reset}
        size="lg" 
        className="rounded-full"
      >
        {t("tryAgain")}
      </Button>
    </div>
  );
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <ErrorContent error={error} reset={reset} />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 