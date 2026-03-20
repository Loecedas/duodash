import { useState, useCallback } from 'react';
import { toPng } from 'html-to-image';

interface ScreenshotOptions {
  filename?: string;
  pixelRatio?: number;
  backgroundColor?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

export function useScreenshot() {
  const [isExporting, setIsExporting] = useState(false);

  const capture = useCallback(async (element: HTMLElement | null, options: ScreenshotOptions = {}) => {
    if (!element) {
      console.warn('Screenshot: No element provided');
      return;
    }

    const resolvedTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const {
      filename = 'screenshot',
      pixelRatio = 2,
    } = options;

    console.log(`Starting screenshot capture (Mirror Sandbox): ${filename}`, { pixelRatio });
    setIsExporting(true);

    const el = element;
    const originalStyle: any = {
      width: el.style.width,
      maxWidth: el.style.maxWidth,
      height: el.style.height,
      padding: el.style.padding,
      boxSizing: el.style.boxSizing,
      overflow: el.style.overflow,
      background: el.style.background,
    };

    // 记录修改过的样式，以便精确还原
    const modifiedProps: string[] = [];
    const setStyle = (prop: string, value: string) => {
      if (!modifiedProps.includes(prop)) {
        modifiedProps.push(prop);
      }
      (el.style as any)[prop] = value;
    };

    try {
      // 2. 准备镜像沙箱 (Prepare Mirror Sandbox)
      const isFull = filename.includes('full');
      
      // 为全屏模式或卡片模式确定宽度
      const captureWidth = options.width || (isFull ? 1280 : el.clientWidth);
      const captureBackground = options.backgroundColor || (resolvedTheme === 'dark' ? '#0f172a' : '#f0f4f8');

      // A. 仅在全屏模式下锁定和修改样式
      if (isFull) {
        setStyle('width', `${captureWidth}px`);
        setStyle('maxWidth', `${captureWidth}px`);
        setStyle('height', 'auto');
        setStyle('padding', '32px 32px 56px 32px');
        setStyle('background', captureBackground);
        setStyle('boxSizing', 'border-box');
        
        // D. 测量高度并锁定
        await new Promise(resolve => setTimeout(resolve, 150));
        const actualScrollHeight = el.scrollHeight;
        const captureHeight = options.height || actualScrollHeight;
        setStyle('height', `${captureHeight}px`);
        setStyle('overflow', 'hidden');
      }

      // E. 等待渲染
      await new Promise(resolve => setTimeout(resolve, isFull ? 800 : 400));
      await new Promise(resolve => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve)));

      // F. 执行截图
      const dataUrl = await toPng(el, {
        pixelRatio: isFull ? 2 : 3,
        style: isFull ? {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          margin: '0',
          width: `${captureWidth}px`,
          height: el.style.height,
          padding: '32px 32px 56px 32px',
          boxSizing: 'border-box',
          background: captureBackground,
        } : {
          // 卡片模式：禁用任何干扰样式的覆盖
          margin: '0',
        },
        backgroundColor: isFull ? captureBackground : undefined,
        skipFonts: false,
        cacheBust: true,
      });

      if (!dataUrl || dataUrl === 'data:,') {
        throw new Error('Generated image is empty');
      }

      // F. 下载
      console.log('Capture successful, saving image...');
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${filename}-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error: any) {
      console.error('Screenshot capture failed:', error);
      alert(`保存图片失败: ${error.message || '未知错误'}`);
      throw error;
    } finally {
      // G. 精确还原现场
      modifiedProps.forEach(prop => {
        (el.style as any)[prop] = originalStyle[prop];
      });
      
      if (modifiedProps.length > 0) {
        window.dispatchEvent(new Event('resize'));
      }
      
      // 延迟关闭状态
      setTimeout(() => setIsExporting(false), 200);
    }
  }, []);

  return { isExporting, capture };
}
