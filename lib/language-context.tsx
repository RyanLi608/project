"use client"

import React, { createContext, useContext } from 'react'

interface LanguageContextType {
  language: string
  translations: {
    signIn: string
    signOut: string
    signInWithGithub: string
    signInWithGoogle: string
    [key: string]: string
  }
}

const defaultTranslations = {
  signIn: "登录",
  signOut: "退出",
  signInWithGithub: "使用 GitHub 登录",
  signInWithGoogle: "使用 Google 登录"
}

const LanguageContext = createContext<LanguageContextType>({
  language: "zh",
  translations: defaultTranslations
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageContext.Provider value={{
      language: "zh",
      translations: defaultTranslations
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
} 