"use client";

import { ArrowUpRight } from "lucide-react";

export default function LiveProjectButton() {
  return (
    <button className="group flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 hover:border-[#C9A96E]/50 transition-all duration-300">
      Live Project
      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
    </button>
  );
}
