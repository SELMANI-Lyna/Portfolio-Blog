"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ─── Profile ──────────────────────────────────────────────────────────────────

export async function updateProfile(formData: FormData) {
  await requireAdmin();
  const name = formData.get("name") as string;
  const tagline = formData.get("tagline") as string;
  const bio = formData.get("bio") as string;
  const resumeUrl = (formData.get("resumeUrl") as string) || null;
  const socialLinksRaw = formData.get("socialLinks") as string;
  let socialLinks: { platform: string; url: string; label?: string }[] = [];
  try {
    socialLinks = JSON.parse(socialLinksRaw || "[]");
  } catch {
    socialLinks = [];
  }

  await prisma.profile.upsert({
    where: { id: "singleton" },
    update: { name, tagline, bio, resumeUrl, socialLinks },
    create: { id: "singleton", name, tagline, bio, resumeUrl, socialLinks },
  });
  revalidatePath("/");
  revalidatePath("/admin/profile");
}

// ─── Education ────────────────────────────────────────────────────────────────

export async function createEducation(formData: FormData) {
  await requireAdmin();
  const institution = formData.get("institution") as string;
  const degree = formData.get("degree") as string;
  const fieldOfStudy = formData.get("fieldOfStudy") as string;
  const startDate = new Date(formData.get("startDate") as string);
  const endDateRaw = formData.get("endDate") as string;
  const endDate = endDateRaw ? new Date(endDateRaw) : null;
  const description = (formData.get("description") as string) || null;
  const order = parseInt((formData.get("order") as string) || "0", 10);

  await prisma.education.create({
    data: { institution, degree, fieldOfStudy, startDate, endDate, description, order },
  });
  revalidatePath("/");
  redirect("/admin/education");
}

export async function updateEducation(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const institution = formData.get("institution") as string;
  const degree = formData.get("degree") as string;
  const fieldOfStudy = formData.get("fieldOfStudy") as string;
  const startDate = new Date(formData.get("startDate") as string);
  const endDateRaw = formData.get("endDate") as string;
  const endDate = endDateRaw ? new Date(endDateRaw) : null;
  const description = (formData.get("description") as string) || null;
  const order = parseInt((formData.get("order") as string) || "0", 10);

  await prisma.education.update({
    where: { id },
    data: { institution, degree, fieldOfStudy, startDate, endDate, description, order },
  });
  revalidatePath("/");
  redirect("/admin/education");
}

export async function deleteEducation(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.education.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/education");
}

// ─── Currently Status ─────────────────────────────────────────────────────────

export async function updateCurrentlyStatus(formData: FormData) {
  await requireAdmin();
  const text = formData.get("text") as string;
  await prisma.currentlyStatus.upsert({
    where: { id: "singleton" },
    update: { text },
    create: { id: "singleton", text },
  });
  revalidatePath("/");
  revalidatePath("/admin/currently");
}

// ─── Contact Info ─────────────────────────────────────────────────────────────

export async function updateContactInfo(formData: FormData) {
  await requireAdmin();
  const email = formData.get("email") as string;
  const linksRaw = formData.get("links") as string;
  let links: { label: string; url: string }[] = [];
  try {
    links = JSON.parse(linksRaw || "[]");
  } catch {
    links = [];
  }
  await prisma.contactInfo.upsert({
    where: { id: "singleton" },
    update: { email, links },
    create: { id: "singleton", email, links },
  });
  revalidatePath("/");
  revalidatePath("/admin/contact");
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function createProject(formData: FormData) {
  await requireAdmin();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const techTagsRaw = formData.get("techTags") as string;
  const techTags = techTagsRaw.split(",").map((t) => t.trim()).filter(Boolean);
  const statsRaw = formData.get("stats") as string;
  let stats: { label: string; value: string }[] = [];
  try { stats = JSON.parse(statsRaw || "[]"); } catch { stats = []; }
  const liveUrl = (formData.get("liveUrl") as string) || null;
  const repoUrl = (formData.get("repoUrl") as string) || null;
  const coverImage = (formData.get("coverImage") as string) || null;
  const order = parseInt(formData.get("order") as string || "0", 10);

  await prisma.project.create({
    data: { title, description, techTags, stats, liveUrl, repoUrl, coverImage, order },
  });
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const techTagsRaw = formData.get("techTags") as string;
  const techTags = techTagsRaw.split(",").map((t) => t.trim()).filter(Boolean);
  const statsRaw = formData.get("stats") as string;
  let stats: { label: string; value: string }[] = [];
  try { stats = JSON.parse(statsRaw || "[]"); } catch { stats = []; }
  const liveUrl = (formData.get("liveUrl") as string) || null;
  const repoUrl = (formData.get("repoUrl") as string) || null;
  const coverImage = (formData.get("coverImage") as string) || null;
  const order = parseInt(formData.get("order") as string || "0", 10);

  await prisma.project.update({
    where: { id },
    data: { title, description, techTags, stats, liveUrl, repoUrl, coverImage, order },
  });
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

// ─── Certificates ─────────────────────────────────────────────────────────────

export async function createCertificate(formData: FormData) {
  await requireAdmin();
  const title = formData.get("title") as string;
  const issuer = formData.get("issuer") as string;
  const dateIssued = new Date(formData.get("dateIssued") as string);
  const credentialUrl = (formData.get("credentialUrl") as string) || null;
  const fileUrl = (formData.get("fileUrl") as string) || null;
  const order = parseInt(formData.get("order") as string || "0", 10);

  await prisma.certificate.create({ data: { title, issuer, dateIssued, credentialUrl, fileUrl, order } });
  revalidatePath("/");
  redirect("/admin/certificates");
}

export async function updateCertificate(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const issuer = formData.get("issuer") as string;
  const dateIssued = new Date(formData.get("dateIssued") as string);
  const credentialUrl = (formData.get("credentialUrl") as string) || null;
  const fileUrl = (formData.get("fileUrl") as string) || null;
  const order = parseInt(formData.get("order") as string || "0", 10);

  await prisma.certificate.update({ where: { id }, data: { title, issuer, dateIssued, credentialUrl, fileUrl, order } });
  revalidatePath("/");
  redirect("/admin/certificates");
}

export async function deleteCertificate(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.certificate.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/certificates");
}

// ─── Internships ──────────────────────────────────────────────────────────────

export async function createInternship(formData: FormData) {
  await requireAdmin();
  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const startDate = new Date(formData.get("startDate") as string);
  const endDateRaw = formData.get("endDate") as string;
  const endDate = endDateRaw ? new Date(endDateRaw) : null;
  const description = formData.get("description") as string;
  const url = (formData.get("url") as string) || null;
  const order = parseInt(formData.get("order") as string || "0", 10);

  await prisma.internship.create({ data: { company, role, startDate, endDate, description, url, order } });
  revalidatePath("/");
  redirect("/admin/internships");
}

export async function updateInternship(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const startDate = new Date(formData.get("startDate") as string);
  const endDateRaw = formData.get("endDate") as string;
  const endDate = endDateRaw ? new Date(endDateRaw) : null;
  const description = formData.get("description") as string;
  const url = (formData.get("url") as string) || null;
  const order = parseInt(formData.get("order") as string || "0", 10);

  await prisma.internship.update({ where: { id }, data: { company, role, startDate, endDate, description, url, order } });
  revalidatePath("/");
  redirect("/admin/internships");
}

export async function deleteInternship(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.internship.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/internships");
}

// ─── Skills ───────────────────────────────────────────────────────────────────

export async function createSkillGroup(formData: FormData) {
  await requireAdmin();
  const name = formData.get("name") as string;
  const order = parseInt(formData.get("order") as string || "0", 10);
  await prisma.skillGroup.create({ data: { name, order } });
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function deleteSkillGroup(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.skillGroup.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function addSkill(formData: FormData) {
  await requireAdmin();
  const name = formData.get("name") as string;
  const skillGroupId = formData.get("skillGroupId") as string;
  await prisma.skill.create({ data: { name, skillGroupId } });
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function deleteSkill(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export async function createBlogPost(formData: FormData) {
  await requireAdmin();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const body = formData.get("body") as string;
  const imagesRaw = formData.get("images") as string;
  const images: string[] = imagesRaw ? imagesRaw.split("\n").map(s => s.trim()).filter(Boolean) : [];
  const pdfsRaw = formData.get("pdfs") as string;
  let pdfs: { name: string; url: string }[] = [];
  try { pdfs = JSON.parse(pdfsRaw || "[]"); } catch { pdfs = []; }
  const linksRaw = formData.get("links") as string;
  let links: { label: string; url: string }[] = [];
  try { links = JSON.parse(linksRaw || "[]"); } catch { links = []; }
  const published = formData.get("published") === "on";

  // Generate unique slug from title
  const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const existing = await prisma.blogPost.count({ where: { slug: { startsWith: baseSlug } } });
  const slug = existing === 0 ? baseSlug : `${baseSlug}-${existing}`;

  await prisma.blogPost.create({ data: { title, slug, description, body, images, pdfs, links, published } });
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const body = formData.get("body") as string;
  const imagesRaw = formData.get("images") as string;
  const images: string[] = imagesRaw ? imagesRaw.split("\n").map(s => s.trim()).filter(Boolean) : [];
  const pdfsRaw = formData.get("pdfs") as string;
  let pdfs: { name: string; url: string }[] = [];
  try { pdfs = JSON.parse(pdfsRaw || "[]"); } catch { pdfs = []; }
  const linksRaw = formData.get("links") as string;
  let links: { label: string; url: string }[] = [];
  try { links = JSON.parse(linksRaw || "[]"); } catch { links = []; }
  const published = formData.get("published") === "on";

  await prisma.blogPost.update({ where: { id }, data: { title, description, body, images, pdfs, links, published } });
  revalidatePath("/blog");
  revalidatePath(`/blog`);
  redirect("/admin/blog");
}

export async function deleteBlogPost(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}
