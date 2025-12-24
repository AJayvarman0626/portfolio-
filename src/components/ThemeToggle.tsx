"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        fixed z-50
        h-12 w-12
        rounded-full
        flex items-center justify-center

        transition-all duration-300

        /* position with safe-area */
        right-4
        bottom-[calc(1rem+env(safe-area-inset-bottom))]

        bg-white
        border border-black/15
        text-black
        shadow-[0_10px_25px_rgba(0,0,0,0.15)]

        dark:bg-black/80
        dark:border-white/25
        dark:text-white
        dark:shadow-[0_0_20px_rgba(255,255,255,0.25)]

        hover:scale-105
        active:scale-95
      "
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
