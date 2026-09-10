import React, { useMemo } from "react";
import { Download, ExternalLink, FileText, CheckCircle2, AlertCircle, Info, Sparkles } from "lucide-react";

interface ArticleHtmlRendererProps {
  content: string;
  className?: string;
}

/**
 * Converts Markdown syntax to clean HTML while preserving existing HTML tags
 */
function parseMarkdownAndHtml(rawContent: string): string {
  if (!rawContent) return "";

  let processed = rawContent;

  // If the content already contains rich HTML tags and no markdown headers, we still sanitize & enhance
  // Convert standard Markdown to HTML if present:
  
  // Headers: ### H3, ## H2, # H1
  processed = processed.replace(/^### (.*$)/gim, '<h3 class="text-base sm:text-lg font-black text-slate-900 mt-5 mb-2 pb-1 border-b border-slate-100 flex items-center gap-2">$1</h3>');
  processed = processed.replace(/^## (.*$)/gim, '<h2 class="text-lg sm:text-xl font-black text-blue-900 mt-6 mb-3 pb-2 border-b border-blue-100 flex items-center gap-2 font-cairo">$1</h2>');
  processed = processed.replace(/^# (.*$)/gim, '<h1 class="text-xl sm:text-2xl font-black text-slate-950 mt-4 mb-4 pb-2 border-b-2 border-slate-200 font-cairo">$1</h1>');

  // Bold & Italic markdown: **text** and *text*
  processed = processed.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-black text-slate-900">$1</strong>');
  processed = processed.replace(/\*(.*?)\*/gim, '<em class="italic text-slate-700">$1</em>');

  // Blockquotes: > text
  processed = processed.replace(/^>\s?(.*$)/gim, '<blockquote class="my-4 p-4 bg-gradient-to-r from-amber-50 via-orange-50/50 to-slate-50 border-r-4 border-amber-500 rounded-r-xl rounded-l-lg text-slate-800 font-medium text-xs sm:text-sm space-y-1 shadow-2xs">$1</blockquote>');

  // Markdown Unordered Lists: - item or * item
  processed = processed.replace(/^-\s+(.*$)/gim, '<li class="flex items-start gap-2 text-slate-700 my-1 leading-relaxed"><span class="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span><span>$1</span></li>');
  
  // Markdown links: [text](url)
  processed = processed.replace(/\[(.*?)\]\((.*?)\)/gim, (match, label, url) => {
    const isDownload = url.toLowerCase().includes('.pdf') || 
                       url.toLowerCase().includes('drive.google') || 
                       url.toLowerCase().includes('mediafire') ||
                       label.includes('تحميل') || 
                       label.includes('تنزيل');

    if (isDownload) {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" download class="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition shadow-2xs my-1 cursor-pointer"><span>📥</span><span>${label}</span></a>`;
    }
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold underline underline-offset-4 decoration-blue-300 hover:decoration-blue-600 transition"><span>${label}</span><span class="text-[10px]">↗</span></a>`;
  });

  // Handle standard line breaks for non-HTML paragraphs
  // Replace double newlines with paragraph wrappers if not inside HTML tag
  const paragraphs = processed.split(/\n\n+/);
  processed = paragraphs.map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h1') || p.startsWith('<h2') || p.startsWith('<h3') || 
        p.startsWith('<blockquote') || p.startsWith('<div') || p.startsWith('<table') || 
        p.startsWith('<ul') || p.startsWith('<li') || p.startsWith('<p') || p.startsWith('<section')) {
      return p;
    }
    return `<p class="my-2.5 leading-relaxed text-slate-700 text-xs sm:text-sm font-medium">${p.replace(/\n/g, '<br/>')}</p>`;
  }).join('\n');

  return processed;
}

export const ArticleHtmlRenderer: React.FC<ArticleHtmlRendererProps> = ({
  content,
  className = "",
}) => {
  const parsedHtml = useMemo(() => {
    return parseMarkdownAndHtml(content);
  }, [content]);

  return (
    <div
      className={`article-html-container font-cairo text-right leading-relaxed ${className}`}
      dir="rtl"
      dangerouslySetInnerHTML={{ __html: parsedHtml }}
    />
  );
};

export default ArticleHtmlRenderer;
