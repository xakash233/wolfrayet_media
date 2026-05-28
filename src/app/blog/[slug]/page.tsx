import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
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

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");

  return (
    <article className="pt-24">
      <div className="relative h-[40vh] min-h-[300px] w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <AnimatedSection className="!pt-8">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          {post.category}
        </span>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{post.title}</h1>

        <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {post.author}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </span>
        </div>

        <div className="prose prose-lg dark:prose-invert mt-10 max-w-none">
          {paragraphs.map((paragraph, index) => {
            if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
              return (
                <h2 key={index} className="mt-8 text-2xl font-bold">
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
              <p key={index} className="mt-4 text-muted-foreground leading-relaxed">
                {paragraph.replace(/\*\*/g, "")}
              </p>
            );
          })}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <NewsletterSignup />
      </AnimatedSection>
    </article>
  );
}
