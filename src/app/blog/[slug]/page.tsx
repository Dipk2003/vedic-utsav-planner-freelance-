import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';

function renderParagraphs(content: string) {
  return content.split(/\n\n+/).map((block, idx) => (
    <p key={idx} className="text-muted-foreground leading-relaxed font-geist">
      {block}
    </p>
  ));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const lang = cookies().get('lang')?.value === 'hi' ? 'hi' : 'en';
  const supabase = createServerClient();
  const { data: post } = await supabase
    .from('blog_posts')
    .select('seo_title, seo_description, title, excerpt')
    .eq('slug', params.slug)
    .eq('lang', lang)
    .maybeSingle();

  if (!post) return {};

  return {
    title: post.seo_title || post.title || 'VedicUtsav Blog',
    description: post.seo_description || post.excerpt || 'VedicUtsav blog post'
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const lang = cookies().get('lang')?.value === 'hi' ? 'hi' : 'en';
  const supabase = createServerClient();
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, content, created_at')
    .eq('slug', params.slug)
    .eq('lang', lang)
    .eq('status', 'published')
    .maybeSingle();

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background px-8 md:px-16 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-medium font-jakarta text-foreground mb-4">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-lg text-muted-foreground font-geist mb-8">{post.excerpt}</p>
        )}
        <div className="space-y-4">
          {post.content ? renderParagraphs(post.content) : null}
        </div>
      </div>
    </main>
  );
}
