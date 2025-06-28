"use client"

import { useState, useEffect, useRef } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Github, LogOut, User, ChevronDown, Mail } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface MultiSignInButtonProps {
  variant?: "default" | "outline"
  size?: "sm" | "default" | "lg"
  className?: string
}

export function MultiSignInButton({ 
  variant = "outline", 
  size = "sm",
  className = ""
}: MultiSignInButtonProps) {
  const { data: session, status } = useSession()
  const { t } = useLanguage()
  const [showLoginMenu, setShowLoginMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // 点击外部关闭菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowLoginMenu(false)
      }
    }

    if (showLoginMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showLoginMenu])

  if (status === "loading") {
    return (
      <Button 
        variant={variant} 
        size={size} 
        className={className}
        disabled
      >
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </Button>
    )
  }

  if (session?.user) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2 text-white/80">
          <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
            {session.user.image ? (
              <img 
                src={session.user.image} 
                alt={session.user.name || "User"} 
                className="h-6 w-6 rounded-full"
              />
            ) : (
              <User className="h-4 w-4" />
            )}
          </div>
          <span className="text-sm font-medium hidden md:block">
            {session.user.name || session.user.email}
          </span>
        </div>
        <Button
          variant="outline"
          size={size}
          onClick={() => signOut()}
          className="h-9 px-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
        >
          <LogOut className="h-4 w-4" />
          <span className="ml-1 hidden md:inline">{t("logout")}</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant={variant}
        size={size}
        onClick={() => setShowLoginMenu(!showLoginMenu)}
        className={`${className} bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 flex items-center`}
      >
        <User className="h-4 w-4 mr-2" />
        {t("login")}
        <ChevronDown className="h-3 w-3 ml-1" />
      </Button>
      
      {showLoginMenu && (
        <div className="absolute top-full right-0 mt-1 bg-white/95 backdrop-blur-sm rounded-md shadow-lg py-1 min-w-[180px] z-50 border border-white/20">
          <button
            onClick={() => {
              signIn("github")
              setShowLoginMenu(false)
            }}
            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Github className="h-4 w-4 mr-2" />
            {t("login")} GitHub
          </button>
          <button
            onClick={() => {
              signIn("google")
              setShowLoginMenu(false)
            }}
            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Mail className="h-4 w-4 mr-2" />
            {t("login")} Google
          </button>
        </div>
      )}
    </div>
  )
} 