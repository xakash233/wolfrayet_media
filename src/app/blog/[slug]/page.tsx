import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { getBlogPosts, getBlogPostBySlug } from "@/data/blog";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");

  return (
    <article>
      <Hero
        title={post.title}
        subtitle={post.excerpt}
        imageSrc={post.image}
        imageAlt={post.title}
        showCta={false}
        compact
        hideEyebrow
      />

      <AnimatedSection compact>
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
            Back to Blog
          </Link>
        </Button>

        <span className="type-eyebrow text-primary">{post.category}</span>

        <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <User className="h-4 w-4" aria-hidden />
            {post.author}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" aria-hidden />
            {post.date}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" aria-hidden />
            {post.readTime}
          </span>
        </div>

        <div className="prose prose-lg dark:prose-invert mt-10 max-w-none">
          {paragraphs.map((paragraph, index) => {
            if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
              return (
                <h2 key={index} className="type-h3 mt-8">
                  {paragraph.replace(/\*\*/g, "")}
                </h2>
              );
            }
            if (paragraph.startsWith("- ")) {
              const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul key={index} className="mt-4 list-disc space-y-2 pl-6">
                  {items.map((item, i) => (
                    <li key={i}>{item.replace(/^- /, "").replace(/\*\*/g, "")}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index} className="mt-4 leading-relaxed text-muted-foreground">
                {paragraph.replace(/\*\*/g, "")}
              </p>
            );
          })}
        </div>
      </AnimatedSection>

      <AnimatedSection compact>
        <NewsletterSignup />
      </AnimatedSection>
    </article>
  );
}
