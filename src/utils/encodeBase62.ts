const BASE62_CHARS =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const BASE62_RADIX = BASE62_CHARS.length

function toBase62(number: number): string {
  if (number === 0) return BASE62_CHARS[0]

  let encoded = ''
  while (number > 0) {
    const remainder = number % BASE62_RADIX
    encoded = BASE62_CHARS[remainder] + encoded
    number = Math.floor(number / BASE62_RADIX)
  }
  return encoded
}

export function encodeBase62(number: number): string {
  return toBase62(number)
}

export function assigneesEncodeBase62(date: number, index: number): string {
  const num = date + index
  return toBase62(num)
}
