"use client";

import { motion } from "framer-motion";
import { Card } from "./Card";
import { LinkPill } from "./LinkPill";
import type { Project } from "@prisma/client";

export function WorkSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="w-full relative z-10">
      <div className="max-w-[1100px] px-6 md:px-10 space-y-12">
        <h3 className="font-display text-3xl font-semibold text-ink">Projects</h3>

        {projects.length === 0 ? (
          <p className="text-muted italic">No projects yet.</p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {projects.map((project) => (
              <Card key={project.id} className="space-y-6">
                {project.coverImage && (
                  <div className="w-full h-48 bg-grey-400 rounded-lg overflow-hidden mb-4">
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
      </div>
    </section>
  );
}
