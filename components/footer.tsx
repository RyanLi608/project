"use client";

import Link from "next/link";
import { Globe, Mail, Github } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60">
      <div className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">LandmarkAI</h3>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} LandmarkAI
              <br />
              {t("aboutUs")}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">{t("travelGuides")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides/asia" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("asia")}
                </Link>
              </li>
              <li>
                <Link href="/guides/europe" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("europe")}
                </Link>
              </li>
              <li>
                <Link href="/guides/americas" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("americas")}
                </Link>
              </li>
              <li>
                <Link href="/guides/africa" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("africa")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">{t("information")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("contactUs")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">{t("resources")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("community")}
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  API
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}