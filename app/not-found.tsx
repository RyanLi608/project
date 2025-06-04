"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export default function NotFound() {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h2 className="text-4xl md:text-6xl font-bold mb-4">404</h2>
      <div className="h-1 w-20 bg-primary my-6 mx-auto"></div>
      <p className="text-xl md:text-2xl mb-2">
        {t("pageNotFound")}
      </p>
      <p className="text-muted-foreground mb-8 max-w-md">
        {t("pageNotFoundDesc")}
      </p>
      <Link href="/">
        <Button size="lg" className="rounded-full">
          {t("backToHome")}
        </Button>
      </Link>
    </div>
  );
} 