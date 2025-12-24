"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="
        relative mt-24
        border-t border-black/10 dark:border-white/20
        bg-white/70 dark:bg-black/60
        backdrop-blur-md
      "
    >
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Top Row */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              ajayvarman
            </h3>
            <p className="mt-1 text-sm text-black/60 dark:text-white/60">
              Full Stack • MERN • Frontend Focused
            </p>
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            {[
              {
                icon: Github,
                link: "https://github.com/AJayvarman0626",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                link: "https://www.linkedin.com/in/ajayvarman-26x",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                link: "mailto:ajayvarmank@zohomail.in",
                label: "Email",
              },
            ].map(({ icon: Icon, link, label }) => (
              <a
                key={label}
                href={link}
                target="_blank"
                aria-label={label}
                className="
                  rounded-full p-2
                  border border-black/20 dark:border-white/30
                  text-black dark:text-white
                  transition
                  hover:bg-black/10 dark:hover:bg-white/15
                  hover:scale-105
                "
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-black/10 dark:bg-white/20" />

        {/* Bottom Row */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
          <p className="text-black/60 dark:text-white/60">
            © {new Date().getFullYear()} ajayvarman. Built with passion.
          </p>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="
              flex items-center gap-1
              rounded-full px-3 py-1
              border border-black/20 dark:border-white/30
              text-black dark:text-white
              transition
              hover:bg-black/10 dark:hover:bg-white/15
            "
          >
            <ArrowUp size={14} />
            Top
          </button>
        </div>
      </div>
    </footer>
  );
}
