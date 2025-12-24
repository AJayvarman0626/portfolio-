"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "CampusCart",
      desc: "A college-focused marketplace to buy and sell items based on semester, regulation, and category.",
      tech: ["Next.js", "Node.js", "MongoDB", "Tailwind", "Cloudinary"],
      live: "https://campuscart-fl2c.onrender.com/",
      code: "https://github.com/AJayvarman0626/campuscart",
    },
    {
      title: "Jokeal ",
      desc: "A complete e-commerce solution featuring product management, secure user authentication, and an admin dashboard to manage inventory, users, and orders efficiently.",
      tech: ["React, Node.js, Express, MongoDB, JWT"],
      live: "https://ecom-jolaela-1.onrender.com/",
      code: "https://github.com/AJayvarman0626/ecom-Jokaela",
    },
    {
      title: "We-Chat",
      desc: "A modern real-time chat application designed for fast, secure, and seamless communication with live user presence and instant message delivery.",
      tech: ["MERN Stack, Socket.io, Tailwind CSS, DaisyUI, Zustand"],
      live: "https://we-chat-2-0.onrender.com",
      code: "https://github.com/AJayvarman0626/We-Chat-2.0",
    },
  ];

  /* ===== Stagger Animation ===== */
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.18 },
    },
  };

  const cardFade = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      {/* ===== Title ===== */}
      <div className="mb-14 text-center">
        <h2
          className="
            inline-block px-5 py-2
            text-2xl font-semibold
            text-black dark:text-white
            bg-white/80 dark:bg-black/60
            backdrop-blur-md
            rounded-xl
          "
        >
          Projects
        </h2>

        {/* Dark-mode safe subtitle */}
        <p
          className="
            mx-auto mt-3 max-w-xl px-3 py-1
            text-sm text-black/60 dark:text-white/55
            bg-white/70 dark:bg-black/40
            backdrop-blur-sm
            rounded-md
          "
        >
          A selection of projects that showcase real-world problem solving and clean execution.
        </p>

        <div className="mx-auto mt-4 h-[2px] w-14 rounded-full bg-black/40 dark:bg-white/70" />
      </div>

      {/* ===== Project Cards ===== */}
      <motion.div
        className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {projects.map((project, index) => {
          /* ---- Tilt physics ---- */
          const x = useMotionValue(0);
          const y = useMotionValue(0);

          const rotateX = useTransform(y, [-50, 50], [10, -10]);
          const rotateY = useTransform(x, [-50, 50], [-10, 10]);

          const springX = useSpring(rotateX, { stiffness: 120, damping: 14 });
          const springY = useSpring(rotateY, { stiffness: 120, damping: 14 });

          function handleMove(e: React.MouseEvent<HTMLDivElement>) {
            const rect = e.currentTarget.getBoundingClientRect();
            x.set(e.clientX - rect.left - rect.width / 2);
            y.set(e.clientY - rect.top - rect.height / 2);
          }

          function handleLeave() {
            x.set(0);
            y.set(0);
          }

          return (
            <motion.div
              key={index}
              variants={cardFade}
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
              style={{
                perspective: 1000,
                rotateX: springX,
                rotateY: springY,
              }}
              className="
                group relative rounded-3xl p-6
                bg-white dark:bg-white/10
                backdrop-blur-md
                border border-black/10 dark:border-white/20
                transition
                hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]
              "
            >
              {/* Hover glow */}
              <div
                className="
                  pointer-events-none absolute inset-0 rounded-3xl
                  opacity-0 group-hover:opacity-100
                  transition duration-300
                  bg-gradient-to-br from-transparent via-white/10 to-transparent
                  dark:via-white/20
                "
              />

              {/* Content */}
              <h3 className="relative z-10 text-lg font-medium text-black dark:text-white">
                {project.title}
              </h3>

              <p className="relative z-10 mt-2 text-sm text-black/70 dark:text-white/70">
                {project.desc}
              </p>

              {/* Tech stack */}
              <div className="relative z-10 mt-4 flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="
                      rounded-full px-3 py-1 text-xs
                      bg-black/5 dark:bg-white/15
                      text-black dark:text-white
                    "
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="relative z-10 mt-6 flex gap-4">
                <a
                  href={project.live}
                  target="_blank"
                  className="
                    inline-flex items-center gap-1 text-sm
                    text-black dark:text-white
                    hover:underline
                  "
                >
                  <ExternalLink size={16} />
                  Live
                </a>

                <a
                  href={project.code}
                  target="_blank"
                  className="
                    inline-flex items-center gap-1 text-sm
                    text-black dark:text-white
                    hover:underline
                  "
                >
                  <Github size={16} />
                  Code
                </a>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
