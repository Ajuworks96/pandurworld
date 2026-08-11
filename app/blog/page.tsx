import Image from 'next/image';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/data/blog';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stories & Craft | Pandur World',
  description: 'Deep dives into 36-hour dough maturation, single-origin cacao sourcing, and culinary pairings.',
};

export default function BlogPage() {
  const featuredPost = BLOG_POSTS.find((b) => b.featured) || BLOG_POSTS[0];
  const remainingPosts = BLOG_POSTS.filter((b) => b.id !== featuredPost.id);

  return (
    <div className="relative min-h-screen bg-pandur-bg pt-32 pb-24">
      {/* Header */}
      <div className="max-w-8xl mx-auto px-6 md:px-12 mb-16 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-pandur-accent mb-4">
          <span>JOURNAL & STORIES</span>
        </div>
        <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-pandur-cream uppercase tracking-tighter leading-none mb-6">
          FLAVOUR <span className="text-pandur-accent italic">JOURNAL.</span>
        </h1>
        <p className="font-sans text-base sm:text-lg text-pandur-creamMuted max-w-2xl leading-relaxed">
          Deep dives into baking chemistry, cocoa sourcing, Sommelier beverage pairings, and behind-the-scenes atelier notes.
        </p>
      </div>

      {/* Featured Article Card */}
      <div className="max-w-8xl mx-auto px-6 md:px-12 mb-20">
        <Link
          href={`/blog/${featuredPost.slug}`}
          className="group grid grid-cols-1 lg:grid-cols-12 gap-8 bg-pandur-card border border-pandur-border/80 rounded-3xl p-6 sm:p-10 hover:border-pandur-accent/60 transition-all duration-500"
          data-cursor="READ"
        >
          <div className="lg:col-span-7 relative h-[300px] sm:h-[420px] rounded-2xl overflow-hidden">
            <Image
              src={featuredPost.heroImage}
              alt={featuredPost.title}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between py-4">
            <div>
              <div className="flex items-center gap-4 text-xs font-display font-bold uppercase tracking-wider text-pandur-accent mb-4">
                <span>{featuredPost.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-pandur-creamMuted">
                  <Clock size={14} />
                  {featuredPost.readTime}
                </span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl text-pandur-cream uppercase tracking-tight leading-tight group-hover:text-pandur-accent transition-colors mb-4">
                {featuredPost.title}
              </h2>

              <p className="font-sans text-sm text-pandur-creamMuted leading-relaxed mb-6">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-pandur-border/60">
              <div className="flex items-center gap-3">
                <span className="font-sans text-xs text-pandur-cream font-medium">
                  {featuredPost.author.name}
                </span>
                <span className="text-xs text-pandur-creamMuted">• {featuredPost.date}</span>
              </div>

              <span className="inline-flex items-center gap-1 font-display font-bold text-xs uppercase tracking-wider text-pandur-accent group-hover:translate-x-1 transition-transform">
                READ STORY <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Grid of Remaining Articles */}
      <div className="max-w-8xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {remainingPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group bg-pandur-card border border-pandur-border/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-pandur-accent/60 transition-all duration-300"
            data-cursor="READ"
          >
            <div className="relative w-full h-[220px] rounded-2xl overflow-hidden mb-6">
              <Image
                src={post.heroImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div>
              <div className="flex items-center gap-3 text-xs font-display font-bold uppercase tracking-wider text-pandur-accent mb-3">
                <span>{post.category}</span>
                <span>•</span>
                <span className="text-pandur-creamMuted">{post.readTime}</span>
              </div>

              <h3 className="font-display font-black text-2xl text-pandur-cream uppercase tracking-tight group-hover:text-pandur-accent transition-colors mb-3">
                {post.title}
              </h3>

              <p className="font-sans text-xs text-pandur-creamMuted leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-pandur-border/60 flex items-center justify-between text-xs font-sans text-pandur-creamMuted">
              <span>{post.date}</span>
              <span className="font-display font-bold text-pandur-accent group-hover:translate-x-1 transition-transform flex items-center gap-1">
                READ <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
