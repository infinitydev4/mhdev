import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Article } from '@/types/blog';
import { BlogAPI } from '@/lib/api/blog';
import ArticleHeader from '@/components/blog/ArticleHeader';
import ArticleContent from '@/components/blog/ArticleContent';
import ArticleSidebar from '@/components/blog/ArticleSidebar';
import RelatedArticles from '@/components/blog/RelatedArticles';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const article = await BlogAPI.getArticleBySlug(slug);

    return {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      keywords: article.metaKeywords,
      openGraph: {
        title: article.title,
        description: article.excerpt || '',
        type: 'article',
        publishedTime: article.publishedAt,
        authors: [`${article.author.firstName} ${article.author.lastName}`],
        images: article.coverImage ? [article.coverImage] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt || '',
        images: article.coverImage ? [article.coverImage] : [],
      },
    };
  } catch {
    return {
      title: 'Article introuvable',
    };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  let article;
  
  try {
    article = await BlogAPI.getArticleBySlug(slug);
  } catch {
    notFound();
  }

  // Fetch related articles (same category) - ne pas faire échouer la page si échec
  let relatedArticles: Article[] = [];
  if (article.categoryId) {
    try {
      const data = await BlogAPI.getArticles({
        categoryId: article.categoryId,
        limit: 3,
        status: 'PUBLISHED',
        light: true,
      });
      relatedArticles = data.data.filter((a) => a.id !== article.id).slice(0, 3);
    } catch {
      relatedArticles = [];
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Article Header */}
      <ArticleHeader article={article} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Article Content */}
          <article className="lg:col-span-8">
            <ArticleContent article={article} />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <ArticleSidebar article={article} />
          </aside>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16">
            <RelatedArticles articles={relatedArticles} />
          </div>
        )}
      </div>
    </div>
  );
}
