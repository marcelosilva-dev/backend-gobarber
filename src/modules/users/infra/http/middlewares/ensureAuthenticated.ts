import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import tokenConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação do token jwt

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missig', 401);
  }

  // Dividindo o array authorization que é, [Bearer , dfbvhdhadksvd]

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, tokenConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = { id: sub };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}
