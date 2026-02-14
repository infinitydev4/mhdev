'use client';

import { useMemo, type ComponentPropsWithoutRef } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { Article } from '@/types/blog';

import 'highlight.js/lib/common';
import '@/styles/code-highlight.css';

interface ArticleContentProps {
  article: Article;
}

type CodeProps = ComponentPropsWithoutRef<'code'> & { inline?: boolean };
type PreProps = ComponentPropsWithoutRef<'pre'>;

const INLINE_CODE_STYLE: React.CSSProperties = {
  display: 'inline',
  padding: '0.125rem 0.5rem',
  borderRadius: '0.25rem',
  backgroundColor: 'rgb(31 41 55)',
  color: '#C1FF00',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  fontFamily: 'ui-monospace, monospace',
};

const REHYPE_HIGHLIGHT_OPTIONS = [
  rehypeHighlight,
  {
    ignoreMissing: true,
    subset: ['ruby', 'javascript', 'typescript', 'bash', 'json', 'yaml', 'sql'],
  },
] as const;

const PROSE_CLASSES = [
  'prose prose-invert prose-lg max-w-none',
  'prose-headings:font-archivo prose-headings:font-bold',
  'prose-h1:text-4xl prose-h1:text-[#C1FF00] prose-h1:mb-6',
  'prose-h2:text-3xl prose-h2:text-[#8364FF] prose-h2:mb-4 prose-h2:mt-8',
  'prose-h3:text-2xl prose-h3:text-white prose-h3:mb-3 prose-h3:mt-6',
  'prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4',
  'prose-a:text-[#8364FF] prose-a:no-underline hover:prose-a:text-[#C1FF00] prose-a:transition-colors',
  'prose-strong:text-white prose-strong:font-bold',
  'prose-code:text-[#C1FF00] prose-code:bg-gray-800 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:text-sm',
  'prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-xl',
  'prose-blockquote:border-l-4 prose-blockquote:border-[#8364FF] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400',
  'prose-ul:list-disc prose-ul:pl-6 prose-ul:text-gray-300',
  'prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-gray-300',
  'prose-li:mb-2',
  'prose-img:rounded-xl prose-img:shadow-lg',
].join(' ');

function InlineCode({ className, children, ...props }: CodeProps) {
  return (
    <code className={className ?? ''} style={INLINE_CODE_STYLE} {...props}>
      {children}
    </code>
  );
}

function BlockCode({ className, children, ...props }: CodeProps) {
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

function PreBlock({ children, ...props }: PreProps) {
  return (
    <pre
      className="my-4 overflow-x-auto rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm"
      {...props}
    >
      {children}
    </pre>
  );
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const components = useMemo(
    () => ({
      code({ inline, className, children, ...props }: CodeProps) {
        if (inline) {
          return <InlineCode className={className} {...props}>{children}</InlineCode>;
        }
        return <BlockCode className={className} {...props}>{children}</BlockCode>;
      },
      pre: PreBlock,
    }),
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-900/30 rounded-2xl p-8 md:p-12 border border-gray-800"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[REHYPE_HIGHLIGHT_OPTIONS]}
        className={PROSE_CLASSES}
        components={components}
      >
        {article.content}
      </ReactMarkdown>

      <div className="mt-12 pt-8 border-t border-gray-800">
        <p className="text-sm text-gray-400 font-protest">
          Partagez cet article si vous l&apos;avez trouvé utile
        </p>
      </div>
    </motion.div>
  );
}
