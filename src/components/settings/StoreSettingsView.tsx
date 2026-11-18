"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Globe,
  Sun,
  Moon,
  Coins,
  RotateCcw,
  CheckCircle2,
  Store,
  LogOut,
  ChevronDown,
  Check,
  Users,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import { INITIAL_STORE_CONFIG, DEMO_USERS } from "@/data";
import { type Locale } from "@/locales";
import { type CurrencyCode } from "@/types/store";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useStore } from "@/context/StoreContext";

const LANGUAGES: { code: Locale; title: string; native: string }[] = [
  { code: "lo", title: "Lao (Default)", native: "ພາສາລາວ" },
  { code: "th", title: "Thai", native: "ภาษาไทย" },
  { code: "en", title: "English", native: "English" },
];

const CURRENCIES: { code: CurrencyCode; symbol: string; name: string }[] = [
  { code: "LAK", symbol: "₭", name: "Lao Kip (LAK)" },
  { code: "THB", symbol: "฿", name: "Thai Baht (THB)" },
  { code: "USD", symbol: "$", name: "US Dollar (USD)" },
];

export function StoreSettingsView() {
  const router = useRouter();
  const { locale, setLocale, dictionary } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { currency, setCurrency, user, login, logout, resetSandbox } = useStore();

  const [openSection, setOpenSection] = useState<string | null>(null);
  const [resetDone, setResetDone] = useState(false);

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const handleReset = () => {
    resetSandbox();
    setResetDone(true);
    setTimeout(() => setResetDone(false), 2500);
  };

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const currentLanguage = LANGUAGES.find((l) => l.code === locale);
  const currentCurrency = CURRENCIES.find((c) => c.code === currency);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3 sm:space-y-4">
      {/* 1. Currency Section (Monochrome Black & White) */}
      <div
        className={`bg-card rounded-2xl sm:rounded-3xl border transition-all shadow-xs overflow-hidden ${
          openSection === "currency"
            ? "border-foreground/50 shadow-sm"
            : "border-border hover:border-foreground/30"
        }`}
      >
        <button
          type="button"
          onClick={() => toggleSection("currency")}
          className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-secondary text-foreground border border-border flex items-center justify-center shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-sm sm:text-base text-foreground tracking-tight truncate">
                {dictionary.settings.currencyTitle}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {dictionary.settings.currencyDesc}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 ml-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground border border-border">
              {currentCurrency?.symbol} {currentCurrency?.code}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                openSection === "currency" ? "rotate-180 text-foreground" : ""
              }`}
            />
          </div>
        </button>

        {openSection === "currency" && (
          <div className="p-4 sm:p-5 pt-1 sm:pt-1 border-t border-border/60 bg-secondary/20 animate-in fade-in slide-in-from-top-1 duration-200 space-y-2">
            {CURRENCIES.map((cur) => {
              const active = currency === cur.code;
              return (
                <button
                  key={cur.code}
                  type="button"
                  onClick={() => setCurrency(cur.code)}
                  className={`w-full p-3 sm:p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                    active
                      ? "border-foreground/80 bg-secondary/50 text-foreground ring-1 ring-foreground/15 shadow-xs"
                      : "border-border bg-card text-foreground hover:border-foreground/30 hover:bg-secondary/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-semibold ${
                        active
                          ? "bg-foreground text-background"
                          : "bg-secondary text-muted-foreground border border-border"
                      }`}
                    >
                      {cur.symbol}
                    </span>
                    <span
                      className={`text-xs sm:text-sm ${
                        active
                          ? "font-semibold text-foreground"
                          : "font-normal text-foreground/90"
                      }`}
                    >
                      {cur.name}
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      active
                        ? "bg-foreground text-background shadow-xs"
                        : "border border-border bg-secondary/30"
                    }`}
                  >
                    {active && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Language Section (Monochrome Black & White) */}
      <div
        className={`bg-card rounded-2xl sm:rounded-3xl border transition-all shadow-xs overflow-hidden ${
          openSection === "language"
            ? "border-foreground/50 shadow-sm"
            : "border-border hover:border-foreground/30"
        }`}
      >
        <button
          type="button"
          onClick={() => toggleSection("language")}
          className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-secondary text-foreground border border-border flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-sm sm:text-base text-foreground tracking-tight truncate">
                {dictionary.settings.languageTitle}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {dictionary.settings.languageDesc}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 ml-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground border border-border">
              {currentLanguage?.native}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                openSection === "language" ? "rotate-180 text-foreground" : ""
              }`}
            />
          </div>
        </button>

        {openSection === "language" && (
          <div className="p-4 sm:p-5 pt-1 sm:pt-1 border-t border-border/60 bg-secondary/20 animate-in fade-in slide-in-from-top-1 duration-200 space-y-2">
            {LANGUAGES.map((lang) => {
              const active = locale === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLocale(lang.code)}
                  className={`w-full p-3 sm:p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                    active
                      ? "border-foreground/80 bg-secondary/50 text-foreground ring-1 ring-foreground/15 shadow-xs"
                      : "border-border bg-card text-foreground hover:border-foreground/30 hover:bg-secondary/20"
                  }`}
                >
                  <div>
                    <div
                      className={`text-xs sm:text-sm ${
                        active
                          ? "font-semibold text-foreground"
                          : "font-normal text-foreground/90"
                      }`}
                    >
                      {lang.native}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {lang.title}
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      active
                        ? "bg-foreground text-background shadow-xs"
                        : "border border-border bg-secondary/30"
                    }`}
                  >
                    {active && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Appearance (Theme) Section (Monochrome Black & White) */}
      <div
        className={`bg-card rounded-2xl sm:rounded-3xl border transition-all shadow-xs overflow-hidden ${
          openSection === "theme"
            ? "border-foreground/50 shadow-sm"
            : "border-border hover:border-foreground/30"
        }`}
      >
        <button
          type="button"
          onClick={() => toggleSection("theme")}
          className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-secondary text-foreground border border-border flex items-center justify-center shrink-0">
              {theme === "dark" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-sm sm:text-base text-foreground tracking-tight truncate">
                {dictionary.settings.themeTitle}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {dictionary.settings.themeDesc}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 ml-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground border border-border">
              {theme === "dark"
                ? dictionary.settings.darkMode
                : dictionary.settings.lightMode}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                openSection === "theme" ? "rotate-180 text-foreground" : ""
              }`}
            />
          </div>
        </button>

        {openSection === "theme" && (
          <div className="p-4 sm:p-5 pt-1 sm:pt-1 border-t border-border/60 bg-secondary/20 animate-in fade-in slide-in-from-top-1 duration-200 space-y-2">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`w-full p-3 sm:p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                theme === "light"
                  ? "border-foreground/80 bg-secondary/50 text-foreground ring-1 ring-foreground/15 shadow-xs"
                  : "border-border bg-card text-foreground hover:border-foreground/30 hover:bg-secondary/20"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Sun className="w-4 h-4 text-foreground" />
                <span
                  className={`text-xs sm:text-sm ${
                    theme === "light"
                      ? "font-semibold text-foreground"
                      : "font-normal text-foreground/90"
                  }`}
                >
                  {dictionary.settings.lightMode}
                </span>
              </span>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  theme === "light"
                    ? "bg-foreground text-background shadow-xs"
                    : "border border-border bg-secondary/30"
                }`}
              >
                {theme === "light" && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`w-full p-3 sm:p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                theme === "dark"
                  ? "border-foreground/80 bg-secondary/50 text-foreground ring-1 ring-foreground/15 shadow-xs"
                  : "border-border bg-card text-foreground hover:border-foreground/30 hover:bg-secondary/20"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Moon className="w-4 h-4 text-foreground" />
                <span
                  className={`text-xs sm:text-sm ${
                    theme === "dark"
                      ? "font-semibold text-foreground"
                      : "font-normal text-foreground/90"
                  }`}
                >
                  {dictionary.settings.darkMode}
                </span>
              </span>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  theme === "dark"
                    ? "bg-foreground text-background shadow-xs"
                    : "border border-border bg-secondary/30"
                }`}
              >
                {theme === "dark" && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
          </div>
        )}
      </div>

      {/* 4. Role Switcher Section ("เปลี่ยนบทบาทเป็น...") */}
      <div
        className={`bg-card rounded-2xl sm:rounded-3xl border transition-all shadow-xs overflow-hidden ${
          openSection === "role"
            ? "border-foreground/50 shadow-sm"
            : "border-border hover:border-foreground/30"
        }`}
      >
        <button
          type="button"
          onClick={() => toggleSection("role")}
          className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-secondary text-foreground border border-border flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-sm sm:text-base text-foreground tracking-tight truncate">
                {dictionary.settings.switchRoleTitle}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {dictionary.settings.switchRoleDesc}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 ml-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground border border-border">
              {user?.role === "manager"
                ? dictionary.auth.managerRole
                : dictionary.auth.customerRole}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                openSection === "role" ? "rotate-180 text-foreground" : ""
              }`}
            />
          </div>
        </button>

        {openSection === "role" && (
          <div className="p-4 sm:p-5 pt-1 sm:pt-1 border-t border-border/60 bg-secondary/20 animate-in fade-in slide-in-from-top-1 duration-200 space-y-2">
            {[
              {
                targetUser: DEMO_USERS[0],
                label: dictionary.auth.customerRole,
                desc: dictionary.auth.customerDesc,
                icon: ShoppingBag,
                redirectPath: "/shop",
              },
              {
                targetUser: DEMO_USERS[1],
                label: dictionary.auth.managerRole,
                desc: dictionary.auth.managerDesc,
                icon: ShieldCheck,
                redirectPath: "/admin/dashboard",
              },
            ].map((item) => {
              const active = user?.role === item.targetUser.role;
              const Icon = item.icon;
              return (
                <button
                  key={item.targetUser.id}
                  type="button"
                  onClick={() => {
                    login(item.targetUser);
                    router.push(item.redirectPath);
                  }}
                  className={`w-full p-3 sm:p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                    active
                      ? "border-foreground/80 bg-secondary/50 text-foreground ring-1 ring-foreground/15 shadow-xs"
                      : "border-border bg-card text-foreground hover:border-foreground/30 hover:bg-secondary/20"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        active
                          ? "bg-foreground text-background"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <span className="font-medium text-xs sm:text-sm block truncate">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-muted-foreground block truncate">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      active
                        ? "bg-foreground text-background shadow-xs"
                        : "border border-border bg-secondary/30"
                    }`}
                  >
                    {active && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Account & Profile Section (Monochrome Black & White) */}
      <div
        className={`bg-card rounded-2xl sm:rounded-3xl border transition-all shadow-xs overflow-hidden ${
          openSection === "account"
            ? "border-foreground/50 shadow-sm"
            : "border-border hover:border-foreground/30"
        }`}
      >
        <button
          type="button"
          onClick={() => toggleSection("account")}
          className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-foreground text-background font-semibold text-sm flex items-center justify-center shrink-0 shadow-xs">
              {user?.avatar ?? "JG"}
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-sm sm:text-base text-foreground tracking-tight truncate">
                {user?.name ?? dictionary.settings.accountTitle}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 ml-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground border border-border">
              {user?.role === "manager"
                ? dictionary.auth.managerRole
                : dictionary.auth.customerRole}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                openSection === "account" ? "rotate-180 text-foreground" : ""
              }`}
            />
          </div>
        </button>

        {openSection === "account" && (
          <div className="p-4 sm:p-5 pt-3 border-t border-border/60 bg-secondary/20 animate-in fade-in slide-in-from-top-1 duration-200 space-y-4">
            <div className="p-3.5 rounded-2xl bg-card border border-border text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{dictionary.auth.emailLabel}:</span>
                <span className="font-medium text-foreground">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium text-foreground">{user?.phone}</span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <span className="text-muted-foreground shrink-0">Address:</span>
                <span className="font-medium text-foreground text-right">{user?.address}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
              <p className="text-xs text-muted-foreground">
                {dictionary.settings.logoutDesc}
              </p>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-foreground hover:bg-foreground/90 text-background font-medium text-xs sm:text-sm shadow-sm transition-all cursor-pointer shrink-0"
              >
                <LogOut className="w-4 h-4" />
                <span>{dictionary.nav.logout}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 5. Sandbox Demo Data Section (Monochrome Black & White) */}
      <div
        className={`bg-card rounded-2xl sm:rounded-3xl border transition-all shadow-xs overflow-hidden ${
          openSection === "sandbox"
            ? "border-foreground/50 shadow-sm"
            : "border-border hover:border-foreground/30"
        }`}
      >
        <button
          type="button"
          onClick={() => toggleSection("sandbox")}
          className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-secondary text-foreground border border-border flex items-center justify-center shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-sm sm:text-base text-foreground tracking-tight truncate">
                {dictionary.settings.sandboxTitle}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {INITIAL_STORE_CONFIG.storeName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 ml-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground border border-border">
              Reset
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                openSection === "sandbox" ? "rotate-180 text-foreground" : ""
              }`}
            />
          </div>
        </button>

        {openSection === "sandbox" && (
          <div className="p-4 sm:p-5 pt-3 border-t border-border/60 bg-secondary/20 animate-in fade-in slide-in-from-top-1 duration-200 space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {dictionary.settings.sandboxDesc} ({INITIAL_STORE_CONFIG.storeName})
            </p>
            <button
              type="button"
              onClick={handleReset}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                resetDone
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
              }`}
            >
              {resetDone ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{dictionary.settings.resetConfirm}</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>{dictionary.settings.resetBtn}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
