import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const post = await prisma.blogPost.update({
      where: { slug },
      data: { likeCount: { increment: 1 } },
      select: { likeCount: true },
    });
    return NextResponse.json({ likeCount: post.likeCount });
  } catch {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
}
