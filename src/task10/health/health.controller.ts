import express, { Request, Response, Router } from 'express';
import sendResponse from '../utils/sendResponse';
import { DI } from '../server';
const healthRouter: Router = express.Router();

healthRouter.get('/app', async (req: Request, res: Response): Promise<void> => {
  sendResponse(
    res,
    200,
    {
      info: 'App is healthy',
    },
    null,
  );
});

healthRouter.get('/db', async (req: Request, res: Response): Promise<void> => {
  const resp = await DI.orm.checkConnection();

  sendResponse(
    res,
    resp.ok ? 200 : 500,
    {
      info: resp.reason || 'Database is up',
    },
    null,
  );
});

export default healthRouter;
