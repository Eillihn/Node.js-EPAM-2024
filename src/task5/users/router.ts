import * as http from 'http';
import { badRequestResponse, getUserIdFromURL, parseRequestBody, setResponseData, unsupportedMethodResponse, userNotExistResponse } from '../utils';
import { PostUser, User } from './model';
import { addUser, createUser, createUserLinks, deleteUser, getAllUsers, isUserExist } from './service';

export default (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
  switch (req.method) {
    case 'POST':
      postMethod(req, res);
      break;
    case 'GET':
      getMethod(req, res);
      break;
    case 'DELETE':
      deleteMethod(req, res);
      break;
    default:
      unsupportedMethodResponse(res);
  }
};

async function postMethod(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>): Promise<void> {
  const parsedBody = await parseRequestBody(req);
  if (parsedBody && typeof parsedBody === 'object' && 'name' in parsedBody && 'email' in parsedBody) {
    const data: PostUser = parsedBody as PostUser;
    const user: User = createUser(data);
    addUser(user);
    setResponseData(
      res,
      201,
      {
        data: {
          user,
          links: createUserLinks(user.id),
        },
        error: null,
      },
      '',
    );
  } else {
    badRequestResponse(res);
  }
}

function deleteMethod(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>): void {
  const userIdParam = getUserIdFromURL(req.url!);
  if (!isUserExist(userIdParam)) {
    userNotExistResponse(res, userIdParam);
  } else {
    deleteUser(userIdParam);
    setResponseData(
      res,
      200,
      {
        data: { success: true },
        error: null,
      },
      '',
    );
  }
}

function getMethod(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>): void {
  setResponseData(
    res,
    200,
    {
      data: getAllUsers().map((user: User) => ({ user, links: createUserLinks(user.id) })),
      error: null,
    },
    'public, max-age=3600',
  );
}
