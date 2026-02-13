'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { User, Folder, Tag as TagIcon, ListTree } from 'lucide-react';
import type { Article } from '@/types/blog';

type SidebarVariant = 'lime' | 'violet' | 'orange';

const accentColorByVariant: Record<SidebarVariant, string> = {
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
      className="rounded-lg overflow-hidden border border-white/10 bg-[#05070B]"
    >
      <div
        className="flex h-7 items-center gap-2 border-b border-white/10 px-3 bg-[#05070B]"
        style={{ borderLeft: `3px solid ${accentColorByVariant[variant]}` }}
      >
        <span className="inline-block h-2 w-2 rounded-full bg-red-500/80" />
        <span className="inline-block h-2 w-2 rounded-full bg-yellow-500/80" />
        <span className="inline-block h-2 w-2 rounded-full bg-green-500/80" />
        <span
          className="font-protest text-xs align-middle leading-none"
          style={{ color: accentColorByVariant[variant] }}
        >
          {title}
        </span>
      </div>
      <div className="p-3 bg-[#05070B]">{children}</div>
    </div>
  );
}

interface ArticleSidebarProps {
  article: Article;
}

export default function ArticleSidebar({ article }: ArticleSidebarProps) {
  return (
    <div className="space-y-4 sticky top-24">
      {/* Author Window */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <SidebarWindow title="AUTEUR" variant="lime">
          <div className="flex items-start gap-2">
            <User className="w-5 h-5 text-[#C1FF00] mt-0.5" />
            <div className="space-y-1">
              <p className="font-archivo font-bold text-white text-sm">
                {article.author.firstName} {article.author.lastName}
              </p>
              <p className="text-xs text-gray-400">
                {article.author.role === 'ADMIN' && 'Administrateur du blog'}
                {article.author.role === 'MODERATOR' && 'Modérateur de contenu'}
                {article.author.role === 'USER' && 'Contributeur'}
              </p>
            </div>
          </div>
        </SidebarWindow>
      </motion.div>

      {/* Category Window */}
      {article.category && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 }}
        >
          <SidebarWindow title="CATÉGORIE" variant="violet">
            <div className="flex items-start gap-2">
              <Folder className="w-5 h-5 text-[#8364FF] mt-0.5" />
              <div>
                <Link
                  href={`/blog?category=${article.category.id}`}
                  className="inline-block px-3 py-1 rounded-full font-protest text-xs hover:scale-105 transition-transform"
                  style={{
                    backgroundColor: article.category.color || '#8364FF',
                    color: '#000',
                  }}
                >
                  {article.category.name}
                </Link>
                {article.category.description && (
                  <p className="mt-2 text-[11px] text-gray-400">
                    {article.category.description}
                  </p>
                )}
              </div>
            </div>
          </SidebarWindow>
        </motion.div>
      )}

      {/* Tags Window */}
      {article.tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.16 }}
        >
          <SidebarWindow title="TAGS" variant="violet">
            <div className="flex items-start gap-2">
              <TagIcon className="w-5 h-5 text-[#8364FF] mt-0.5" />
              <div className="flex flex-wrap gap-2">
                {article.tags.map(({ tag }) => (
                  <Link
                    key={tag.id}
                    href={`/blog?tag=${tag.slug}`}
                    className="px-3 py-1 rounded-full text-[11px] font-protest border hover:scale-105 transition-transform"
                    style={{
                      borderColor: tag.color || '#8364FF',
                      color: tag.color || '#8364FF',
                    }}
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          </SidebarWindow>
        </motion.div>
      )}

      {/* Table of Contents Window (placeholder) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.24 }}
      >
        <SidebarWindow title="SOMMAIRE" variant="orange">
          <div className="flex items-start gap-2">
            <ListTree className="w-5 h-5 text-[#FF8656] mt-0.5" />
            <p className="text-xs text-gray-400">
              Navigation automatique du contenu à venir (ancrages sur les
              titres H2 / H3).
            </p>
          </div>
        </SidebarWindow>
      </motion.div>
    </div>
  );
}
