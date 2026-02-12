'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Folder, Tag as TagIcon } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Category, Tag } from '@/types/blog';

interface BlogSidebarProps {
  categories: Category[];
  tags: Tag[];
  selectedCategory?: string;
  selectedTag?: string;
}

export default function BlogSidebar({ 
  categories, 
  tags, 
  selectedCategory, 
  selectedTag 
}: BlogSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="space-y-6 sticky top-24">
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
      >
        <h3 className="text-lg font-protest text-[#C1FF00] mb-4 flex items-center gap-2">
          <Search className="w-5 h-5" />
          Rechercher
        </h3>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un article..."
            className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#8364FF] transition-colors text-white placeholder-gray-500"
          />
        </form>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
      >
        <h3 className="text-lg font-protest text-[#C1FF00] mb-4 flex items-center gap-2">
          <Folder className="w-5 h-5" />
          Catégories
        </h3>
        <div className="space-y-2">
          <Link
            href="/blog"
            className={`block px-3 py-2 rounded-lg transition-colors ${
              !selectedCategory
                ? 'bg-[#8364FF] text-white'
                : 'hover:bg-gray-800 text-gray-400'
            }`}
          >
            <span className="font-protest text-sm">Tous les articles</span>
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog?category=${category.id}`}
              className={`block px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#8364FF] text-white'
                  : 'hover:bg-gray-800 text-gray-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-protest text-sm">{category.name}</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">
                  {category.articlesCount}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
      >
        <h3 className="text-lg font-protest text-[#C1FF00] mb-4 flex items-center gap-2">
          <TagIcon className="w-5 h-5" />
          Tags populaires
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 15).map((tag) => (
            <Link
              key={tag.id}
              href={`/blog?tag=${tag.slug}`}
              className={`px-3 py-1 rounded-full text-xs font-protest border transition-all ${
                selectedTag === tag.slug
                  ? 'bg-[#8364FF] border-[#8364FF] text-white'
                  : 'border-gray-700 text-gray-400 hover:border-[#8364FF] hover:text-[#8364FF]'
              }`}
              style={{
                borderColor: selectedTag === tag.slug ? undefined : tag.color,
                color: selectedTag === tag.slug ? undefined : tag.color,
              }}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
