import { useState, useCallback } from 'react';
import { toPng } from 'html-to-image';

interface ScreenshotOptions {
  filename?: string;
  pixelRatio?: number;
  backgroundColor?: string;
}

export function useScreenshot() {
  const [isExporting, setIsExporting] = useState(false);

  const capture = useCallback(async (element: HTMLElement | null, options: ScreenshotOptions = {}) => {
    if (!element) return;

    const {
      filename = 'screenshot',
      pixelRatio = 3,
      backgroundColor = '#f7f7f7'
    } = options;

    setIsExporting(true);
    try {
      // Allow more time for potential rendering updates and font readying
      await new Promise(resolve => setTimeout(resolve, 300));

      const dataUrl = await toPng(element, {
        pixelRatio,
        backgroundColor,
        skipFonts: false, // Try enabling fonts but with safety
        cacheBust: true,  // Prevent cache issues
        imagePlaceholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', // fallback
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          margin: '0',
        },
      });

      if (!dataUrl || dataUrl === 'data:,') {
        throw new Error('Generated image is empty');
      }

      const link = document.createElement('a');
      link.download = `${filename}-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: any) {
      console.error('Screenshot capture failed:', error);
      alert(`保存图片失败: ${error.message || '未知错误'}\n请尝试刷新页面或检查网络连接。`);
      throw error;
    } finally {
      setIsExporting(false);
    }
  }, []);

  return { isExporting, capture };
}
