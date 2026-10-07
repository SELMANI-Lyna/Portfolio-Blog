import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { WorkSection } from "@/components/WorkSection";
import { CertificatesCarousel } from "@/components/CertificatesCarousel";
import { ExperienceSection, EducationSection } from "@/components/TimelineSection";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import { MagneticButton } from "@/components/MagneticButton";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Mail, Key } from "lucide-react";
import Link from "next/link";
import { fmtDate } from "@/lib/blog";

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

  const educationList = await prisma.education.findMany({
    orderBy: { order: "asc" },
  });

  const skillGroups = await prisma.skillGroup.findMany({
    orderBy: { order: "asc" },
    include: { skills: true },
  });

  const latestBlogPosts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      createdAt: true,
      images: true,
      likeCount: true,
    },
  });

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
    <div className="th-page relative min-h-screen w-full overflow-x-hidden">
      <GridBackdrop />
      <Navbar name={profile?.name || "Lyna Selmani"} />

      <main className="relative z-10 w-full space-y-16 pb-24 md:space-y-24">
        <div className="w-full px-5 sm:px-8 lg:px-14 xl:px-20">
          <HeroSection profile={profile} formattedDate={formattedDate} />
        </div>

        <div className="w-full px-5 sm:px-8 lg:px-14 xl:px-20">
          <WorkSection projects={projects} />
        </div>

        <div className="w-full px-5 sm:px-8 lg:px-14 xl:px-20">
          <CertificatesCarousel certificates={certificates} />
        </div>

        <div className="w-full px-5 sm:px-8 lg:px-14 xl:px-20">
          <ExperienceSection internships={internships} />
        </div>

        <div className="w-full px-5 sm:px-8 lg:px-14 xl:px-20">
          <SkillsMarquee skillGroups={skillGroups} />
        </div>

        <div className="w-full px-5 sm:px-8 lg:px-14 xl:px-20">
          <EducationSection educationList={educationList} />
        </div>

        {latestBlogPosts.length > 0 && (
          <div className="w-full px-5 sm:px-8 lg:px-14 xl:px-20">
            <section className="relative z-10 w-full">
              <div className="mb-6 flex items-center justify-between gap-3">
                <h3 className="th-fg font-display text-3xl font-semibold tracking-tight">
                  Latest posts
                </h3>
                <Link href="/blog" className="th-accent-link font-mono text-xs">
                  View all →
                </Link>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {latestBlogPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--panel)] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-line)]"
                  >
                    {post.images[0] && (
                      <div className="h-44 overflow-hidden border-b border-[var(--line)]">
                        <img
                          src={post.images[0]}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                    )}
                    <div className="space-y-3 p-5">
                      <p className="th-dim font-mono text-[11px]">{fmtDate(post.createdAt)}</p>
                      <h4 className="th-fg font-display text-2xl font-semibold transition-colors group-hover:text-[var(--accent)]">
                        {post.title}
                      </h4>
                      <p className="th-dim text-sm leading-relaxed">{post.description}</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="th-dim font-mono text-[11px]">♥ {post.likeCount}</span>
                        <span className="th-accent-link font-mono text-[11px]">Read</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        )}

        <div className="w-full px-5 sm:px-8 lg:px-14 xl:px-20">
          <section id="currently" className="relative z-10 w-full py-4">
            <div className="th-panel relative overflow-hidden rounded-3xl p-8 shadow-[0_12px_35px_rgba(15,23,42,0.05)] md:p-10">
              <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[var(--accent-soft)] blur-3xl" />

              <div className="mb-4 flex flex-col justify-between gap-4 border-b border-[var(--line)] pb-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-500" />
                  <h3 className="th-fg font-display text-2xl font-semibold">Active Focus</h3>
                </div>
                <span className="th-chip rounded-full px-3 py-1 font-mono text-[11px]">
                  ESTIN Lab · 4th Year CS
                </span>
              </div>

              <p className="th-dim max-w-2xl text-lg leading-relaxed">
                {currentlyStatus?.text ||
                  "Splitting time between coursework, freelance dev projects, and exploring infrastructure/IPC security more deeply. Open to internship opportunities where security and engineering overlap."}
              </p>
            </div>
          </section>
        </div>

        <div className="w-full px-5 sm:px-8 lg:px-14 xl:px-20">
          <section id="contact" className="relative z-10 w-full pb-24">
            <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-8 text-[var(--fg)] shadow-[0_20px_50px_rgba(15,23,42,0.08)] md:p-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[var(--accent-soft)] blur-3xl" />

              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)]/70" />
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--dim)]" />
                  <span className="ml-2 font-mono text-[11px] text-[var(--dim)]">
                    secure_channel://dispatch
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-500">
                  <Key className="h-3.5 w-3.5" />
                  <span>PGP ENCRYPTED COMMUNICATIONS WELCOME</span>
                </div>
              </div>

              <div className="max-w-2xl space-y-3">
                <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  Let's engineer something resilient.
                </h3>
                <p className="text-base leading-relaxed text-[var(--fg-2)] sm:text-lg">
                  Looking for cybersecurity research internships, full-stack software development roles, or technical collaborations. My inbox is always monitored.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 pt-4">
                {contactInfo?.email ? (
                  <MagneticButton
                    as="a"
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-2.5 rounded-full bg-[var(--accent)] px-8 py-4 text-base font-medium text-white shadow-[0_10px_20px_rgba(37,99,235,0.28)] transition-all hover:brightness-110 sm:text-lg"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send Encrypted Email</span>
                  </MagneticButton>
                ) : (
                  <MagneticButton
                    as="a"
                    href="mailto:l_selmani@estin.dz"
                    className="flex items-center gap-2.5 rounded-full bg-[var(--accent)] px-8 py-4 text-base font-medium text-white shadow-[0_10px_20px_rgba(37,99,235,0.28)] transition-all hover:brightness-110 sm:text-lg"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send Email (l_selmani@estin.dz)</span>
                  </MagneticButton>
                )}

                <a
                  href="https://github.com/SELMANI-Lyna"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--line)] bg-[var(--hover-bg)] px-6 py-4 font-mono text-sm text-[var(--fg)] transition-all hover:border-[var(--accent-line)] hover:bg-[var(--accent-soft)]"
                >
                  github.com/SELMANI-Lyna
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
