"use client";

import { motion } from "framer-motion";
import { Mail, Cpu, Terminal } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const HoollowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M6 3v18M18 3v18M6 12h12" />
    <circle cx="6" cy="12" r="1.5" fill="currentColor" />
    <circle cx="18" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

interface Developer {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: string[];
  icon: typeof Cpu;
  socials: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    hoollow?: string;
    email?: string;
  };
}

const developers: Developer[] = [
  {
    id: "ayush",
    name: "Ayush",
    role: "AI/ML Developer",
    image: "/ayush.webp",
    bio: "Specializes in training deep neural networks, computer vision, natural language processing, and integrating large language models into real-time applications.",
    skills: ["Python", "PyTorch", "TensorFlow", "NLP", "LLMs & RAG"],
    icon: Cpu,
    socials: {
      github: "https://github.com/leuwenhoek",
      linkedin: "https://www.linkedin.com/in/leuwenhoek/",
      hoollow: "https://www.hoollow.com/u/leuwenhoek",
    },
  },
  {
    id: "aarush",
    name: "Aarush",
    role: "Web Developer",
    image: "/aarush.jpg",
    bio: "Specializes in building modern front-end interfaces, single-page web applications, immersive layouts, performance optimization, and responsive design systems.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    icon: Terminal,
    socials: {
      github: "https://github.com/weakestcatguy",
      instagram: "https://instagram.com/weakestcatguy",
      hoollow: "https://www.hoollow.com/u/weakestcatguy",
    },
  },
];

export default function AboutDeveloper() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-zinc-50 border-t border-b border-zinc-100 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[250px] bg-zinc-200/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-zinc-100/55 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-zinc-400">
              Core Architecture Team
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6"
          >
            Meet the <span className="font-light text-zinc-400">Developers</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-zinc-500 font-light leading-relaxed text-base"
          >
            The engineering minds behind SpaceY. We design, build, and deploy the interactive features and systems that power your journey beyond.
          </motion.p>
        </div>

        {/* Developers Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto"
        >
          {developers.map((dev) => {
            const DevIcon = dev.icon;
            return (
              <motion.div
                key={dev.id}
                variants={cardVariants}
                className="group bg-white border border-zinc-200/60 p-8 md:p-10 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-zinc-300 transition-all duration-500 relative flex flex-col items-center text-center overflow-hidden"
              >
                {/* Accent top gradient indicator bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                {/* Profile Photo */}
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-50 mb-6 bg-zinc-100 shadow-[0_8px_24px_rgba(0,0,0,0.04)] group-hover:scale-105 transition-transform duration-500">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dev.image}
                    alt={dev.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Identity Info */}
                <div className="mb-4">
                  <div className="inline-flex items-center gap-1.5 text-zinc-400 mb-1.5">
                    <DevIcon className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase font-mono tracking-widest font-semibold">{dev.id}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 tracking-tight group-hover:text-black transition-colors">
                    {dev.name}
                  </h3>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mt-1">
                    {dev.role}
                  </p>
                </div>

                {/* Biography */}
                <p className="text-zinc-500 font-light text-sm leading-relaxed mb-6 max-w-sm flex-grow">
                  {dev.bio}
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-sm">
                  {dev.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-medium px-3.5 py-1.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/50 rounded-full text-zinc-600 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-zinc-100 w-full justify-center">
                  {dev.socials.github && (
                    <a
                      href={dev.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full border border-zinc-200/80 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-300"
                      aria-label={`${dev.name}'s GitHub`}
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {dev.socials.linkedin && (
                    <a
                      href={dev.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full border border-zinc-200/80 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-300"
                      aria-label={`${dev.name}'s LinkedIn`}
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {dev.socials.instagram && (
                    <a
                      href={dev.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full border border-zinc-200/80 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-300"
                      aria-label={`${dev.name}'s Instagram`}
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                  )}
                  {dev.socials.hoollow && (
                    <a
                      href={dev.socials.hoollow}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full border border-zinc-200/80 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-300"
                      aria-label={`${dev.name}'s Hoollow`}
                    >
                      <HoollowIcon className="w-4 h-4" />
                    </a>
                  )}
                  {dev.socials.email && (
                    <a
                      href={`mailto:${dev.socials.email}`}
                      className="p-2.5 rounded-full border border-zinc-200/80 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-300"
                      aria-label={`Email ${dev.name}`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
