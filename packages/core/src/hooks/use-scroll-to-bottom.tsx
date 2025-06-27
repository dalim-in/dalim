import { useEffect, useRef, type RefObject } from 'react';

export function useScrollToBottom(): [
  RefObject<HTMLDivElement>,
  RefObject<HTMLDivElement>,
] {
  const containerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const end = endRef.current;

    if (!container || !end) return;

    const observer = new MutationObserver(() => {
      const isAtBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 100;

      if (isAtBottom) {
        end.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  // @ts-expect-error error
  return [containerRef, endRef];
}