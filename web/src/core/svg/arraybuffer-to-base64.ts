/**
 * ArrayBuffer를 base64 문자열로 변환하는 헬퍼 함수.
 */
export function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0, len = bytes.byteLength; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
