"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { StoreNavbar } from "@/components/shared/StoreNavbar";
import { StoreFooter } from "@/components/shared/StoreFooter";
import { MobileBottomNav } from "@/components/shared/MobileBottomNav";
import { ProductQuickViewModal } from "@/components/storefront/ProductQuickViewModal";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { OrderInvoiceModal } from "@/components/orders/OrderInvoiceModal";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isMounted } = useStore();

  useEffect(() => {
    if (isMounted) {
      if (!user) {
        router.replace("/login");
      } else if (user.role === "manager") {
        router.replace("/admin/dashboard");
      }
    }
  }, [isMounted, user, router]);

  if (!isMounted || !user || user.role === "manager") {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <StoreNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8 pb-24 md:pb-8">
        {children}
      </main>

      <StoreFooter />

      {/* Mobile App Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Storefront Interactive Modals & Drawers */}
      <ProductQuickViewModal />
      <CartDrawer />
      <CheckoutModal onOrderCompleted={() => router.push("/orders")} />
      <OrderInvoiceModal />
    </div>
  );
}

