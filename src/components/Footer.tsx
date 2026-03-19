"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-lg font-bold tracking-tight text-foreground">
              md<span className="text-gradient">syakir</span>
            </span>
            <span className="text-xs text-muted font-mono">
              &copy; {year}
            </span>
          </motion.div>

          {/* Center */}
          <motion.p
            className="text-xs text-muted font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Designed & Built by Muhammad Syakir
          </motion.p>

          {/* Right - Location & Time */}
          <motion.div
            className="flex items-center gap-3 text-xs text-muted font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span>Singapore</span>
            <span className="w-1 h-1 rounded-full bg-accent" />
            <span>
              {new Date().toLocaleTimeString("en-SG", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Singapore",
              })}
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
