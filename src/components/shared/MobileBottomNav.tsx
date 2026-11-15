"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  PackageCheck,
  SlidersHorizontal,
  ShoppingCart,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useStore } from "@/context/StoreContext";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { dictionary } = useLanguage();
  const { cartItemCount, orders, isCartOpen, setIsCartOpen } = useStore();

  const navItems = [
    {
      href: "/shop",
      label: dictionary.nav.shop,
      icon: ShoppingBag,
      active: !isCartOpen && pathname === "/shop",
    },
    {
      href: "/orders",
      label: dictionary.nav.orders,
      icon: PackageCheck,
      badge: orders.length,
      active: !isCartOpen && pathname === "/orders",
    },
    {
      action: () => setIsCartOpen(!isCartOpen),
      label: dictionary.nav.cart,
      icon: ShoppingCart,
      badge: cartItemCount,
      isCart: true,
      active: isCartOpen,
    },
    {
      href: "/settings",
      label: dictionary.nav.settings,
      icon: SlidersHorizontal,
      active: !isCartOpen && pathname === "/settings",
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-card/95 backdrop-blur-xl border-t border-border shadow-2xl pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="grid grid-cols-4 h-16 items-center px-1">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = item.active;

          const content = (
            <div className="flex flex-col items-center justify-center w-full h-full relative transition-all active:scale-95">
              <div className="relative flex items-center justify-center">
                <div
                  className={`p-1.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Badge for Orders or Cart */}
                {typeof item.badge === "number" && item.badge > 0 && (
                  <span
                    className={`absolute -top-1 -right-2 px-1.5 py-0.2 text-[10px] font-extrabold rounded-full leading-tight shadow-xs ${
                      item.isCart
                        ? "bg-primary text-primary-foreground"
                        : "bg-indigo-500/20 text-primary border border-indigo-500/30"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] font-semibold mt-0.5 tracking-tight ${
                  isActive ? "text-primary font-bold" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </div>
          );

          if (item.action) {
            return (
              <button
                key={idx}
                type="button"
                onClick={item.action}
                className="h-full flex items-center justify-center cursor-pointer"
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={idx}
              href={item.href!}
              onClick={() => {
                if (isCartOpen) setIsCartOpen(false);
              }}
              className="h-full flex items-center justify-center cursor-pointer"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
