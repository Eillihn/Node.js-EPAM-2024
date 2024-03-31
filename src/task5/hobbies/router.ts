import http from 'http';
import { badRequestResponse, getUserIdFromURL, parseRequestBody, setResponseData, unsupportedMethodResponse, userNotExistResponse } from '../utils';
import { createHobbiesLinks, getUserHobbiesNames, patchUserHobbies } from './service';
import { createUserLinks, getUser, isUserExist } from '../users/service';
import { PatchHobbies } from './model';

export default (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
  switch (req.method) {
    case 'GET':
      getMethod(req, res);
      break;
    case 'PATCH':
      patchMethod(req, res);
      break;
    default:
      unsupportedMethodResponse(res);
  }
};

function getMethod(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>): void {
  const userIdParam = getUserIdFromURL(req.url!);
  if (!isUserExist(userIdParam)) {
    userNotExistResponse(res, userIdParam);
  } else {
    setResponseData(
      res,
      200,
      {
        data: {
          hobbies: getUserHobbiesNames(userIdParam),
          links: createHobbiesLinks(userIdParam),
        },
        error: null,
      },
      'private, max-age=3600',
    );
  }
}

async function patchMethod(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>): Promise<void> {
  const userIdParam = getUserIdFromURL(req.url!);
  const parsedBody = await parseRequestBody(req);
  if (!(parsedBody && typeof parsedBody === 'object' && 'hobbies' in parsedBody)) {
    badRequestResponse(res);
  } else if (!isUserExist(userIdParam)) {
    userNotExistResponse(res, userIdParam);
  } else {
    const data: PatchHobbies = parsedBody as PatchHobbies;
    patchUserHobbies(userIdParam, data.hobbies!);
    setResponseData(
      res,
      200,
      {
        data: {
          user: getUser(userIdParam)!,
          links: createUserLinks(userIdParam),
        },
        error: null,
      },
      '',
    );
  }
}
