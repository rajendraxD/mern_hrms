/**
 * Resolve an avatar path to a fully qualified URL.
 *
 * In development, the Vite dev server proxies /uploads to the backend
 * (port 3000). In production (Vercel), the backend is deployed separately,
 * so we need to prepend the API origin to relative avatar paths.
 *
 * @param {string|null|undefined} path - The avatar path (e.g. "/uploads/avatars/avatar-123.jpg")
 * @returns {string|undefined} Fully qualified URL, or undefined if no path
 */
export function getAvatarUrl(path) {
  if (!path) return undefined;

  // Already absolute — use as-is
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  // Data URIs (e.g. blob:, data:) — use as-is
  if (path.startsWith("blob:") || path.startsWith("data:")) return path;

  // Relative path — prepend the API origin
  const apiOrigin = import.meta.env.VITE_API_URL || "http://localhost:3000";
  return `${apiOrigin}${path}`;
}
