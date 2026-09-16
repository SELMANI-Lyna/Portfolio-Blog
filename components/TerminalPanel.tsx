"use client";

import { motion } from "framer-motion";

interface TerminalPanelProps {
  name?: string;
  role?: string;
  focus?: string[];
  stack?: string[];
  currentlyLearning?: boolean;
  availableForInternship?: boolean;
}

export function TerminalPanel({
  name = "developer",
  role = "Cybersecurity Student & Full-Stack Developer",
  focus = ["Infrastructure Security", "IPC Security", "Full-Stack Dev"],
  stack = ["Next.js", "PostgreSQL", "Prisma", "TypeScript", "Tailwind CSS"],
  currentlyLearning = true,
  availableForInternship = true,
}: TerminalPanelProps) {
  const safeIdentifier = name.toLowerCase().replace(/[^a-z0-9_]/g, "") || "profile";

  const lines = [
    { type: "header", text: `const ${safeIdentifier} = {` },
    { type: "prop-string", key: "role", value: `'${role}'` },
    { type: "prop-array", key: "focus", value: focus },
    { type: "prop-array", key: "stack", value: stack.slice(0, 5) },
    { type: "prop-bool", key: "currentlyLearning", value: String(currentlyLearning) },
    { type: "prop-bool", key: "availableForInternship", value: String(availableForInternship) },
    { type: "footer", text: `};` },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="w-full max-w-lg rounded-2xl md:rounded-3xl bg-[#1C1B20] text-[#FAFAFC] border border-white/10 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
      {/* Top Bar */}
      <div className="flex items-center px-4 py-3 bg-[#17161A] border-b border-white/10">
        <div className="flex items-center gap-2">
          {/* Custom three-dot controls using palette: berry-600, lav-500, grey-400 */}
          <span className="w-3 h-3 rounded-full bg-berry-600 inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-lav-500 inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-grey-400 inline-block shadow-sm" />
        </div>
      </div>

      {/* Editor Body */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-5 sm:p-6 space-y-2 overflow-x-auto leading-relaxed selection:bg-berry-800 selection:text-white"
      >
        {lines.map((line, index) => {
          if (line.type === "header") {
            return (
              <motion.div key={index} variants={lineVariants} className="text-grey-400">
                <span className="text-berry-400 font-semibold">const</span>{" "}
                <span className="text-lav-300 font-semibold">{safeIdentifier}</span>{" "}
                <span className="text-grey-400">=</span> <span className="text-grey-400">&#123;</span>
              </motion.div>
            );
          }

          if (line.type === "footer") {
            return (
              <motion.div key={index} variants={lineVariants} className="text-grey-400">
                <span>&#125;;</span>
              </motion.div>
            );
          }

          if (line.type === "prop-string") {
            return (
              <motion.div key={index} variants={lineVariants} className="pl-4 sm:pl-6 text-grey-400">
                <span className="text-berry-200">{line.key}</span>
                <span className="text-grey-400">: </span>
                <span className="text-lav-300">{line.value}</span>
                <span className="text-grey-400">,</span>
              </motion.div>
            );
          }

          if (line.type === "prop-array") {
            const arr = line.value as string[];
            return (
              <motion.div key={index} variants={lineVariants} className="pl-4 sm:pl-6 text-grey-400">
                <span className="text-berry-200">{line.key}</span>
                <span className="text-grey-400">: [</span>
                <span className="text-lav-300">
                  {arr.map((item, idx) => (
                    <span key={idx}>
                      '{item}'{idx < arr.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </span>
                <span className="text-grey-400">],</span>
              </motion.div>
            );
          }

          if (line.type === "prop-bool") {
            return (
              <motion.div key={index} variants={lineVariants} className="pl-4 sm:pl-6 text-grey-400">
                <span className="text-berry-200">{line.key}</span>
                <span className="text-grey-400">: </span>
                <span className="text-berry-400 font-semibold">{line.value}</span>
                <span className="text-grey-400">,</span>
              </motion.div>
            );
          }

          return null;
        })}
      </motion.div>
    </div>
  );
}
