'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { User, Folder, Tag as TagIcon } from 'lucide-react';
import type { Article } from '@/types/blog';

interface ArticleSidebarProps {
  article: Article;
}

export default function ArticleSidebar({ article }: ArticleSidebarProps) {
  return (
    <div className="space-y-6 sticky top-24">
      {/* Author Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
      >
        <h3 className="text-lg font-protest text-[#C1FF00] mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Auteur
        </h3>
        <div className="space-y-2">
          <p className="font-archivo font-bold text-white">
            {article.author.firstName} {article.author.lastName}
          </p>
          <p className="text-sm text-gray-400">
            {article.author.role === 'ADMIN' && 'Administrateur'}
            {article.author.role === 'MODERATOR' && 'Modérateur'}
            {article.author.role === 'USER' && 'Contributeur'}
          </p>
        </div>
      </motion.div>

      {/* Category */}
      {article.category && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h3 className="text-lg font-protest text-[#C1FF00] mb-4 flex items-center gap-2">
            <Folder className="w-5 h-5" />
            Catégorie
          </h3>
          <Link
            href={`/blog?category=${article.category.id}`}
            className="inline-block px-4 py-2 rounded-full font-protest text-sm hover:scale-105 transition-transform"
            style={{
              backgroundColor: article.category.color || '#8364FF',
              color: '#000',
            }}
          >
            {article.category.name}
          </Link>
        </motion.div>
      )}

      {/* Tags */}
      {article.tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h3 className="text-lg font-protest text-[#C1FF00] mb-4 flex items-center gap-2">
            <TagIcon className="w-5 h-5" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map(({ tag }) => (
              <Link
                key={tag.id}
                href={`/blog?tag=${tag.slug}`}
                className="px-3 py-1 rounded-full text-xs font-protest border hover:scale-105 transition-transform"
                style={{
                  borderColor: tag.color || '#8364FF',
                  color: tag.color || '#8364FF',
                }}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Table of Contents (placeholder) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
      >
        <h3 className="text-lg font-protest text-[#C1FF00] mb-4">
          Sommaire
        </h3>
        <p className="text-sm text-gray-400">
          Navigation automatique à venir
        </p>
      </motion.div>
    </div>
  );
}
