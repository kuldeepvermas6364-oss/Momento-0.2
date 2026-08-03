import type { Metadata } from "next";
import { APP_NAME, APP_DESCRIPTION } from "@/constants/app";

export const appMetadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`
  },
  description: `${APP_NAME} - ${APP_DESCRIPTION}`,
  applicationName: APP_NAME,
  keywords: [
    APP_NAME,
    "Social Media",
    "AI",
    "Community",
    "Chat",
    "Reels"
  ]
};
