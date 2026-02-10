'use client';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useLanguage } from '@/lib/i18n';

const tabs = ['leads', 'blog', 'content', 'seo', 'ai'] as const;

type Tab = (typeof tabs)[number];

type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  event_type: string;
  event_date: string | null;
  guest_count: string | null;
  city: string;
  message: string | null;
  source: string | null;
};

type BlogPost = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  status: 'draft' | 'published';
  lang: 'en' | 'hi';
  seo_title: string | null;
  seo_description: string | null;
};

type SiteContent = {
  id: string;
  key: string;
  lang: 'en' | 'hi';
  value: string;
  updated_at: string;
};

type SeoPage = {
  id: string;
  page: string;
  lang: 'en' | 'hi';
  title: string;
  description: string;
  updated_at: string;
};

const emptyPost: BlogPost = {
  id: '',
  created_at: '',
  updated_at: '',
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image: '',
  status: 'draft',
  lang: 'en',
  seo_title: '',
  seo_description: ''
};

const emptyContent: SiteContent = {
  id: '',
  key: '',
  lang: 'en',
  value: '',
  updated_at: ''
};

const emptySeo: SeoPage = {
  id: '',
  page: '',
  lang: 'en',
  title: '',
  description: '',
  updated_at: ''
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, '');
}

export default function AdminPage() {
  const { t } = useLanguage();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('leads');

  const [leads, setLeads] = useState<Lead[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [contentRows, setContentRows] = useState<SiteContent[]>([]);
  const [seoRows, setSeoRows] = useState<SeoPage[]>([]);

  const [editingPost, setEditingPost] = useState<BlogPost>(emptyPost);
  const [editingContent, setEditingContent] = useState<SiteContent>(emptyContent);
  const [editingSeo, setEditingSeo] = useState<SeoPage>(emptySeo);
  const [aiInput, setAiInput] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) {
      refreshAll();
    }
  }, [session]);

  const refreshAll = async () => {
    await Promise.all([loadLeads(), loadPosts(), loadContent(), loadSeo()]);
  };

  const loadLeads = async () => {
    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    setLeads((data || []) as Lead[]);
  };

  const loadPosts = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('lang', 'en')
      .order('updated_at', { ascending: false });
    setPosts((data || []) as BlogPost[]);
  };

  const loadContent = async () => {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .eq('lang', 'en')
      .order('updated_at', { ascending: false });
    setContentRows((data || []) as SiteContent[]);
  };

  const loadSeo = async () => {
    const { data } = await supabase
      .from('seo_pages')
      .select('*')
      .eq('lang', 'en')
      .order('updated_at', { ascending: false });
    setSeoRows((data || []) as SeoPage[]);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: authPassword
    });
    if (error) {
      setAuthError(error.message);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleSavePost = async () => {
    if (!editingPost.title.trim()) return;
    setSaving(true);
    const payload: Partial<BlogPost> = {
      ...editingPost,
      slug: editingPost.slug || slugify(editingPost.title),
      excerpt: editingPost.excerpt || null,
      content: editingPost.content || null,
      cover_image: editingPost.cover_image || null,
      seo_title: editingPost.seo_title || null,
      seo_description: editingPost.seo_description || null
    };
    if (!editingPost.id) {
      delete (payload as any).id;
    }

    const { error } = await supabase.from('blog_posts').upsert(payload, { onConflict: 'id' });
    setSaving(false);
    if (!error) {
      await loadPosts();
      setEditingPost(emptyPost);
    }
  };

  const handleSaveContent = async () => {
    if (!editingContent.key.trim() || !editingContent.value.trim()) return;
    setSaving(true);
    const payload = {
      ...editingContent,
      value: editingContent.value
    };
    const { error } = await supabase.from('site_content').upsert(payload, { onConflict: 'key,lang' });
    setSaving(false);
    if (!error) {
      await loadContent();
      setEditingContent(emptyContent);
    }
  };

  const handleSaveSeo = async () => {
    if (!editingSeo.page.trim() || !editingSeo.title.trim()) return;
    setSaving(true);
    const payload = {
      ...editingSeo,
      description: editingSeo.description
    };
    const { error } = await supabase.from('seo_pages').upsert(payload, { onConflict: 'page,lang' });
    setSaving(false);
    if (!error) {
      await loadSeo();
      setEditingSeo(emptySeo);
    }
  };

  const handleGenerateBlog = async () => {
    if (!editingPost.title.trim()) return;
    setSaving(true);
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'blog',
        title: editingPost.title
      })
    });
    const data = await response.json();
    setSaving(false);
    if (data?.result) {
      setEditingPost((prev) => ({
        ...prev,
        title: data.result.title || prev.title,
        excerpt: data.result.excerpt || prev.excerpt,
        content: data.result.content || prev.content,
        seo_title: data.result.seo_title || prev.seo_title,
        seo_description: data.result.seo_description || prev.seo_description
      }));
    }
  };

  const handleGenerateSeo = async () => {
    if (!editingSeo.title.trim() && !editingSeo.description.trim()) return;
    setSaving(true);
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'seo',
        title: editingSeo.title,
        content: editingSeo.description
      })
    });
    const data = await response.json();
    setSaving(false);
    if (data?.result) {
      setEditingSeo((prev) => ({
        ...prev,
        title: data.result.seo_title || prev.title,
        description: data.result.seo_description || prev.description
      }));
    }
  };

  const handleAiTranslate = async () => {
    if (!aiInput.trim()) return;
    setSaving(true);
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'translate',
        text: aiInput
      })
    });
    const data = await response.json();
    setSaving(false);
    if (data?.result?.translation) {
      setAiOutput(data.result.translation);
    }
  };

  const sortedLeads = useMemo(() => leads, [leads]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-lg"
        >
          <h1 className="text-2xl font-semibold mb-6">{t('admin.login', 'Admin Login')}</h1>
          <label className="block text-sm font-medium text-foreground mb-2">
            {t('admin.email', 'Email')}
          </label>
          <input
            type="email"
            value={authEmail}
            onChange={(e) => setAuthEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-xl border border-border"
            required
          />
          <label className="block text-sm font-medium text-foreground mb-2">
            {t('admin.password', 'Password')}
          </label>
          <input
            type="password"
            value={authPassword}
            onChange={(e) => setAuthPassword(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-xl border border-border"
            required
          />
          {authError && <p className="text-sm text-error mb-3">{authError}</p>}
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-primary text-primary-foreground font-semibold"
          >
            {t('admin.sign_in', 'Sign In')}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold">{t('admin.title', 'Admin Dashboard')}</h1>
            <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="px-4 py-2 rounded-full border border-border text-sm font-medium"
          >
            {t('admin.sign_out', 'Sign Out')}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                activeTab === tab ? 'bg-primary text-primary-foreground border-primary' : 'border-border'
              }`}
            >
              {t(`admin.${tab}`, tab)}
            </button>
          ))}
        </div>

        {activeTab === 'leads' && (
          <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">{t('admin.leads', 'Leads')}</h2>
            <div className="space-y-4">
              {sortedLeads.length === 0 && (
                <p className="text-sm text-muted-foreground">{t('admin.no_data', 'No data found.')}</p>
              )}
              {sortedLeads.map((lead) => {
                const phoneDigits = normalizePhone(lead.phone);
                return (
                  <div key={lead.id} className="border border-border rounded-xl p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <p className="font-semibold">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">{lead.email}</p>
                        <p className="text-sm text-muted-foreground">{lead.phone}</p>
                        <p className="text-xs text-muted-foreground mt-1">{lead.city} - {lead.event_type}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={`https://wa.me/${phoneDigits}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-full bg-success text-success-foreground text-xs font-semibold"
                        >
                          {t('admin.whatsapp', 'WhatsApp')}
                        </a>
                        <a
                          href={`mailto:${lead.email}`}
                          className="px-3 py-2 rounded-full border border-border text-xs font-semibold"
                        >
                          {t('admin.email_action', 'Email')}
                        </a>
                      </div>
                    </div>
                    {lead.message && (
                      <p className="text-sm text-muted-foreground mt-3">{lead.message}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {activeTab === 'blog' && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{t('admin.blog', 'Blog')}</h2>
                <button
                  type="button"
                  onClick={() => setEditingPost({ ...emptyPost, lang: 'en' })}
                  className="text-xs px-3 py-1.5 rounded-full border border-border"
                >
                  {t('admin.new_post', 'New Post')}
                </button>
              </div>
              <div className="space-y-3">
                {posts.length === 0 && (
                  <p className="text-sm text-muted-foreground">{t('admin.no_data', 'No data found.')}</p>
                )}
                {posts.map((post) => (
                  <button
                    key={post.id}
                    type="button"
                    onClick={() => setEditingPost(post)}
                    className="w-full text-left border border-border rounded-xl p-3 hover:border-primary transition"
                  >
                    <p className="font-medium">{post.title}</p>
                    <p className="text-xs text-muted-foreground">{post.status} - {post.lang}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  placeholder={t('admin.title_label', 'Title')}
                  className="flex-1 px-4 py-2 rounded-xl border border-border"
                />
                <button
                  type="button"
                  onClick={() => setEditingPost({ ...editingPost, slug: slugify(editingPost.title) })}
                  className="px-3 py-2 rounded-xl border border-border text-xs"
                >
                  {t('admin.slug', 'Slug')}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  value={editingPost.slug}
                  onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                  placeholder={t('admin.slug', 'Slug')}
                  className="px-4 py-2 rounded-xl border border-border"
                />
                <input
                  type="text"
                  value="English"
                  readOnly
                  className="px-4 py-2 rounded-xl border border-border bg-muted text-muted-foreground"
                />
                <select
                  value={editingPost.status}
                  onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as 'draft' | 'published' })}
                  className="px-4 py-2 rounded-xl border border-border"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <textarea
                rows={3}
                value={editingPost.excerpt || ''}
                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                placeholder={t('admin.excerpt', 'Excerpt')}
                className="w-full px-4 py-2 rounded-xl border border-border mb-4"
              />
              <textarea
                rows={10}
                value={editingPost.content || ''}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                placeholder={t('admin.content_label', 'Content')}
                className="w-full px-4 py-2 rounded-xl border border-border mb-4"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={editingPost.seo_title || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, seo_title: e.target.value })}
                  placeholder={t('admin.seo_title', 'SEO Title')}
                  className="px-4 py-2 rounded-xl border border-border"
                />
                <input
                  type="text"
                  value={editingPost.seo_description || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, seo_description: e.target.value })}
                  placeholder={t('admin.seo_description', 'SEO Description')}
                  className="px-4 py-2 rounded-xl border border-border"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleGenerateBlog}
                  className="px-4 py-2 rounded-full border border-border text-sm"
                  disabled={saving}
                >
                  {t('admin.generate', 'Generate with AI')}
                </button>
                <button
                  type="button"
                  onClick={handleSavePost}
                  className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm"
                  disabled={saving}
                >
                  {t('admin.save', 'Save')}
                </button>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'content' && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-2xl p-4">
              <h2 className="text-lg font-semibold mb-4">{t('admin.content', 'Site Content')}</h2>
              <div className="space-y-3">
                {contentRows.length === 0 && (
                  <p className="text-sm text-muted-foreground">{t('admin.no_data', 'No data found.')}</p>
                )}
                {contentRows.map((row) => (
                  <button
                    key={row.id}
                    type="button"
                    onClick={() => setEditingContent(row)}
                    className="w-full text-left border border-border rounded-xl p-3 hover:border-primary transition"
                  >
                    <p className="font-medium">{row.key}</p>
                    <p className="text-xs text-muted-foreground">{row.lang}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={editingContent.key}
                  onChange={(e) => setEditingContent({ ...editingContent, key: e.target.value })}
                  placeholder="content_key"
                  className="px-4 py-2 rounded-xl border border-border"
                />
                <input
                  type="text"
                  value="English"
                  readOnly
                  className="px-4 py-2 rounded-xl border border-border bg-muted text-muted-foreground"
                />
              </div>
              <textarea
                rows={6}
                value={editingContent.value}
                onChange={(e) => setEditingContent({ ...editingContent, value: e.target.value })}
                placeholder="Value"
                className="w-full px-4 py-2 rounded-xl border border-border mb-4"
              />
              <button
                type="button"
                onClick={handleSaveContent}
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm"
                disabled={saving}
              >
                {t('admin.save', 'Save')}
              </button>
            </div>
          </section>
        )}

        {activeTab === 'seo' && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-2xl p-4">
              <h2 className="text-lg font-semibold mb-4">{t('admin.seo', 'SEO')}</h2>
              <div className="space-y-3">
                {seoRows.length === 0 && (
                  <p className="text-sm text-muted-foreground">{t('admin.no_data', 'No data found.')}</p>
                )}
                {seoRows.map((row) => (
                  <button
                    key={row.id}
                    type="button"
                    onClick={() => setEditingSeo(row)}
                    className="w-full text-left border border-border rounded-xl p-3 hover:border-primary transition"
                  >
                    <p className="font-medium">{row.page}</p>
                    <p className="text-xs text-muted-foreground">{row.lang}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={editingSeo.page}
                  onChange={(e) => setEditingSeo({ ...editingSeo, page: e.target.value })}
                  placeholder="page_key"
                  className="px-4 py-2 rounded-xl border border-border"
                />
                <input
                  type="text"
                  value="English"
                  readOnly
                  className="px-4 py-2 rounded-xl border border-border bg-muted text-muted-foreground"
                />
              </div>
              <input
                type="text"
                value={editingSeo.title}
                onChange={(e) => setEditingSeo({ ...editingSeo, title: e.target.value })}
                placeholder={t('admin.seo_title', 'SEO Title')}
                className="w-full px-4 py-2 rounded-xl border border-border mb-4"
              />
              <textarea
                rows={4}
                value={editingSeo.description}
                onChange={(e) => setEditingSeo({ ...editingSeo, description: e.target.value })}
                placeholder={t('admin.seo_description', 'SEO Description')}
                className="w-full px-4 py-2 rounded-xl border border-border mb-4"
              />
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleGenerateSeo}
                  className="px-4 py-2 rounded-full border border-border text-sm"
                  disabled={saving}
                >
                  {t('admin.generate', 'Generate with AI')}
                </button>
                <button
                  type="button"
                  onClick={handleSaveSeo}
                  className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm"
                  disabled={saving}
                >
                  {t('admin.save', 'Save')}
                </button>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'ai' && (
          <section className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">{t('admin.ai_tools', 'AI Tools')}</h2>
            <textarea
              rows={5}
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Paste text to translate"
              className="w-full px-4 py-2 rounded-xl border border-border mb-4"
            />
            <button
              type="button"
              onClick={handleAiTranslate}
              className="px-4 py-2 rounded-full border border-border text-sm"
              disabled={saving}
            >
              {t('admin.generate', 'Generate with AI')}
            </button>
            {aiOutput && (
              <div className="mt-4 p-4 rounded-xl bg-muted text-sm whitespace-pre-wrap">
                {aiOutput}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
