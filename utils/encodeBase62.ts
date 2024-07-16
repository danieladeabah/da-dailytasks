// Base62 characters
const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encodeBase62(number: number) {
  let encoded = "";
  while (number > 0) {
    const remainder = number % 62;
    encoded = chars[remainder] + encoded;
    number = Math.floor(number / 62);
  }
  return encoded;
}
