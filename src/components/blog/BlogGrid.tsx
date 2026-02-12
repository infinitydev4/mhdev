'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Eye, ArrowRight } from 'lucide-react';
import type { Article } from '@/types/blog';

interface BlogGridProps {
  articles: Article[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  currentPage: number;
}

export default function BlogGrid({ articles, pagination, currentPage }: BlogGridProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-lg">Aucun article trouvé</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 hover:border-[#8364FF]/50 transition-all duration-300"
          >
            {/* Cover Image */}
            {article.coverImage && (
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Category & Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {article.category && (
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-protest"
                    style={{
                      backgroundColor: article.category.color || '#8364FF',
                      color: '#000',
                    }}
                  >
                    {article.category.name}
                  </span>
                )}
                {article.tags.slice(0, 2).map(({ tag }) => (
                  <span
                    key={tag.id}
                    className="px-2 py-1 rounded-full text-xs border"
                    style={{
                      borderColor: tag.color || '#8364FF',
                      color: tag.color || '#8364FF',
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* Title */}
              <Link href={`/blog/${article.slug}`}>
                <h3 className="text-xl font-archivo font-bold group-hover:text-[#C1FF00] transition-colors line-clamp-2">
                  {article.title}
                </h3>
              </Link>

              {/* Excerpt */}
              {article.excerpt && (
                <p className="text-gray-400 text-sm line-clamp-3">
                  {article.excerpt}
                </p>
              )}

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(article.publishedAt || article.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{article.readingTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{article.views}</span>
                </div>
              </div>

              {/* Read More */}
              <Link
                href={`/blog/${article.slug}`}
                className="inline-flex items-center gap-2 text-[#8364FF] hover:text-[#C1FF00] transition-colors text-sm font-protest group"
              >
                Lire l&apos;article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          {pagination.hasPreviousPage && (
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-[#8364FF] transition-colors font-protest"
            >
              Précédent
            </Link>
          )}

          <div className="flex items-center gap-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/blog?page=${page}`}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-protest transition-colors ${
                  page === currentPage
                    ? 'bg-[#8364FF] text-white'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {page}
              </Link>
            ))}
          </div>

          {pagination.hasNextPage && (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-[#8364FF] transition-colors font-protest"
            >
              Suivant
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
