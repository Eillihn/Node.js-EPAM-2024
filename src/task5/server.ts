import http from 'http';
import Constants from './constants';
import usersRouter from './users/router';
import hobbiesRouter from './hobbies/router';
import { badRequestResponse } from './utils';

const server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>): void => {
  if (!req.url) {
    badRequestResponse(res);
  } else if (req.url.includes(Constants.USERS_HOBBIES_API_URL)) {
    hobbiesRouter(req, res);
  } else {
    usersRouter(req, res);
  }
});

server.listen(Constants.PORT, (): void => {
  console.log(`Server is running on port ${Constants.PORT}`);
});
