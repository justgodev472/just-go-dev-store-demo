"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Truck,
  ShieldCheck,
  Copy,
  Check,
  ArrowRight,
  PackageSearch,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
interface HeroBannerProps {
  onExploreClick: () => void;
  onTrackOrdersClick: () => void;
}

export function HeroBanner({
  onExploreClick,
  onTrackOrdersClick,
}: HeroBannerProps) {
  const { dictionary } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyPromo = () => {
    navigator.clipboard?.writeText("JUSTGODEV10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 text-white p-4 sm:p-10 lg:p-12 shadow-xl border border-indigo-500/20">
      {/* Decorative Background Glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-violet-500/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
        <div className="lg:col-span-8 space-y-3.5 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-medium text-indigo-200 max-w-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{dictionary.hero.badge}</span>
          </div>

          <h1 className="text-xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight break-words">
            {dictionary.hero.title}
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl leading-relaxed break-words">
            {dictionary.hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
            <button
              type="button"
              onClick={onExploreClick}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl bg-white text-slate-900 hover:bg-indigo-50 font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer"
            >
              <span>{dictionary.hero.ctaShop}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              type="button"
              onClick={onTrackOrdersClick}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/15 transition-all cursor-pointer"
            >
              <PackageSearch className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{dictionary.hero.ctaOrders}</span>
            </button>

            {/* Interactive Promo Pill */}
            <button
              type="button"
              onClick={handleCopyPromo}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/30 text-indigo-100 text-[11px] sm:text-xs font-semibold transition-all cursor-pointer shrink-0"
            >
              <span className="font-mono font-bold text-amber-300">
                JUSTGODEV10
              </span>
              <span className="text-white/60">|</span>
              {copied ? (
                <span className="inline-flex items-center gap-1 text-emerald-300">
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  {dictionary.hero.copied}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1">
                  <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  {dictionary.hero.copyCode}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Highlights: Horizontal touch-scroll on mobile, stacked on desktop */}
        <div className="lg:col-span-4 flex lg:flex-col gap-2 sm:gap-3 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden touch-pan-x -mx-1 px-1 lg:mx-0 lg:px-0">
          <div className="shrink-0 flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-500/30 flex items-center justify-center text-indigo-200 shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-indigo-200 font-medium hidden sm:block">12+ Items</p>
              <p className="text-xs sm:text-sm font-bold whitespace-nowrap text-white">{dictionary.hero.statsProducts}</p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-500/30 flex items-center justify-center text-emerald-200 shrink-0">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-emerald-200 font-medium hidden sm:block">Fast Express</p>
              <p className="text-xs sm:text-sm font-bold whitespace-nowrap text-white">{dictionary.hero.statsDelivery}</p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-500/30 flex items-center justify-center text-amber-200 shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-amber-200 font-medium hidden sm:block">Official</p>
              <p className="text-xs sm:text-sm font-bold whitespace-nowrap text-white">{dictionary.hero.statsWarranty}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

