export function getFilePath(file: Record<'hash' | 'ext', string>): string {
  return `${ file.hash }${ file.ext }`
}
