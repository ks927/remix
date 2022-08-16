import React from 'react';
import PostSlug from '~/routes/posts/$slug';
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPostBySlug } from '~/models/post.server';
import invariant from "tiny-invariant";
import type { Post } from "~/models/post.server";
import { marked } from "marked";

type LoaderData = {
    post: Post,
    html: string
}

export const loader: LoaderFunction = async ({ params }) => {
    invariant(params.slug, `params.slug is required`);

    const post = await getPostBySlug(params.slug);
    invariant(post, `Post not found: ${params.slug}`);

    const html = marked(post.markdown);
    return json<LoaderData>({ post, html });
}

export default function AdminPostSlug() {
    return <PostSlug />
}