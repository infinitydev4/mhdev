'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { Article } from '@/types/blog';

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <section className="space-y-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-archivo font-bold text-center"
      >
        Articles <span className="text-[#C1FF00]">connexes</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 hover:border-[#8364FF]/50 transition-all"
          >
            {/* Cover Image */}
            {article.coverImage && (
              <div className="relative h-40 overflow-hidden">
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
            <div className="p-4 space-y-3">
              {/* Category */}
              {article.category && (
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-protest"
                  style={{
                    backgroundColor: article.category.color || '#8364FF',
                    color: '#000',
                  }}
                >
                  {article.category.name}
                </span>
              )}

              {/* Title */}
              <Link href={`/blog/${article.slug}`}>
                <h3 className="text-lg font-archivo font-bold group-hover:text-[#C1FF00] transition-colors line-clamp-2">
                  {article.title}
                </h3>
              </Link>

              {/* Meta */}
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(article.publishedAt || article.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{article.readingTime} min</span>
                </div>
              </div>

              {/* Read More */}
              <Link
                href={`/blog/${article.slug}`}
                className="inline-flex items-center gap-2 text-[#8364FF] hover:text-[#C1FF00] transition-colors text-sm font-protest"
              >
                Lire
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
