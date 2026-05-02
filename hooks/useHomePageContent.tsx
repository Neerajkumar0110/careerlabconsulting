// hooks/useHomePageContent.ts
// Mirrors the usePageContent hook pattern but scoped to the 'home' page key.
// Usage:  const { get, getSection } = useHomePageContent();
//         const headline = get('hero', 'headline_1', 'AUTONOMOUS');

'use client';

import { usePageContent } from './usePageContent'; // reuse your existing hook

/**
 * Thin wrapper around usePageContent for the home page.
 * Provides the same `get(sectionKey, blockKey, fallback)` API.
 */
export function useHomePageContent() {
  return usePageContent('home');
}