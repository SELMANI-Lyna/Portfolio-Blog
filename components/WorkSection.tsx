"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./Card";
import { LinkPill } from "./LinkPill";
import type { Project } from "@prisma/client";

export function WorkSection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<"SECURITY" | "BUILD">("SECURITY");

  const filteredProjects = projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="w-full relative z-10">
      <div className="max-w-[1100px] px-6 md:px-10 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <h3 className="font-display text-3xl font-semibold text-ink">Work</h3>
          
          {/* Toggle Container */}
          <div className="relative inline-flex bg-bone border border-line rounded-full p-1 self-start">
            <div className="absolute inset-0 z-0 flex items-center p-1 pointer-events-none">
              <motion.div
                layoutId="work-toggle"
                className="h-full w-1/2 rounded-full"
                style={{
                  background: "linear-gradient(120deg, var(--color-berry-800), var(--color-berry-600), var(--color-lav-500))"
                }}
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                animate={{
                  x: filter === "SECURITY" ? "0%" : "100%",
                }}
              />
            </div>
            
            <button
              onClick={() => setFilter("SECURITY")}
              className={`relative z-10 px-6 py-2 rounded-full font-medium text-sm transition-colors duration-200 ${
                filter === "SECURITY" ? "text-white" : "text-muted hover:text-ink"
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setFilter("BUILD")}
              className={`relative z-10 px-6 py-2 rounded-full font-medium text-sm transition-colors duration-200 ${
                filter === "BUILD" ? "text-white" : "text-muted hover:text-ink"
              }`}
            >
              Build
            </button>
          </div>
        </div>

        <motion.div layout className="min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="text-muted italic"
              >
                No projects in this category yet.
              </motion.p>
            ) : (
              <motion.div
                key={filter}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="space-y-6">
                    {project.coverImage && (
                      <div className="w-full h-48 bg-grey-400 rounded-lg overflow-hidden mb-4">
                        {/* Using a standard img tag for simplicity, you can switch to next/image if configured */}
                        <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-display text-xl font-semibold text-ink mb-2">{project.title}</h4>
                      <p className="text-muted leading-relaxed text-sm">{project.description}</p>
                    </div>
                    
                    {project.techTags && project.techTags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.techTags.map((tag) => (
                          <span key={tag} className="font-mono text-xs bg-berry-50 text-berry-800 px-2.5 py-1 rounded-full transition-colors group-hover:bg-lav-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {(project.liveUrl || project.repoUrl) && (
                      <div className="flex flex-wrap gap-3 mt-auto pt-4">
                        {project.liveUrl && <LinkPill href={project.liveUrl}>Live Site</LinkPill>}
                        {project.repoUrl && <LinkPill href={project.repoUrl}>GitHub</LinkPill>}
                      </div>
                    )}
                  </Card>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
