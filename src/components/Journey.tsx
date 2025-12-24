"use client";

import { motion } from "framer-motion";

export default function Journey() {
  const journey = [
    {
      year: "2021",
      title: "Started with the Web",
      desc: "Learned HTML, CSS, and JavaScript. Built basic pages and understood how the web works.",
    },
    {
      year: "2022",
      title: "Frontend Development",
      desc: "Dived into React, component-driven UI, state handling, and responsive design.",
    },
    {
      year: "2023",
      title: "Full Stack (MERN)",
      desc: "Worked with Node.js, Express, MongoDB. Built real apps with authentication and APIs.",
    },
    {
      year: "2024",
      title: "Real Projects & Polish",
      desc: "Built CampusCart and other projects. Focused on UI quality, performance, and deployment.",
    },
  ];

  return (
    
    <section className="mx-auto max-w-2xl px-4 py-24">
      {/* Title */}
     <div className="relative z-10 mb-16 text-center">

  <h2
  className="
    inline-block px-4 py-1
    text-2xl font-semibold
    text-black dark:text-white
    bg-white/80 dark:bg-black/60
    backdrop-blur-md
    rounded-lg
  "
>
  My Tech Journey
</h2>
<div className="mx-auto mt-2 h-[2px] w-12 rounded-full bg-black/30 dark:bg-white/50" />
</div>


      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="journey-line" />

        {journey.map((item, index) => (
          <div key={index} className="relative mb-12 pl-10">
            {/* Dot */}
            <span className="journey-dot" />

            {/* Card */}
            <div
              className="
                rounded-xl p-5
                bg-white dark:bg-white/10
                backdrop-blur-sm
                border border-black/10 dark:border-white/20
              "
            >
              <p className="text-xs text-black/60 dark:text-white/60">
                {item.year}
              </p>

              <h3 className="mt-1 font-medium text-black dark:text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-black/70 dark:text-white/70">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
    
  );
}
