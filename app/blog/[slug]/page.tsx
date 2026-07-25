import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/posts";
import ArticleView from "@/components/ArticleView";
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post ? `${post.title} — مشعل الفيصل` : "مقال" };
}
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return <ArticleView post={post} />;
}
