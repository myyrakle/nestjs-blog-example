import * as crypto from 'crypto';

// 패스워드 해싱
export function passwordHashing(
  password: string,
  passwordSalt: string,
): string {
  return crypto
    .createHmac('sha512', 'asdf')
    .update(password + passwordSalt)
    .digest('hex');
}
