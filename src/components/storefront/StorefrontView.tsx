"use client";

import React, { useMemo, useRef, useState } from "react";
import { ArrowUpDown, RotateCcw, Search, SearchX, X } from "lucide-react";
import { CATEGORIES } from "@/data";
import { type CategoryId } from "@/types/store";
import { useLanguage } from "@/context/LanguageContext";
import { useStore } from "@/context/StoreContext";
import { ProductIcon } from "@/components/shared/ProductIcon";
import { HeroBanner } from "./HeroBanner";
import { ProductCard } from "./ProductCard";

type SortOption = "featured" | "price_asc" | "price_desc" | "rating";

interface StorefrontViewProps {
  searchQuery: string;
  onClearSearch: () => void;
  onGoToOrders: () => void;
}

export function StorefrontView({
  searchQuery,
  onClearSearch,
  onGoToOrders,
}: StorefrontViewProps) {
  const { locale, dictionary } = useLanguage();
  const { products, setSearchQuery } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const catalogRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = products.filter((item) => {
      const matchCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      if (!matchCategory) return false;
      if (!q) return true;
      return (
        item.name.lo.toLowerCase().includes(q) ||
        item.name.th.toLowerCase().includes(q) ||
        item.name.en.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q)
      );
    });

    if (sortBy === "price_asc") {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price_desc") {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortBy === "rating") {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const resetAllFilters = () => {
    setSelectedCategory("all");
    setSortBy("featured");
    onClearSearch();
  };

  return (
    <div className="space-y-4 sm:space-y-8">
      {/* Mobile Prominent Full-Width Search Bar */}
      <div className="md:hidden relative w-full">
        <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={dictionary.nav.searchPlaceholder}
          className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-card border border-border shadow-xs text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={onClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Hero Banner */}
      <HeroBanner
        onExploreClick={scrollToCatalog}
        onTrackOrdersClick={onGoToOrders}
      />

      {/* Category Filter Carousel & Sort Controls */}
      <div ref={catalogRef} className="space-y-3 pt-2">
        {/* Category Pills (Edge-to-edge Horizontal Touch Scroll) */}
        <div className="-mx-3 sm:mx-0 px-3 sm:px-0 flex items-center gap-2 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden touch-pan-x snap-x pb-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 snap-start inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all active:scale-95 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-indigo-500/25"
                    : "bg-card hover:bg-secondary text-foreground border border-border shadow-xs"
                }`}
              >
                <ProductIcon name={cat.iconName} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{cat.name[locale]}</span>
              </button>
            );
          })}
        </div>

        {/* Filter Summary & Sort Selector */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="text-xs text-muted-foreground">
            {dictionary.catalog.showingCount}{" "}
            <strong className="text-foreground font-bold">
              {filteredProducts.length}
            </strong>
          </span>

          <div className="relative flex items-center bg-card border border-border rounded-xl px-2.5 py-1.5 shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground mr-1.5 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-xs font-semibold text-foreground focus:outline-none cursor-pointer pr-1"
            >
              <option value="featured" className="bg-card text-foreground">
                {dictionary.catalog.sortFeatured}
              </option>
              <option value="price_asc" className="bg-card text-foreground">
                {dictionary.catalog.sortPriceAsc}
              </option>
              <option value="price_desc" className="bg-card text-foreground">
                {dictionary.catalog.sortPriceDesc}
              </option>
              <option value="rating" className="bg-card text-foreground">
                {dictionary.catalog.sortRating}
              </option>
            </select>
          </div>
        </div>

        {/* Product Grid - 2 cols on mobile, 3 on tablet, 4 on desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-3xl border border-border p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto text-muted-foreground">
              <SearchX className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-foreground">
                {dictionary.catalog.noProductsFound}
              </h3>
              {searchQuery && (
                <p className="text-xs text-muted-foreground">
                  &ldquo;{searchQuery}&rdquo;
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{dictionary.catalog.clearFilters}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

