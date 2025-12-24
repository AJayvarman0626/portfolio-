"use client";

import { motion } from "framer-motion";

export default function Skills() {
  const skills = [
    {
      title: "Frontend",
      desc: "Interfaces that feel fast, clean, and intuitive.",
      items: [
        "HTML",
        "CSS",
        "JavaScript (ES6+)",
        "React",
        "Next.js",
        "Tailwind CSS",
      ],
    },
    {
      title: "Backend",
      desc: "Scalable APIs and real-world logic.",
      items: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST APIs",
        "JWT Authentication",
      ],
    },
    {
      title: "Tools & Platforms",
      desc: "Daily tools that ship real products.",
      items: [
        "Git & GitHub",
        "Postman",
        "Vercel",
        "Cloudinary",
        "VS Code",
      ],
    },
    {
      title: "Core Strengths",
      desc: "How I approach problems.",
      items: [
        "Problem Solving",
        "Debugging",
        "Clean Code",
        "Responsive Design",
        "Performance Thinking",
      ],
    },
  ];

  /* Animations */
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-28">
      {/* ===== Title ===== */}
      <div className="mb-12 text-center">
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
          Skills & Tools
        </h2>

        <p
  className="
    mx-auto mt-4 max-w-xl px-3 py-1
    text-sm text-black/60 dark:text-white/55
    bg-white/70 dark:bg-black/40
    backdrop-blur-sm
    rounded-md
  "
>
  Technologies and tools I use to build scalable, real-world applications —
  not just demos.
</p>


        <div className="mx-auto mt-4 h-[2px] w-14 rounded-full bg-black/40 dark:bg-white/70" />
      </div>

      {/* ===== Skill Cards ===== */}
      <motion.div
        className="grid gap-10 md:grid-cols-2"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skills.map((group, index) => (
          <motion.div
            key={index}
            variants={card}
            className="
              group relative rounded-3xl p-6
              bg-white dark:bg-white/10
              backdrop-blur-md
              border border-black/10 dark:border-white/20
              transition
              hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]
            "
          >
            {/* Glow on hover */}
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
              {group.title}
            </h3>

            <p className="relative z-10 mt-1 text-sm text-black/60 dark:text-white/50">
              {group.desc}
            </p>

            {/* Skill chips */}
            <div className="relative z-10 mt-4 flex flex-wrap gap-2">
              {group.items.map((skill, i) => (
                <span
                  key={i}
                  className="
                    rounded-full px-3 py-1 text-sm
                    bg-black/5 dark:bg-white/15
                    text-black dark:text-white
                    transition
                    hover:scale-105
                    hover:bg-black/10 dark:hover:bg-white/25
                  "
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
