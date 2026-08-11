import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BLOG_POSTS, getBlogPostBySlug } from '@/lib/data/blog';
import { ArrowLeft, Clock, Share2 } from 'lucide-react';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogDetailPage({ params }: BlogPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const related = BLOG_POSTS.filter((b) => b.slug !== post.slug);

  return (
    <div className="relative min-h-screen bg-pandur-bg pt-32 pb-24">
      {/* Back to Blog */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-pandur-creamMuted hover:text-pandur-accent transition-colors"
        >
          <ArrowLeft size={16} />
          <span>BACK TO FLAVOUR JOURNAL</span>
        </Link>
      </div>

      {/* Article Hero Header */}
      <article className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-4 text-xs font-display font-bold uppercase tracking-wider text-pandur-accent mb-4">
          <span>{post.category}</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-pandur-creamMuted">
            <Clock size={14} />
            {post.readTime}
          </span>
          <span>•</span>
          <span className="text-pandur-creamMuted">{post.date}</span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl text-pandur-cream uppercase tracking-tight leading-tight mb-8">
          {post.title}
        </h1>

        <div className="flex items-center justify-between pb-8 mb-8 border-b border-pandur-border/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pandur-accent/20 border border-pandur-accent flex items-center justify-center font-display font-bold text-pandur-accent text-sm">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <p className="font-sans text-sm font-bold text-pandur-cream">{post.author.name}</p>
              <p className="font-sans text-xs text-pandur-creamMuted">{post.author.role}</p>
            </div>
          </div>

          <button
            onClick={undefined}
            className="p-3 rounded-full bg-pandur-card border border-pandur-border hover:border-pandur-accent text-pandur-cream transition-colors"
            title="Share article"
          >
            <Share2 size={16} />
          </button>
        </div>

        {/* Featured Hero Visual */}
        <div className="relative w-full h-[360px] sm:h-[480px] rounded-3xl overflow-hidden mb-12 border border-pandur-border">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
        </div>

        {/* Article Content Paragraphs */}
        <div className="prose prose-invert max-w-none space-y-6 font-sans text-base sm:text-lg text-pandur-creamMuted leading-relaxed">
          {post.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </article>

      {/* Related Stories */}
      {related.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 pt-20 mt-20 border-t border-pandur-border/40">
          <h3 className="font-display font-black text-2xl text-pandur-cream uppercase tracking-tight mb-8">
            MORE FROM THE JOURNAL
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="bg-pandur-card border border-pandur-border/80 rounded-2xl p-6 hover:border-pandur-accent transition-colors"
              >
                <span className="font-display font-bold text-[10px] uppercase tracking-wider text-pandur-accent mb-2 block">
                  {rel.category}
                </span>
                <h4 className="font-display font-bold text-lg text-pandur-cream uppercase tracking-tight mb-2">
                  {rel.title}
                </h4>
                <p className="font-sans text-xs text-pandur-creamMuted line-clamp-2">
                  {rel.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
