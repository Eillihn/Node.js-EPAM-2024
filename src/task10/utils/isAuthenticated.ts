import { findUserEntityById } from '../user/user.repository';
import { Request, Response, NextFunction } from 'express';
import { CurrentUser, UserModel } from '../user/user.entity';
import jwt from 'jsonwebtoken';
import envConfig from './envConfig';

type RequestHeaderValue = string | string[] | undefined;

interface RequestWithHeaders extends Request {
  headers: {
    [key: string]: RequestHeaderValue;
  };
  user?: UserModel;
}

export const isAuthenticated = async (req: RequestWithHeaders, res: Response, next: NextFunction): Promise<void> => {
  const authHeader: RequestHeaderValue = req.headers.authorization;
  if (typeof authHeader === 'undefined' || typeof authHeader === 'object') {
    res.status(401).send({
      error: 'Token is required',
    });
    return;
  }
  const [tokenType, token] = authHeader.split(' ');
  if (tokenType !== 'Bearer') {
    res.status(403).send({
      error: 'Invalid Token',
    });
    return;
  }
  try {
    const currentUser: CurrentUser = jwt.verify(token, envConfig.JWT_SECRET) as CurrentUser;
    const user: UserModel | null = await findUserEntityById(currentUser.user_id);
    if (!user) {
      res.status(401).send({
        error: 'Invalid Token. User not found',
      });
      return;
    }
    req.user = user;
  } catch (err) {
    res.status(403).send({
      error: 'Invalid Token',
    });
    return;
  }
  next();
};
