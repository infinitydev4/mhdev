'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Folder, Tag as TagIcon } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Category, Tag } from '@/types/blog';

type SidebarVariant = 'lime' | 'violet' | 'orange';

const headerBgClassByVariant: Record<SidebarVariant, string> = {
  lime: 'bg-[#C1FF00]',
  violet: 'bg-[#8364FF]',
  orange: 'bg-[#FF8656]',
};

const borderColorByVariant: Record<SidebarVariant, string> = {
  lime: '#C1FF00',
  violet: '#8364FF',
  orange: '#FF8656',
};

interface SidebarWindowProps {
  title: string;
  variant: SidebarVariant;
  children: React.ReactNode;
}

function SidebarWindow({ title, variant, children }: SidebarWindowProps) {
  return (
    <div
      className="border-2 rounded-lg overflow-hidden bg-gradient-to-b from-[#8364FF]/10 to-transparent"
      style={{ borderColor: borderColorByVariant[variant] }}
    >
      <div className={`${headerBgClassByVariant[variant]} h-7 px-3`}>
        <div className="flex h-full items-center justify-between">
          <div>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 align-middle mr-1" />
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-500 align-middle mr-1" />
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 align-middle mr-2" />
            <span className="font-protest text-xs text-black align-middle leading-none">
              {title}
            </span>
          </div>
        </div>
      </div>
      <div className="p-3 bg-black/80">{children}</div>
    </div>
  );
}

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
    <div className="space-y-4 sticky top-24">
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <SidebarWindow title="RECHERCHER" variant="lime">
          <form onSubmit={handleSearch} className="space-y-2">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-[#C1FF00]" />
              <span className="text-xs text-gray-400">
                Tape un mot-clé pour filtrer les articles.
              </span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un article..."
              className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#C1FF00] transition-colors text-white placeholder-gray-500 text-sm"
            />
          </form>
        </SidebarWindow>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
      >
        <SidebarWindow title="CATÉGORIES" variant="violet">
          <div className="space-y-1.5">
            <Link
              href="/blog"
              className={`block px-3 py-1.5 rounded-lg transition-colors text-xs ${
                !selectedCategory
                  ? 'bg-[#8364FF] text-white'
                  : 'hover:bg-gray-900 text-gray-400'
              }`}
            >
              <span className="font-protest text-xs">Tous les articles</span>
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog?category=${category.id}`}
                className={`block px-3 py-1.5 rounded-lg transition-colors text-xs ${
                  selectedCategory === category.id
                    ? 'bg-[#8364FF] text-white'
                    : 'hover:bg-gray-900 text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-protest text-xs flex items-center gap-1">
                    <Folder className="w-3 h-3 text-[#8364FF]" />
                    {category.name}
                  </span>
                  <span className="text-[10px] bg-gray-900 px-2 py-0.5 rounded-full">
                    {category.articlesCount}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </SidebarWindow>
      </motion.div>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
      >
        <SidebarWindow title="TAGS POPULAIRES" variant="orange">
          <div className="flex items-start gap-2 mb-2">
            <TagIcon className="w-4 h-4 text-[#FF8656] mt-0.5" />
            <p className="text-[11px] text-gray-400">
              Filtre rapidement par thématique technique.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 15).map((tag) => (
              <Link
                key={tag.id}
                href={`/blog?tag=${tag.slug}`}
                className={`px-3 py-1 rounded-full text-[11px] font-protest border transition-all ${
                  selectedTag === tag.slug
                    ? 'bg-[#FF8656] border-[#FF8656] text-black'
                    : 'border-gray-700 text-gray-400 hover:border-[#FF8656] hover:text-[#FF8656]'
                }`}
                style={{
                  borderColor:
                    selectedTag === tag.slug || !tag.color ? undefined : tag.color,
                  color:
                    selectedTag === tag.slug || !tag.color ? undefined : tag.color,
                }}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </SidebarWindow>
      </motion.div>
    </div>
  );
}
