/**
 * Format a date string/number into a relative time string.
 * e.g. "2m ago", "3h ago", "5d ago"
 */
export function formatRelativeTime(dateInput: string | number): string {
  const date = typeof dateInput === "number" ? new Date(dateInput) : new Date(dateInput);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)}w ago`;
  if (diffDay < 365) return `${Math.floor(diffDay / 30)}mo ago`;
  return `${Math.floor(diffDay / 365)}y ago`;
}

/**
 * Format a date into a readable format.
 * e.g. "3 Aug 2026, 10:00 AM"
 */
export function formatFullDate(dateInput: string | number): string {
  const date = typeof dateInput === "number" ? new Date(dateInput) : new Date(dateInput);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
