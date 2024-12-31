// Regular expression for basic email validation
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

/**
 * Validate email format.
 * @param email The email address to validate.
 * @returns true if valid, false otherwise.
 */
export const isValidEmail = (email: string): boolean => {
  return emailRegex.test(email)
}
