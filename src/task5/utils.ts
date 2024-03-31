import http from 'http';
import Constants from './constants.js';
import { User, UserLinks } from './users/model';
import { HobbiesLinks } from './hobbies/model';

interface SuccessDataResponse {
  success: true;
}
interface UserDataResponse {
  user: User;
  links: UserLinks;
}
interface HobbiesDataResponse {
  hobbies: string[];
  links: HobbiesLinks;
}

interface ResponseData {
  data: SuccessDataResponse | UserDataResponse | UserDataResponse[] | HobbiesDataResponse | null;
  error: string | null;
}

export const parseRequestBody = (req: http.IncomingMessage): Promise<Error | JSON> =>
  new Promise((resolve, reject): void => {
    let body = '';

    req.on('data', (chunk): void => {
      body += chunk.toString();
    });

    req.on('end', (): void => {
      resolve(JSON.parse(body));
    });

    req.on('error', (error: Error): void => {
      reject(error);
    });
  });

export const getUserIdFromURL = (url: string = ''): string => {
  const pathnameAfterUsersAPI = url.split(Constants.USERS_API_URL)[1];
  return pathnameAfterUsersAPI.split('/')[0];
};

export const setResponseData = (res: http.ServerResponse<http.IncomingMessage>, status: number, endData: ResponseData, cache: string): void => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    ...(cache && {
      'Cache-Control': cache,
    }),
  });
  res.end(JSON.stringify(endData));
};

export const unsupportedMethodResponse = (res: http.ServerResponse<http.IncomingMessage>): void => {
  setResponseData(
    res,
    404,
    {
      data: null,
      error: 'Unsupported Method',
    },
    '',
  );
};

export const badRequestResponse = (res: http.ServerResponse<http.IncomingMessage>): void => {
  setResponseData(
    res,
    400,
    {
      data: null,
      error: '',
    },
    'Bad request',
  );
};

export const userNotExistResponse = (res: http.ServerResponse<http.IncomingMessage>, userIdParam: string): void => {
  setResponseData(
    res,
    404,
    {
      data: null,
      error: `User with id ${userIdParam} doesn't exist`,
    },
    '',
  );
};
