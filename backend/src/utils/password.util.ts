export async function hashPassword(password: string): Promise<string> {
  // 랜덤 salt 생성 (16바이트)
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // 패스워드와 salt 결합
  const encoder = new TextEncoder();
  const passwordData = encoder.encode(password);
  const combined = new Uint8Array(passwordData.length + salt.length);
  combined.set(passwordData);
  combined.set(salt, passwordData.length);

  // SHA-256 해싱
  const hashBuffer = await crypto.subtle.digest('SHA-256', combined);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const saltArray = Array.from(salt);

  // salt와 hash를 결합하여 저장 (salt:hash 형태)
  const saltHex = saltArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  return `${saltHex}:${hashHex}`;
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const [saltHex, hashHex] = hashedPassword.split(':');

  if (!saltHex || !hashHex) {
    return false;
  }

  // salt를 바이트 배열로 변환
  const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map((byte) => parseInt(byte, 16)));

  // 입력된 패스워드와 salt 결합
  const encoder = new TextEncoder();
  const passwordData = encoder.encode(password);
  const combined = new Uint8Array(passwordData.length + salt.length);
  combined.set(passwordData);
  combined.set(salt, passwordData.length);

  // SHA-256 해싱
  const hashBuffer = await crypto.subtle.digest('SHA-256', combined);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const computedHashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  return computedHashHex === hashHex;
}
