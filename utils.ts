export function getURL(value: string): URL | null {
  let url
  try {
    url = new URL(value)
  } catch (_) {
    return null
  }
  return url
}
