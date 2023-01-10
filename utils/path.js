export function getAbsolutePath(relativePath, metaUrl) {
  const url = new URL(relativePath, metaUrl);
  return url.pathname;
}
