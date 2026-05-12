// src/hooks/usePageContent.ts
import { useEffect, useState } from 'react';

type ContentMap = Record<string, Record<string, string | null>>;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://clc-products-real-backend.vercel.app';

export function usePageContent(pageKey: string) {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/page-content/public/${pageKey}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setContent(data.content ?? {});
        // console.log(data.content);
        
      } catch {
        // silently fall back to hardcoded defaults — page still renders
        // console.log("Loading Page Failed...");
        
      } finally {
        setLoading(false);
      }
    })();
  }, [pageKey]);

  /**
   * get(sectionKey, blockKey, fallback)
   * Returns the DB value if present, otherwise the provided fallback string.
   */
  const get = (section: string, block: string, fallback: string): string => {
    return content?.[section]?.[block] ?? fallback;
  };

  return { content, loading, get };
}