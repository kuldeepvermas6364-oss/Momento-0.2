"use client";

import { useRef, useEffect, useCallback } from "react";

type UseInfiniteScrollOptions = {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  threshold?: number;
};

/**
 * useInfiniteScroll - attaches a scroll observer to trigger loadMore
 * when the sentinel element enters the viewport.
 */
export default function useInfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  threshold = 200,
}: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [onLoadMore, hasMore, isLoading]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: `${threshold}px`,
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleObserver, threshold]);

  return sentinelRef;
}