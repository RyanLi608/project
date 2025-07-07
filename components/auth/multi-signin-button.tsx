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
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { language, translations } = useLanguage()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSignIn = async (provider: string) => {
    setIsLoading(true)
    try {
      await signIn(provider, { callbackUrl: "/" })
    } catch (error) {
      console.error("Sign in error:", error)
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut({ callbackUrl: "/" })
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  if (status === "loading") {
    return (
      <Button variant={variant} size={size} disabled className={className}>
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </Button>
    )
  }

  if (session?.user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <Button
          variant={variant}
          size={size}
          onClick={() => setIsOpen(!isOpen)}
          className={`${className} flex items-center gap-2`}
          disabled={isLoading}
        >
          {session.user.image ? (
            <img 
              src={session.user.image} 
              alt={session.user.name || "User"} 
              className="h-4 w-4 rounded-full"
            />
          ) : (
            <User className="h-4 w-4" />
          )}
          <span className="hidden sm:inline truncate max-w-24">
            {session.user.name || session.user.email}
          </span>
          <ChevronDown className="h-3 w-3" />
        </Button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="font-medium text-sm text-gray-900 dark:text-white">
                {session.user.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {session.user.email}
              </div>
            </div>
            <div className="py-1">
              <button
                onClick={handleSignOut}
                disabled={isLoading}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                {translations.signOut}
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(!isOpen)}
        className={`${className} flex items-center gap-2`}
        disabled={isLoading}
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">{translations.signIn}</span>
        <ChevronDown className="h-3 w-3" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="py-1">
            <button
              onClick={() => handleSignIn("github")}
              disabled={isLoading}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              {translations.signInWithGithub}
            </button>
            <button
              onClick={() => handleSignIn("google")}
              disabled={isLoading}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              {translations.signInWithGoogle}
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 