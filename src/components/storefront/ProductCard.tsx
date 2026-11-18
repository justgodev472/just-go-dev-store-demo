"use client";

import React, { useState } from "react";
import { Star, ShoppingCart, Eye, Check } from "lucide-react";
import { type Product } from "@/types/store";
import { useLanguage } from "@/context/LanguageContext";
import { useStore } from "@/context/StoreContext";
import { ProductIcon } from "@/components/shared/ProductIcon";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { locale, dictionary } = useLanguage();
  const { formatPrice, addToCart, setQuickViewProduct } = useStore();
  const [justAdded, setJustAdded] = useState(false);

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock <= 0) return;
    addToCart(product, 1, product.variants?.[0]);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const badgeLabel =
    product.badge === "hot"
      ? dictionary.catalog.badgeHot
      : product.badge === "new"
      ? dictionary.catalog.badgeNew
      : product.badge === "sale"
      ? dictionary.catalog.badgeSale
      : null;

  const badgeStyle =
    product.badge === "hot"
      ? "bg-rose-500 text-white"
      : product.badge === "new"
      ? "bg-emerald-500 text-white"
      : "bg-amber-500 text-white";

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group bg-card rounded-2xl border border-border hover:border-primary/40 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Visual Header */}
      <div
        className={`relative h-28 sm:h-44 bg-gradient-to-br ${product.imageGradient} flex items-center justify-center overflow-hidden`}
      >
        {product.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name[locale]}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/20 pointer-events-none" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-md sm:shadow-lg group-hover:scale-110 transition-transform duration-300">
              <ProductIcon name={product.iconName} className="w-6 h-6 sm:w-10 sm:h-10" />
            </div>
          </>
        )}

        {/* Top Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1 sm:gap-1.5 z-10">
          {badgeLabel && (
            <span
              className={`px-1.5 sm:px-2.5 py-0.2 sm:py-0.5 rounded-full text-[9px] sm:text-[11px] font-bold uppercase tracking-wider shadow-xs ${badgeStyle}`}
            >
              {badgeLabel}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full text-[9px] sm:text-[11px] font-bold bg-white/90 text-slate-900 shadow-xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Quick View Floating Trigger */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-xl bg-black/30 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md transition-all z-10 cursor-pointer"
          title={dictionary.catalog.quickView}
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Bottom Specs Chips (Desktop only) */}
        <div className="hidden sm:flex absolute bottom-2.5 left-3 right-3 items-center gap-1.5 overflow-hidden">
          {product.specs.slice(0, 2).map((spec) => (
            <span
              key={spec}
              className="px-2 py-0.5 rounded-md bg-black/35 backdrop-blur-xs text-white/90 text-[10px] font-medium truncate"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-4">
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
            <span className="font-mono text-[10px] sm:text-[11px]">{product.sku}</span>
            <span className="inline-flex items-center gap-0.5 sm:gap-1 font-semibold text-amber-500">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
              {product.rating}
              <span className="text-muted-foreground font-normal hidden sm:inline">
                ({product.reviewsCount})
              </span>
            </span>
          </div>

          <h3 className="font-bold text-xs sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-1 leading-snug">
            {product.name[locale]}
          </h3>

          <p className="hidden sm:block text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description[locale]}
          </p>
        </div>

        <div className="pt-1.5 sm:pt-2 border-t border-border/60 space-y-2 sm:space-y-3">
          {/* Price & Stock Row */}
          <div className="flex items-baseline justify-between gap-1 sm:gap-2">
            <div>
              <div className="text-sm sm:text-lg font-extrabold text-primary leading-tight">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="text-[10px] sm:text-xs text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
            </div>

            <div className="text-right">
              {product.stock > 5 ? (
                <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {dictionary.catalog.inStock}
                </span>
              ) : product.stock > 0 ? (
                <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  {dictionary.catalog.lowStock}
                </span>
              ) : (
                <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  {dictionary.catalog.outOfStock}
                </span>
              )}
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            disabled={product.stock <= 0}
            onClick={handleAdd}
            className={`w-full py-2 sm:py-2.5 px-2.5 sm:px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              justAdded
                ? "bg-emerald-600 text-white"
                : product.stock <= 0
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-indigo-500/20"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="truncate">{dictionary.catalog.added}</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="truncate">{dictionary.catalog.addToCart}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

