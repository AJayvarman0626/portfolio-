"use client";

import Image from "next/image";
import { Github, Linkedin, FileText } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState } from "react";

export default function HeroCard() {
  /* ===== Tilt ===== */
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 90, damping: 20 });
  const springY = useSpring(y, { stiffness: 90, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  const glowX = useTransform(springX, [-0.5, 0.5], ["-25%", "25%"]);
  const glowY = useTransform(springY, [-0.5, 0.5], ["-25%", "25%"]);

  /* ===== Cinematic flip ===== */
  const [flipped, setFlipped] = useState(false);
  const [popping, setPopping] = useState(false);

  function handleFlip() {
    setPopping(true);

    setTimeout(() => {
      setFlipped((prev) => !prev);
    }, 180);

    setTimeout(() => {
      setPopping(false);
    }, 520);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-4">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full max-w-sm"
      >
        {/* Glow */}
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="
            pointer-events-none absolute -inset-20
            rounded-full bg-white/30 dark:bg-white/20
            blur-[160px]
          "
        />

        {/* Glass Card */}
        <div
          className="
            relative z-10 rounded-2xl p-6
            backdrop-blur-xl
            bg-white/70 dark:bg-white/10
            border border-black/10 dark:border-white/20
            shadow-[0_30px_80px_rgba(0,0,0,0.25)]
          "
          style={{ transform: "translateZ(60px)" }}
        >
          {/* ===== POP + FLIP IMAGE ===== */}
          <motion.div
            className="flex justify-center"
            style={{ transform: "translateZ(110px)" }}
          >
            <motion.div
              onClick={handleFlip}
              animate={{
                scale: popping ? 2 : 1,
                rotateY: flipped ? 180 : 0,
              }}
              transition={{
                scale: {
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                },
                rotateY: {
                  duration: 0.6,
                  ease: "easeInOut",
                },
              }}
              className="
                relative h-24 w-24 cursor-pointer
                [transform-style:preserve-3d]
              "
            >
              {/* Front */}
              <div
                className="
                  absolute inset-0 rounded-full overflow-hidden
                  border border-black/20 dark:border-white/30
                  [backface-visibility:hidden]
                "
              >
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Back */}
              <div
                className="
                  absolute inset-0 rounded-full overflow-hidden
                  border border-black/20 dark:border-white/30
                  rotate-y-180
                  [backface-visibility:hidden]
                "
              >
                <Image
                  src="/profile-alt.jpg"
                  alt="Alt Profile"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Text */}
         <motion.div
  className="mt-4 text-center"
  style={{ transform: "translateZ(70px)" }}
  animate={{ opacity: popping ? 0 : 1 }}
  transition={{ duration: 0.25, ease: "easeOut" }}
>

            <h1 className="text-xl font-semibold text-black dark:text-white">
              Ajayvarman
            </h1>
            <p className="mt-1 text-sm text-black/70 dark:text-white/80">
              Full Stack – MERN Developer
            </p>
          </motion.div>

          {/* Slogan */}
          <motion.p
            className="mt-4 text-center text-sm text-black/60 dark:text-white/70"
            style={{ transform: "translateZ(50px)" }}
          >
            I build clean, practical web apps with real-world logic.
          </motion.p>

          {/* Icons */}
          <motion.div
            className="mt-6 flex justify-center gap-4"
            style={{ transform: "translateZ(120px)" }}
          >
            {[
              { icon: Github, link: "https://github.com/AJayvarman0626" },
              { icon: Linkedin, link: "https://www.linkedin.com/in/ajayvarman-26x/" },
              { icon: FileText, link: "/resume.pdf" },
            ].map(({ icon: Icon, link }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                className="
                  rounded-full p-2 transition
                  border border-black/20 dark:border-white/30
                  hover:bg-black/10 dark:hover:bg-white/15
                "
              >
                <Icon size={18} className="text-black dark:text-white" />
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
