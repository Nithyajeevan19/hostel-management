import 'server-only'
import { SignJWT, jwtVerify } from 'jose'

export interface AuthTokenPayload {
  userId: string
  role: string
  branchId?: string | null
}

function getSecret(name: 'JWT_ACCESS_SECRET' | 'JWT_REFRESH_SECRET') {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name} is not configured`)
  }
  return new TextEncoder().encode(value)
}

export async function createAccessToken(payload: AuthTokenPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(getSecret('JWT_ACCESS_SECRET'))
}

export async function createRefreshToken(payload: AuthTokenPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(getSecret('JWT_REFRESH_SECRET'))
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret('JWT_ACCESS_SECRET'))
  return payload as unknown as AuthTokenPayload
}

export async function verifyRefreshToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret('JWT_REFRESH_SECRET'))
  return payload as unknown as AuthTokenPayload
}
