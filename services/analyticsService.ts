/**
 * /services/analyticsService.ts
 * Analytics tracking — events, impressions, user activity.
 */

type AnalyticsEvent =
  | "page_view"
  | "post_create"
  | "post_like"
  | "post_comment"
  | "story_view"
  | "reel_view"
  | "user_signup"
  | "user_login"
  | "ad_impression"
  | "ad_click"
  | "premium_subscribe";

/**
 * Track an analytics event.
 * Currently logs to console; can be replaced with Firebase Analytics,
 * Mixpanel, or PostHog.
 */
export function trackEvent(
  event: AnalyticsEvent,
  properties?: Record<string, unknown>
): void {
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", event, properties ?? {});
  }

  // TODO: send to analytics provider
}

/**
 * Track page view.
 */
export function trackPageView(path: string): void {
  trackEvent("page_view", { path });
}

/**
 * Track ad impression.
 */
export function trackAdImpression(adId: string, placement: string): void {
  trackEvent("ad_impression", { adId, placement });
}

/**
 * Track ad click.
 */
export function trackAdClick(adId: string): void {
  trackEvent("ad_click", { adId });
}