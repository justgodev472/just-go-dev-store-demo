"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingBag,
  Search,
  PackageCheck,
  SlidersHorizontal,
  X,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useStore } from "@/context/StoreContext";

export function StoreNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { dictionary } = useLanguage();
  const {
    cartItemCount,
    orders,
    user,
    searchQuery,
    setSearchQuery,
    setIsCartOpen,
  } = useStore();

  const handleSearchInput = (val: string) => {
    setSearchQuery(val);
    if (pathname !== "/shop") {
      router.push("/shop");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-card/90 backdrop-blur-xl border-b border-border transition-colors print:hidden">
      {/* Top Promo Strip (Desktop only) */}
      <div className="hidden md:block bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>{dictionary.hero.promoBanner}</span>
            <span className="hidden md:inline text-white/75">•</span>
            <span className="hidden md:inline text-indigo-100">
              {dictionary.hero.freeShippingNote}
            </span>
          </div>

          <Link
            href="/settings"
            className="flex items-center gap-1.5 text-[11px] font-medium text-white/90 hover:text-white bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-lg transition-colors ml-auto"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>{dictionary.nav.settings}</span>
          </Link>
        </div>
      </div>

      {/* Main Storefront Navbar */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand Logo */}
        <Link
          href="/shop"
          className="flex items-center gap-2 sm:gap-3 text-left group shrink-0"
        >
          <div className="w-9 h-8 sm:w-12 sm:h-10 relative flex items-center justify-center shrink-0">
            <Image
              src="/jgd-latets-logo-no-bg.png"
              alt="JustGoDev Logo"
              width={80}
              height={80}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-bold text-sm sm:text-lg tracking-tight text-foreground">
                {dictionary.brand.name}
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                {dictionary.brand.badge}
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">
              {dictionary.brand.subtitle}
            </p>
          </div>
        </Link>

        {/* Live Search Bar */}
        <div className="relative flex-1 max-w-md min-w-0">
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchInput(e.target.value)}
            placeholder={dictionary.nav.searchPlaceholder}
            className="w-full pl-8 sm:pl-10 pr-8 sm:pr-9 py-1.5 sm:py-2 text-xs sm:text-sm bg-secondary/70 hover:bg-secondary focus:bg-card rounded-xl border border-border focus:border-primary focus:outline-none transition-all placeholder:text-[11px] sm:placeholder:text-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchInput("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          )}
        </div>

        {/* Desktop Navigation Links & Cart (Hidden on Mobile, moved to MobileBottomNav) */}
        <div className="hidden md:flex items-center gap-1.5 sm:gap-2">
          <nav className="flex items-center bg-secondary/60 p-1 rounded-xl border border-border/60">
            <Link
              href="/shop"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${pathname === "/shop"
                  ? "bg-card text-primary shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{dictionary.nav.shop}</span>
            </Link>

            <Link
              href="/orders"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${pathname === "/orders"
                  ? "bg-card text-primary shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <PackageCheck className="w-4 h-4" />
              <span>{dictionary.nav.orders}</span>
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-bold">
                {orders.length}
              </span>
            </Link>

            <Link
              href="/settings"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${pathname === "/settings"
                  ? "bg-card text-primary shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{dictionary.nav.settings}</span>
            </Link>
          </nav>

          {/* Cart Drawer Trigger */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{dictionary.nav.cart}</span>
            <span className="px-1.5 py-0.5 text-[11px] rounded-full bg-white text-indigo-700 font-bold leading-none">
              {cartItemCount}
            </span>
          </button>

          {/* Customer Profile Pill (Links to /settings) */}
          {user && (
            <Link
              href="/settings"
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card hover:bg-secondary text-xs font-medium transition-colors"
            >
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">
                {user.avatar}
              </span>
              <span className="hidden xl:inline max-w-[100px] truncate font-semibold">
                {user.name.split(" ")[0]}
              </span>
            </Link>
          )}
        </div>

        {/* Mobile Quick Cart Button (Header right) */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="md:hidden relative flex items-center justify-center p-2 rounded-xl bg-primary text-primary-foreground shadow-sm cursor-pointer shrink-0"
          aria-label="View Cart"
        >
          <ShoppingBag className="w-4 h-4" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center leading-none shadow-xs">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
