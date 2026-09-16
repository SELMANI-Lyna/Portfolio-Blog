"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: any;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  onClick?: () => void;
  [key: string]: any;
}

export function MagneticButton({ 
  children, 
  className = "", 
  as: Component = "button",
  ...props 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouse = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const element = ref.current;
    if (!element) return;
    
    const { height, width, left, top } = element.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    setPosition({ x: middleX * 0.25, y: middleY * 0.35 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
