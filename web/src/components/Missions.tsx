"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, Users, Rocket } from "lucide-react";

const missions = [
  {
    id: "starlink",
    category: "Satellite",
    title: "Starlink-12 Network",
    description: "Expanding the global low-latency broadband constellation to provide high-speed internet access across remote and underserved regions worldwide.",
    icon: Globe,
    stats: [
      { label: "Orbit", value: "LEO" },
      { label: "Altitude", value: "550 km" },
      { label: "Booster Reuse", value: "14th Flight" },
    ],
    status: "Active",
    statusColor: "bg-emerald-500",
  },
  {
    id: "crew-dragon",
    category: "Manned Spaceflight",
    title: "Crew-9 Mission",
    description: "Transporting international astronauts safely to the International Space Station (ISS) in collaboration with NASA Commercial Crew Program.",
    icon: Users,
    stats: [
      { label: "Spacecraft", value: "Dragon C206" },
      { label: "Duration", value: "180 Days" },
      { label: "Crew Capacity", value: "4 Members" },
    ],
    status: "Completed",
    statusColor: "bg-blue-500",
  },
  {
    id: "starship",
    category: "Deep Space Exploration",
    title: "Starship Test Flight",
    description: "Advancing the development of the next-generation fully reusable heavy-lift launch system designed for human colonization of Mars.",
    icon: Rocket,
    stats: [
      { label: "Height", value: "121 meters" },
      { label: "Payload Capacity", value: "150+ tons" },
      { label: "Thrust", value: "7,590 tf" },
    ],
    status: "In Progress",
    statusColor: "bg-amber-500",
  },
];

export default function Missions() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section id="missions" className="py-24 md:py-32 bg-zinc-50/50 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-zinc-800" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-zinc-500">
              Operations Portfolio
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6 leading-tight"
          >
            Current & Upcoming <br />
            <span className="text-zinc-400 font-light">Missions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-600 text-lg font-light leading-relaxed max-w-2xl"
          >
            Our launch schedule drives global progress, uniting advanced robotics, satellite engineering, and manned exploration to redefine what is possible.
          </motion.p>
        </div>

        {/* Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {missions.map((mission) => {
            const Icon = mission.icon;
            return (
              <motion.div
                key={mission.id}
                variants={cardVariants}
                className="group relative bg-white border border-zinc-200/60 rounded-[2rem] p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-zinc-300/80 transition-all duration-500 flex flex-col justify-between overflow-hidden"
              >
                {/* Background decorative gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-zinc-50 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] tracking-[0.2em] font-semibold text-zinc-400 uppercase">
                      {mission.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-100 bg-zinc-50 text-[10px] font-medium text-zinc-600">
                      <span className={`w-1.5 h-1.5 rounded-full ${mission.statusColor}`} />
                      {mission.status}
                    </span>
                  </div>

                  {/* Icon Wrapper */}
                  <div className="inline-flex p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-zinc-700 mb-6 group-hover:bg-zinc-900 group-hover:text-white group-hover:border-zinc-950 transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-semibold text-zinc-900 mb-4 group-hover:text-zinc-950 transition-colors">
                    {mission.title}
                  </h3>
                  <p className="text-zinc-500 font-light text-sm leading-relaxed mb-8">
                    {mission.description}
                  </p>
                </div>

                {/* Technical Stats & Action */}
                <div>
                  <div className="grid grid-cols-3 gap-4 border-t border-zinc-100 pt-6 mb-8">
                    {mission.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="text-left">
                        <div className="text-[10px] text-zinc-400 font-medium tracking-wide uppercase mb-1">
                          {stat.label}
                        </div>
                        <div className="text-xs font-semibold text-zinc-800 tracking-tight">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Link */}
                  <a
                    href="#explore"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-800 hover:text-zinc-950 transition-colors group/link"
                  >
                    View Mission Details
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
