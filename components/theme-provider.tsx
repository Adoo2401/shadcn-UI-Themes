"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    return () => {
      document.documentElement.classList.remove(
        "light",
        "dark",
        "theme-default",
        "theme-orange",
        "theme-rose",
        "theme-blue",
        "theme-green",
        "theme-purpleish",
        "theme-cyanish",
        "theme-yellowish",
        "theme-maronish",
        "theme-new"
      );
    };
  }, []);
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
