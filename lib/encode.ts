/**
 * 인코딩/디코딩 유틸리티
 */

export function base64Encode(text: string): string {
  return Buffer.from(text, 'utf8').toString('base64');
}

export function base64Decode(encoded: string): string {
  return Buffer.from(encoded, 'base64').toString('utf8');
}

export function urlEncode(text: string): string {
  return encodeURIComponent(text);
}

export function urlDecode(encoded: string): string {
  return decodeURIComponent(encoded);
}

