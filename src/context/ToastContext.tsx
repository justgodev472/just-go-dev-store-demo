"use client";

import React, { createContext, useContext } from "react";

export type ToastVariant = "success" | "error" | "info" | "cart";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (payload: {
    title: string;
    description?: string;
    variant?: ToastVariant;
  }) => void;
}

const noopToast = () => {};

const ToastContext = createContext<ToastContextValue>({
  showToast: noopToast,
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <ToastContext.Provider value={{ showToast: noopToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
