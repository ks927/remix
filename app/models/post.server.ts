import { prisma } from "~/db.server";

export type { Post } from "@prisma/client";

export async function getPosts() {
    return prisma.post.findMany();
}

export async function getPostBySlug(slug: string) {
    return prisma.post.findUnique({ where: { slug }});
}