import express, { Request, Response, Router } from 'express';
import { createUser, loginUser } from './user.service';
import { LoginUserSchema, RegisterUserSchema } from '../utils/validation';
import sendResponse from '../utils/sendResponse';
import { LoginUserEntity, RegisterUserEntity, UserEntityDocument, UserToken } from './user.entity';

const authRouter: Router = express.Router();

authRouter.post('/register', async (req: Request, res: Response): Promise<void> => {
  const newUser: RegisterUserEntity = req.body as RegisterUserEntity;
  const { value, error } = RegisterUserSchema.validate(newUser);
  if (error) {
    sendResponse(res, 400, null, error.message);
    return;
  }
  const createdUser: UserEntityDocument = await createUser(value);
  sendResponse(res, 200, createdUser, null);
});
authRouter.post('/login', async (req: Request, res: Response): Promise<void> => {
  const user: LoginUserEntity = req.body as LoginUserEntity;
  const { value, error } = LoginUserSchema.validate(user);
  if (error) {
    sendResponse(res, 400, null, error.message);
    return;
  }
  const userToken: UserToken | undefined = await loginUser(value);
  if (userToken) {
    sendResponse(res, 200, userToken, null);
  } else {
    sendResponse(res, 404, null, 'No user with such email or password');
  }
});

export default authRouter;
