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

export function assigneesEncodeBase62(date: number, index: number): string {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  let num = date + index;
  while (num > 0) {
    result = characters[num % 62] + result;
    num = Math.floor(num / 62);
  }
  return result;
}
