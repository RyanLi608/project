"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Github, LogOut, User } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface GitHubSignInButtonProps {
  variant?: "default" | "outline"
  size?: "sm" | "default" | "lg"
  className?: string
}

export function GitHubSignInButton({ 
  variant = "outline", 
  size = "sm",
  className = ""
}: GitHubSignInButtonProps) {
  const { data: session, status } = useSession()
  const { t } = useLanguage()

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
    <Button
      variant={variant}
      size={size}
      onClick={() => signIn("github")}
      className={`${className} bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20`}
    >
      <Github className="h-4 w-4 mr-2" />
      {t("login")} GitHub
    </Button>
  )
} 