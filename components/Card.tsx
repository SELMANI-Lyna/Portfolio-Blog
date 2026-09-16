"use client";

import { ReactNode } from "react";
import { CursorGlow } from "./CursorGlow";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`
        relative overflow-hidden
        bg-white rounded-[16px] border border-line
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        hover:border-lav-300
        ${className}
      `}
    >
      <CursorGlow isFullBleed={false} />
      <div className="relative z-10 p-6 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
