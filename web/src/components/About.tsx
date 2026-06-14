"use client";

import { motion } from "framer-motion";

const stats = [
  { id: 1, label: "Total Missions", value: "328" },
  { id: 2, label: "Booster Landings", value: "285" },
  { id: 3, label: "Reflown Rockets", value: "261" },
  { id: 4, label: "Payload to Orbit", value: "1,240t+" },
];

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-zinc-50 border-t border-b border-zinc-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Editorial Content Column (Left) */}
          <div className="lg:col-span-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-zinc-800" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-zinc-500">
                Our Mission
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-8 leading-tight"
            >
              Making Humanity <br />
              <span className="font-light text-zinc-400">Multiplanetary</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-zinc-600 text-lg font-light leading-relaxed max-w-xl"
            >
              <p>
                SpaceY believes the future of human exploration lies beyond Earth. By developing fully reusable launch systems, we are exponentially lowering the economic and technical barriers to orbit.
              </p>
              <p className="text-base text-zinc-500">
                Our engineering teams work at the cutting edge of materials science, autonomous systems control, and propulsion systems. Every landing and booster flight refines the flight systems that will eventually carry crew and cargo to the Moon and Mars.
              </p>
            </motion.div>
          </div>

          {/* Technical Statistics Grid (Right) */}
          <div className="lg:col-span-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-8 md:gap-12"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.id}
                  variants={itemVariants}
                  className="bg-white border border-zinc-200/50 p-8 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.04)] hover:border-zinc-300/60 transition-all duration-300 text-left relative overflow-hidden group"
                >
                  {/* Subtle top indicator bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-200 to-zinc-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <div className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-2 font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
