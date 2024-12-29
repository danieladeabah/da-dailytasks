/**
 * Converts a given name into its initials
 * @param {string} [name] - The name to convert to initials
 * @returns {string} The first two initials of the name (e.g., "John Doe" -> "JD")
 */
export function usernameToInitials(name?: string): string {
  const n = name?.split(' ')
  let s = ''
  if (n) {
    for (const word of n) {
      if (word[0]) s += word[0].toUpperCase()
    }
  }
  return s.slice(0, 2)
}
