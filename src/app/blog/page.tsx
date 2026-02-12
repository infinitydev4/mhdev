import { Suspense } from 'react';
import { Metadata } from 'next';
import { BlogAPI } from '@/lib/api/blog';
import BlogHero from '@/components/blog/BlogHero';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogSkeleton from '@/components/blog/BlogSkeleton';

export const metadata: Metadata = {
  title: 'Blog | Mohamed Oullami - Lead Developer Ruby on Rails',
  description: 'Articles techniques sur le développement web, Ruby on Rails, Clean Architecture, et les meilleures pratiques de développement.',
  openGraph: {
    title: 'Blog | Mohamed Oullami',
    description: 'Articles techniques et retours d\'expérience',
    type: 'website',
  },
};

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    tag?: string;
    search?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const categoryId = params.category;
  const tag = params.tag;
  const search = params.search;

  // Fetch data in parallel
  const [articlesData, categories, tags] = await Promise.all([
    BlogAPI.getArticles({
      page,
      limit: 9,
      status: 'PUBLISHED',
      categoryId,
      tag,
      search,
      sortBy: 'publishedAt',
      order: 'DESC',
    }),
    BlogAPI.getCategories(),
    BlogAPI.getTags(),
  ]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <BlogHero />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Articles Grid */}
          <div className="lg:col-span-8">
            <Suspense fallback={<BlogSkeleton />}>
              <BlogGrid 
                articles={articlesData.data}
                pagination={articlesData.meta}
                currentPage={page}
              />
            </Suspense>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <BlogSidebar 
              categories={categories}
              tags={tags}
              selectedCategory={categoryId}
              selectedTag={tag}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
