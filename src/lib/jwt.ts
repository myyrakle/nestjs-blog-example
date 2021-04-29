import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';

const keyValue = 'asdf';

export function makeAccessToken(value: any) {
  return jwt.sign(value, keyValue, { expiresIn: '1h' });
}

export function makeRefreshToken(value: any) {
  return jwt.sign(value, keyValue, { expiresIn: '100d' });
}

export function checkToken(token: string) {
  return jwt.verify(token, keyValue);
}
