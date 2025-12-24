"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Laptop } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    // initial safe position (bottom-right)
    setPos({
      x: window.innerWidth - 72,
      y: window.innerHeight - 120,
    });
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  /* ---------- Drag logic ---------- */
  function onPointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    dragging.current = true;
    start.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };

    // long press → system theme
    pressTimer.current = setTimeout(() => {
      setTheme("system");
    }, 700);
  }

  function onPointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    if (!dragging.current) return;

    setPos({
      x: e.clientX - start.current.x,
      y: e.clientY - start.current.y,
    });
  }

  function onPointerUp() {
    dragging.current = false;

    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }

    // snap to nearest side
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    setPos((p) => ({
      x: p.x < vw / 2 ? 16 : vw - 72,
      y: Math.min(Math.max(p.y, 16), vh - 96),
    }));
  }

  function toggleTheme() {
    if (theme === "system") {
      setTheme("dark");
    } else {
      setTheme(isDark ? "light" : "dark");
    }
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      style={{
        left: pos.x,
        top: pos.y,
      }}
      className="
        fixed z-50
        h-12 w-12
        rounded-full
        backdrop-blur-md
        touch-none
        transition-all duration-300

        /* Light mode */
        bg-white/90
        border border-black/15
        text-black
        shadow-[0_10px_30px_rgba(0,0,0,0.15)]

        /* Dark mode */
        dark:bg-black/70
        dark:border-white/25
        dark:text-white
        dark:shadow-[0_0_25px_rgba(255,255,255,0.25)]

        hover:scale-105
        active:scale-95
      "
    >
      {/* Radial glow */}
      <span
        className={`
          pointer-events-none absolute inset-0 rounded-full
          ${isDark ? "bg-white/20" : "bg-black/10"}
          opacity-0 group-active:opacity-100
        `}
      />

      {/* Icon */}
      <span className="relative z-10 flex items-center justify-center">
        {theme === "system" ? (
          <Laptop size={18} />
        ) : isDark ? (
          <Sun size={18} />
        ) : (
          <Moon size={18} />
        )}
      </span>
    </button>
  );
}
