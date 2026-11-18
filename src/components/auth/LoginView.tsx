"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sun,
  Moon,
  Settings,
  Globe,
  Check,
} from "lucide-react";
import { DEMO_USERS } from "@/data";
import { type StoreUser } from "@/types/store";
import { type Locale } from "@/locales";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

interface LoginViewProps {
  onLogin: (user: StoreUser) => void;
}

const DEMO_CREDENTIALS = [
  { user: DEMO_USERS[0], pass: "cust123" },
  { user: DEMO_USERS[1], pass: "admin123" },
];

const LOCALES: { code: Locale; label: string }[] = [
  { code: "lo", label: "ລາວ" },
  { code: "th", label: "ไทย" },
  { code: "en", label: "EN" },
];

export function LoginView({ onLogin }: LoginViewProps) {
  const { locale, setLocale, dictionary } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const [email, setEmail] = useState(DEMO_USERS[0].email);
  const [password, setPassword] = useState("cust123");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password.trim()) {
      setErrorMsg(dictionary.auth.credentialsRequired);
      return;
    }

    const matched =
      DEMO_CREDENTIALS.find(
        (c) => c.user.email.toLowerCase() === email.trim().toLowerCase()
      )?.user ?? DEMO_USERS[0];

    onLogin(matched);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-secondary/40">
      <div className="w-full max-w-lg bg-card rounded-3xl border border-border shadow-2xl p-6 sm:p-8 space-y-6 relative">
        {/* Top Controls: Brand & Single Dropdown Trigger */}
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-border/80">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-10 relative flex items-center justify-center shrink-0">
              <Image
                src="/jgd-latets-logo-no-bg.png"
                alt="JustGoDev Logo"
                width={80}
                height={80}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-sm tracking-tight text-foreground block truncate">
                {dictionary.brand.name}
              </span>
              <span className="text-[11px] text-primary font-semibold block truncate">
                {dictionary.brand.subtitle}
              </span>
            </div>
          </div>

          <div className="relative shrink-0" ref={menuRef}>
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Language & Theme Settings"
              className="h-9 w-9 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground flex items-center justify-center transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-card border border-border shadow-xl p-3 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* Language Switcher */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground px-1">
                    <Globe className="w-3.5 h-3.5" />
                    <span>{dictionary.settings.languageTitle}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-secondary/60 border border-border">
                    {LOCALES.map((loc) => (
                      <button
                        key={loc.code}
                        type="button"
                        onClick={() => setLocale(loc.code)}
                        className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          locale === loc.code
                            ? "bg-primary text-primary-foreground shadow-2xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {loc.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme Switcher */}
                <div className="space-y-1.5 pt-2 border-t border-border/70">
                  <div className="text-[11px] font-bold text-muted-foreground px-1">
                    {dictionary.settings.themeTitle}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        if (theme !== "light") toggleTheme();
                      }}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        theme === "light"
                          ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                          : "bg-secondary/50 text-foreground border-border hover:bg-secondary"
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5" />
                      <span>Light</span>
                      {theme === "light" && <Check className="w-3 h-3" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (theme !== "dark") toggleTheme();
                      }}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        theme === "dark"
                          ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                          : "bg-secondary/50 text-foreground border-border hover:bg-secondary"
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5" />
                      <span>Dark</span>
                      {theme === "dark" && <Check className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <h1 className="text-xl sm:text-2xl font-extrabold text-foreground">
            {dictionary.auth.title}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {dictionary.auth.subtitle}
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">
              {dictionary.auth.emailLabel}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-secondary/40 focus:bg-card text-xs sm:text-sm focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">
              {dictionary.auth.passwordLabel}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-secondary/40 focus:bg-card text-xs sm:text-sm focus:border-primary focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <span>{dictionary.auth.signInBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

