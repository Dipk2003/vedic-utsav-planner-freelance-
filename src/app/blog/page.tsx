import Link from 'next/link';
import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase/server';

export async function generateMetadata() {
  const lang = cookies().get('lang')?.value === 'hi' ? 'hi' : 'en';
  const supabase = createServerClient();
  const { data } = await supabase
    .from('seo_pages')
    .select('title, description')
    .eq('page', 'blog')
    .eq('lang', lang)
    .maybeSingle();

  return {
    title: data?.title || 'Blog | VedicUtsav',
    description: data?.description || 'Latest updates, event tips, and celebration ideas from VedicUtsav.'
  };
}

export default async function BlogPage() {
  const lang = cookies().get('lang')?.value === 'hi' ? 'hi' : 'en';
  const supabase = createServerClient();
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, created_at, lang')
    .eq('status', 'published')
    .eq('lang', lang)
    .order('created_at', { ascending: false });

  const heading = lang === 'hi' ? 'VedicUtsav Blog' : 'VedicUtsav Blog';
  const subheading =
    lang === 'hi'
      ? 'Insights, tips, aur ideas for unforgettable celebrations.'
      : 'Insights, tips, and ideas for unforgettable celebrations.';

  return (
    <main className="min-h-screen bg-background px-8 md:px-16 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-medium font-jakarta text-foreground mb-4">
            {heading}
          </h1>
          <p className="text-muted-foreground text-lg font-geist">
            {subheading}
          </p>
        </div>

        <div className="space-y-6">
          {(posts || []).length === 0 && (
            <p className="text-muted-foreground">
              {lang === 'hi' ? 'Abhi koi post publish nahi hua hai.' : 'No posts published yet.'}
            </p>
          )}
          {(posts || []).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block border border-border rounded-2xl p-6 bg-card hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-2">{post.title}</h2>
              {post.excerpt && (
                <p className="text-muted-foreground font-geist">{post.excerpt}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
