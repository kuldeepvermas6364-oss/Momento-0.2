"use client";

import { useState, useCallback } from "react";
import { isImageFile, isVideoFile, isValidFileSize } from "@/utils/media";

type UseUploadOptions = {
  folder?: string;
  onSuccess?: (url: string) => void;
  onError?: (message: string) => void;
};

type UploadState = {
  uploading: boolean;
  url: string | null;
  error: string | null;
  progress: number;
};

/**
 * useUpload - handles file uploads to the /api/upload endpoint.
 */
export default function useUpload(options: UseUploadOptions = {}) {
  const { folder = "posts", onSuccess, onError } = options;
  const [state, setState] = useState<UploadState>({
    uploading: false,
    url: null,
    error: null,
    progress: 0,
  });

  const upload = useCallback(
    async (file: File) => {
      const isImage = isImageFile(file.type);
      const isVideo = isVideoFile(file.type);

      if (!isImage && !isVideo) {
        const msg = `Unsupported file type: ${file.type}`;
        setState((s) => ({ ...s, error: msg }));
        onError?.(msg);
        return;
      }

      const fileType = isImage ? "image" : "video";
      if (!isValidFileSize(file.size, fileType)) {
        const msg = `File too large. Max ${fileType === "image" ? "10MB" : "50MB"}.`;
        setState((s) => ({ ...s, error: msg }));
        onError?.(msg);
        return;
      }

      setState({ uploading: true, url: null, error: null, progress: 0 });

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Upload failed");
        }

        const data = await res.json();
        setState({ uploading: false, url: data.url, error: null, progress: 100 });
        onSuccess?.(data.url);
        return data.url;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Upload failed";
        setState((s) => ({ ...s, uploading: false, error: msg }));
        onError?.(msg);
      }
    },
    [folder, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setState({ uploading: false, url: null, error: null, progress: 0 });
  }, []);

  return { ...state, upload, reset };
}