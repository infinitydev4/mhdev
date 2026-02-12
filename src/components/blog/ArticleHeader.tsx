'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Eye, ArrowLeft, User } from 'lucide-react';
import type { Article } from '@/types/blog';

interface ArticleHeaderProps {
  article: Article;
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <section className="relative min-h-[70vh] flex items-end overflow-hidden">
      {/* Cover Image Background */}
      {article.coverImage && (
        <>
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
        </>
      )}

      {/* Back Button */}
      <Link
        href="/blog"
        className="absolute top-24 left-4 md:left-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-gray-700 hover:border-[#8364FF] transition-all group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-protest text-sm">Retour</span>
      </Link>

      <div className="container mx-auto px-4 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          {/* Category & Tags */}
          <div className="flex items-center gap-2 flex-wrap mb-6">
            {article.category && (
              <span
                className="px-4 py-2 rounded-full text-sm font-protest"
                style={{
                  backgroundColor: article.category.color || '#8364FF',
                  color: '#000',
                }}
              >
                {article.category.name}
              </span>
            )}
            {article.tags.slice(0, 3).map(({ tag }) => (
              <span
                key={tag.id}
                className="px-3 py-1 rounded-full text-xs border font-protest"
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
          <h1 className="text-4xl md:text-6xl font-archivo font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {article.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center gap-6 text-sm text-gray-400 flex-wrap">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-protest">
                {article.author.firstName} {article.author.lastName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(article.publishedAt || article.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readingTime} min de lecture</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{article.views} vues</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
