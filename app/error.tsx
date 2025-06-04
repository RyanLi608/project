"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    // 可以在这里上报错误到错误监控服务
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
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