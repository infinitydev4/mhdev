'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Article } from '@/types/blog';

interface ArticleContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-900/30 rounded-2xl p-8 md:p-12 border border-gray-800"
    >
      {/* Article Content (Markdown) */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className="prose prose-invert prose-lg max-w-none
          prose-headings:font-archivo prose-headings:font-bold
          prose-h1:text-4xl prose-h1:text-[#C1FF00] prose-h1:mb-6
          prose-h2:text-3xl prose-h2:text-[#8364FF] prose-h2:mb-4 prose-h2:mt-8
          prose-h3:text-2xl prose-h3:text-white prose-h3:mb-3 prose-h3:mt-6
          prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
          prose-a:text-[#8364FF] prose-a:no-underline hover:prose-a:text-[#C1FF00] prose-a:transition-colors
          prose-strong:text-white prose-strong:font-bold
          prose-code:text-[#C1FF00] prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
          prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-xl
          prose-blockquote:border-l-4 prose-blockquote:border-[#8364FF] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400
          prose-ul:list-disc prose-ul:pl-6 prose-ul:text-gray-300
          prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-gray-300
          prose-li:mb-2
          prose-img:rounded-xl prose-img:shadow-lg"
        components={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          code({ inline, className, children, ...props }: any) {
            const codeContent = String(children).replace(/\n$/, '');

            if (inline) {
              return (
                <code
                  className={`px-2 py-0.5 rounded bg-gray-800 text-[#C1FF00] text-sm ${className ?? ''}`}
                  {...props}
                >
                  {codeContent}
                </code>
              );
            }

            // Éviter <pre> car il ne peut pas être dans <p> (erreur hydration).
            // Utiliser un span en block pour conserver le rendu code block.
            return (
              <span className="my-4 block overflow-x-auto rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm">
                <code className={`block whitespace-pre font-mono ${className ?? ''}`} {...props}>
                  {codeContent}
                </code>
              </span>
            );
          },
        }}
      >
        {article.content}
      </ReactMarkdown>

      {/* Share Section */}
      <div className="mt-12 pt-8 border-t border-gray-800">
        <p className="text-sm text-gray-400 font-protest">
          Partagez cet article si vous l&apos;avez trouvé utile
        </p>
      </div>
    </motion.div>
  );
}
