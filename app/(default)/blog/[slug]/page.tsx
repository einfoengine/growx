import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POST_SLUGS, getBlogPost, getBlogPosts } from "@/lib/content";
import BlogPostPage from "@/components/templates/BlogPage/BlogPostPage";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BLOG_POST_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
      type: "article",
    },
  };
}

export default async function BlogPostRoute({ params }: Params) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getBlogPost(slug), getBlogPosts()]);
  if (!post) notFound();

  const related = all.filter((p) => p.slug !== slug).slice(0, 3);

  return <BlogPostPage post={post} related={related} />;
}
