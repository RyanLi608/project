"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Globe,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Volume2,
  MapPin,
  Calendar,
  User,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/lib/language-context";

const languages = [
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 用户登录状态
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  // 找到当前选择的语言对象
  const selectedLanguage = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 模拟登录/登出功能
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-background/90 backdrop-blur-md py-2 shadow-sm"
          : "bg-transparent py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight transition-colors"
        >
          Landmark<span className="text-primary">AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("aboutUs")}
          </Link>
          <Link
            href="/popular"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("popularDestinations")}
          </Link>
          <Link
            href="/itinerary"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center"
          >
            <Calendar className="h-4 w-4 mr-1" />
            {t("tripPlanner")}
          </Link>
          <Link
            href="/guides"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("travelGuides")}
          </Link>
        </nav>

        {/* Desktop Right Menu */}
        <div className="hidden md:flex items-center space-x-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 px-2">
                <Globe className="h-4 w-4 mr-1" />
                {selectedLanguage.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as "en" | "zh")}
                  className={cn(
                    "cursor-pointer",
                    language === lang.code && "font-bold"
                  )}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-2"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* User Account / Login */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 rounded-full">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/account" className="flex w-full items-center">
                    <User className="mr-2 h-4 w-4" />
                    {t("myAccount")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleLogin} className="h-9">
                <LogIn className="mr-1 h-4 w-4" />
                {t("login")}
              </Button>
              <Button size="sm" variant="default" className="h-9 bg-primary">
                <UserPlus className="mr-1 h-4 w-4" />
                {t("register")}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Language Selector (Mobile) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as "en" | "zh")}
                  className={cn(
                    "cursor-pointer",
                    language === lang.code && "font-bold"
                  )}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile Menu Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 p-0"
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
        <div className="md:hidden bg-background/95 backdrop-blur-md py-4 px-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("aboutUs")}
            </Link>
            <Link
              href="/popular"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("popularDestinations")}
            </Link>
            <Link
              href="/itinerary"
              className="text-sm font-medium transition-colors hover:text-primary flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Calendar className="h-4 w-4 mr-1" />
              {t("tripPlanner")}
            </Link>
            <Link
              href="/guides"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("travelGuides")}
            </Link>

            <div className="flex items-center space-x-2 pt-2">
              {/* Theme Toggle (Mobile) */}
              <Button
                variant="outline"
                size="sm"
                className="flex gap-2 h-9"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? (
                  <>
                    <Moon className="h-4 w-4" />
                    {t("darkMode")}
                  </>
                ) : (
                  <>
                    <Sun className="h-4 w-4" />
                    {t("lightMode")}
                  </>
                )}
              </Button>
            </div>

            {/* Mobile Login/Register Options */}
            <div className="border-t pt-4 mt-2">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/account"
                    className="flex items-center text-sm font-medium transition-colors hover:text-primary mb-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {t("myAccount")}
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full flex items-center justify-center h-9"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("logout")}
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center justify-center h-9"
                    onClick={() => {
                      handleLogin();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    {t("login")}
                  </Button>
                  <Button
                    size="sm"
                    className="w-full flex items-center justify-center h-9"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {t("register")}
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}