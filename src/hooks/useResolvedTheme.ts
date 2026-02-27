import { useEffect, useState } from 'react';

export type ResolvedTheme = 'light' | 'dark';

function detectTheme(): ResolvedTheme {
  if (typeof document === 'undefined') return 'light';
  if (document.documentElement.dataset.theme === 'dark') return 'dark';
  if (document.documentElement.dataset.theme === 'light') return 'light';
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function useResolvedTheme(): ResolvedTheme {
  const [theme, setTheme] = useState<ResolvedTheme>(() => detectTheme());

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const updateTheme = () => setTheme(detectTheme());
    const observer = new MutationObserver(updateTheme);

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    updateTheme();
    return () => observer.disconnect();
  }, []);

  return theme;
}
