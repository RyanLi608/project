"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Calendar 
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/lib/language-context";
import { GitHubSignInButton } from "@/components/auth/github-signin-button";

const languages = [
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
];

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const selectedLanguage = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-black/20 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-playfair text-xl font-bold tracking-wider bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              LandmarkAI
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/about"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            {t("aboutUs")}
          </Link>
          <Link
            href="/popular"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            {t("popularDestinations")}
          </Link>
          <Link
            href="/itinerary"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center"
          >
            <Calendar className="h-4 w-4 mr-1" />
            {t("tripPlanner")}
          </Link>
          <Link
            href="/guides"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            {t("travelGuides")}
          </Link>
        </nav>

        {/* Desktop Right Menu */}
        <div className="hidden md:flex items-center space-x-2">
          {/* Language Selector */}
          <div className="relative">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 px-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            >
              <Globe className="h-4 w-4 mr-1" />
              {selectedLanguage.name}
            </Button>
            {showLanguageMenu && (
              <div className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg py-1 min-w-[120px] z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as "en" | "zh");
                      setShowLanguageMenu(false);
                    }}
                    className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                      language === lang.code ? "font-bold" : ""
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* GitHub OAuth Login */}
          <GitHubSignInButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 p-0 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10">
          <div className="container py-4 space-y-3">
            <Link
              href="/about"
              className="block text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("aboutUs")}
            </Link>
            <Link
              href="/popular"
              className="block text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("popularDestinations")}
            </Link>
            <Link
              href="/itinerary"
              className="block text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("tripPlanner")}
            </Link>
            <Link
              href="/guides"
              className="block text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("travelGuides")}
            </Link>
            
            <div className="pt-3 border-t border-white/10">
              <GitHubSignInButton className="w-full" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header; 