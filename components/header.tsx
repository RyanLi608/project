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
  Calendar,
  ChevronDown
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/lib/language-context";
import { MultiSignInButton } from "@/components/auth/multi-signin-button";

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
          ? "bg-white shadow-md border-b border-gray-200"
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">
              LandmarkAI
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/about"
            className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
          >
            {t("aboutUs")}
          </Link>
          <Link
            href="/popular"
            className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
          >
            {t("popularDestinations")}
          </Link>
          <Link
            href="/itinerary"
            className="text-gray-700 hover:text-teal-600 font-medium transition-colors flex items-center"
          >
            <Calendar className="h-4 w-4 mr-1" />
            {t("tripPlanner")}
          </Link>
          <Link
            href="/guides"
            className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
          >
            {t("travelGuides")}
          </Link>
        </nav>

        {/* Desktop Right Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Currency/Language Selector */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-10 px-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              >
                <Globe className="h-4 w-4 mr-2" />
                {selectedLanguage.code.toUpperCase()}
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
              {showLanguageMenu && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[120px] z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as "en" | "zh");
                        setShowLanguageMenu(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        language === lang.code ? "text-teal-600 font-medium" : "text-gray-700"
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-10 px-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50"
            >
              USD
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </div>

          {/* Login Button */}
          <MultiSignInButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 text-gray-700 hover:text-teal-600 hover:bg-teal-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto py-4 px-4 space-y-4">
            <Link
              href="/about"
              className="block py-2 text-gray-700 hover:text-teal-600 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("aboutUs")}
            </Link>
            <Link
              href="/popular"
              className="block py-2 text-gray-700 hover:text-teal-600 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("popularDestinations")}
            </Link>
            <Link
              href="/itinerary"
              className="block py-2 text-gray-700 hover:text-teal-600 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("tripPlanner")}
            </Link>
            <Link
              href="/guides"
              className="block py-2 text-gray-700 hover:text-teal-600 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("travelGuides")}
            </Link>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">语言:</span>
                <div className="flex space-x-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as "en" | "zh");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        language === lang.code 
                          ? "bg-teal-100 text-teal-600 font-medium" 
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
              <MultiSignInButton className="w-full" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header; 