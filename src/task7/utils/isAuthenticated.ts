import { findUserEntityById } from '../user/user.repository';
import { Request, Response, NextFunction } from 'express';
import { UserEntityDocument } from '../user/user.entity';

type RequestHeaderValue = string | string[] | undefined;

interface RequestWithHeaders extends Request {
  headers: {
    [key: string]: RequestHeaderValue;
  };
  user?: UserEntityDocument;
}

export const isAuthenticated = async (req: RequestWithHeaders, res: Response, next: NextFunction): Promise<void> => {
  const userId: RequestHeaderValue = req.headers['x-user-id'];
  if (typeof userId === 'undefined' || typeof userId === 'object') {
    res.status(403).send({
      error: 'You must be authorized user',
    });
    return;
  }
  const user: UserEntityDocument | null = await findUserEntityById(userId);
  if (!user) {
    res.status(401).send({
      error: 'User is not authorized',
    });
    return;
  }
  req.user = user;

  next();
};
