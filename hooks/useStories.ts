"use client";

import { useState, useEffect } from "react";
import type { Story, StoryGroup } from "@/types/story";

/**
 * useStories - fetches active stories for the stories bar.
 * Placeholder: real implementation will fetch from RTDB.
 */
export default function useStories() {
  const [storyGroups, setStoryGroups] = useState<StoryGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: fetch stories from RTDB, group by author, filter expired
    setLoading(false);
  }, []);

  return { storyGroups, loading };
}