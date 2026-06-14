"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

export default function Hero() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 1. Load YouTube Iframe API if not already loaded
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    let timeoutId: NodeJS.Timeout;

    const initPlayer = () => {
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player("youtube-player", {
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          loop: 1,
          start: 9,
          end: 80,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          playlist: "1ZT6yWl3LPM",
        },
        events: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onReady: (event: any) => {
            event.target.mute();
            event.target.playVideo();
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onStateChange: (event: any) => {
            // Clear existing timeout
            if (loopTimeoutRef.current) {
              clearTimeout(loopTimeoutRef.current);
            }

            if (event.data === window.YT.PlayerState.PLAYING) {
              if (event.target && typeof event.target.getCurrentTime === "function") {
                const currentTime = event.target.getCurrentTime();
                const timeLeft = Math.max(0, 80 - currentTime);
                
                // Set single timeout for loop event
                loopTimeoutRef.current = setTimeout(() => {
                  event.target.seekTo(9);
                  event.target.playVideo();
                }, timeLeft * 1000);
              }
            } else if (event.data === window.YT.PlayerState.ENDED) {
              event.target.seekTo(9);
              event.target.playVideo();
            }
          },
        },
      });
    };

    const checkAndInit = () => {
      if (window.YT && window.YT.Player) {
        initPlayer();
      } else {
        timeoutId = setTimeout(checkAndInit, 100);
      }
    };

    checkAndInit();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current);
      }
      playerRef.current = null;
    };
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.querySelector("#explore");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center bg-black">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="video-background-container w-full h-full opacity-60">
          <iframe
            id="youtube-player"
            className="w-full h-full"
            src="https://www.youtube.com/embed/1ZT6yWl3LPM?enablejsapi=1&autoplay=1&mute=1&controls=0&loop=1&playlist=1ZT6yWl3LPM&start=9&end=80&playsinline=1&modestbranding=1&disablekb=1&rel=0&showinfo=0&iv_load_policy=3&fs=0"
            allow="autoplay; encrypted-media"
            title="SpaceY Hero Video"
          />
        </div>
      </div>

      {/* Cinematic Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/30 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 z-10" />

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center h-full pt-16">
        <div className="max-w-2xl text-left">
          {/* Subtle Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-8 h-[1px] bg-white/50" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-white/70 font-googleSans">
              Introducing SpaceY
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-6 font-googleSans"
          >
            Enter the World <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-zinc-400 font-googleSans">
              of Space
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed tracking-wide mb-10 max-w-xl font-googleSans"
          >
            Explore missions, discoveries, and the endless possibilities beyond Earth.
          </motion.p>

          {/* Button CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/chat"
              className="inline-flex items-center justify-center text-sm font-semibold tracking-wider uppercase text-zinc-900 bg-white border border-white px-8 py-4 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:bg-transparent hover:text-white hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 font-googleSans"
            >
              Let&apos;s talk
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={handleScrollDown}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/50 font-googleSans">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="p-1 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
