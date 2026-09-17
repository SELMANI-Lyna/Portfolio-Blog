import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { CursorGlow } from "@/components/CursorGlow";
import { HeroMatrix } from "@/components/HeroMatrix";
import { SocialIcons } from "@/components/SocialIcons";
import { MagneticButton } from "@/components/MagneticButton";
import { WorkSection } from "@/components/WorkSection";
import { CertificatesCarousel } from "@/components/CertificatesCarousel";
import { ExperienceSection, EducationSection } from "@/components/TimelineSection";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import { Download } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const profile = await prisma.profile.findUnique({
    where: { id: "singleton" },
  });

  const currentlyStatus = await prisma.currentlyStatus.findUnique({
    where: { id: "singleton" },
  });

  const contactInfo = await prisma.contactInfo.findUnique({
    where: { id: "singleton" },
  });

  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  const certificates = await prisma.certificate.findMany({
    orderBy: { order: "asc" },
  });

  const internships = await prisma.internship.findMany({
    orderBy: { order: "asc" },
  });

  const educationList = prisma.education
    ? await prisma.education.findMany({
        orderBy: { order: "asc" },
      })
    : [];

  const skillGroups = await prisma.skillGroup.findMany({
    orderBy: { order: "asc" },
    include: { skills: true },
  });

  // Calculate Last Updated
  const dates = [
    profile?.updatedAt,
    currentlyStatus?.updatedAt,
    contactInfo?.updatedAt,
  ].filter(Boolean) as Date[];

  const lastUpdated =
    dates.length > 0
      ? new Date(Math.max(...dates.map((d) => d.getTime())))
      : new Date();

  const formattedDate = lastUpdated.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full min-h-screen bg-bone text-ink font-body selection:bg-lav-300">
      {/* Top Navigation */}
      <Navbar name={profile?.name || "Portfolio"} />

      <main className="w-full space-y-24 md:space-y-32 pb-24">
        {/* 1. Intro / Hero */}
        <section id="intro" className="w-full relative overflow-hidden py-12 md:py-20">
          <CursorGlow isFullBleed={true} />
          <HeroMatrix />

          <div className="max-w-[1100px] px-6 md:px-10 relative z-10 space-y-6">
            <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-ink">
              {profile?.name || "Lily"}
            </h1>
            <h2 className="text-2xl text-muted font-medium">
              {profile?.tagline || "Cybersecurity Student & Full-Stack Developer"}
            </h2>
            <p className="text-lg leading-relaxed text-ink/80 max-w-2xl">
              {profile?.bio ||
                "Building secure, resilient systems with modern web architectures and focused on security research."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <MagneticButton
                as="a"
                href="#contact"
                className="px-6 py-3 rounded-full bg-berry-800 text-white font-medium hover:bg-berry-600 transition-colors shadow-sm"
              >
                Contact Me
              </MagneticButton>
              <MagneticButton
                as="a"
                href="#projects"
                className="px-6 py-3 rounded-full border border-line bg-white/70 hover:bg-white hover:border-lav-300 transition-colors text-ink font-medium shadow-xs"
              >
                View Projects
              </MagneticButton>
              {profile?.resumeUrl && (
                <MagneticButton
                  as="a"
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="px-5 py-3 rounded-full border border-line bg-white/70 hover:bg-white hover:border-lav-300 transition-colors text-ink font-medium shadow-xs flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-berry-600" />
                  <span>Get Resume</span>
                </MagneticButton>
              )}
            </div>

            {/* Social Icon Links */}
            {profile?.socialLinks && <SocialIcons links={profile.socialLinks} />}

            {/* Last updated Badge */}
            <div className="flex items-center gap-2 pt-4">
              <div className="w-2 h-2 rounded-full bg-lav-500 animate-pulse" />
              <span className="font-mono text-xs text-muted">
                Last updated · {formattedDate}
              </span>
            </div>
          </div>
        </section>

        {/* 2. Projects */}
        <WorkSection projects={projects} />

        {/* 3. Certifications (Window-Chrome Carousel) */}
        <CertificatesCarousel certificates={certificates} />

        {/* 4. Experience / Internships Timeline */}
        <ExperienceSection internships={internships} />

        {/* 5. Skills Auto-Scrolling Marquee */}
        <SkillsMarquee skillGroups={skillGroups} />

        {/* 6. Education Timeline */}
        <EducationSection educationList={educationList} />

        {/* 7. Currently Callout */}
        <section id="currently" className="w-full relative z-10">
          <div className="max-w-[1100px] px-6 md:px-10">
            <div className="space-y-6 bg-white p-8 md:p-12 rounded-3xl border border-line shadow-sm">
              <h3 className="font-display text-2xl font-semibold text-ink">Currently</h3>
              <p className="text-lg leading-relaxed text-ink/80 max-w-2xl">
                {currentlyStatus?.text || "Exploring IPC and distributed systems security architectures."}
              </p>
            </div>
          </div>
        </section>

        {/* 8. Contact Section */}
        <section id="contact" className="w-full relative z-10 pb-24">
          <div className="max-w-[1100px] px-6 md:px-10 space-y-6 text-left">
            <h3 className="font-display text-3xl font-semibold text-ink">Get in touch</h3>
            <p className="text-muted text-lg leading-relaxed max-w-xl">
              My inbox is always open. Whether you have a question or just want to say hi, I'll try
              my best to get back to you!
            </p>
            <div className="pt-2">
              {contactInfo?.email ? (
                <MagneticButton
                  as="a"
                  href={`mailto:${contactInfo.email}`}
                  className="px-8 py-4 rounded-full bg-ink text-white font-medium hover:bg-berry-800 transition-colors text-lg shadow-xl shadow-ink/10"
                >
                  Say Hello
                </MagneticButton>
              ) : (
                <span className="text-muted italic">No contact email added yet.</span>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
