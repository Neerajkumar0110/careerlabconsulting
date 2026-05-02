export function driveToImage(url: string): string {
  const match = url.match(/\/d\/([^/]+)/);
  const id = match?.[1];

  if (!id) return url; // fallback if not Drive link

  return `https://drive.google.com/uc?export=view&id=${id}`;
}
