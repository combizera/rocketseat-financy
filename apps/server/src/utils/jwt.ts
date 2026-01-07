import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';

export type JwtPayload = {
  id: string;
  email: string;
}

export const signJwt = (payload: JwtPayload, expiresIn?: string) => {
  const secret: Secret = process.env.JWT_SECRET as unknown as Secret;
  let options: SignOptions | undefined;
  const expiration = expiresIn

  if(expiration) {
    options = {
      expiresIn: expiration as unknown as NonNullable<SignOptions>['expiresIn']
    }
  }

  return jwt.sign(payload, secret, options);
}

export const verifyJwt = (token: string) => {
  const secret: Secret = process.env.JWT_SECRET as unknown as Secret;

  return jwt.verify(token, secret) as JwtPayload;
}