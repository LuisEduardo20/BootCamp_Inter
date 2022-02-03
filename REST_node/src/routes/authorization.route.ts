import { StatusCodes } from 'http-status-codes';
import { Router, Request, Response, NextFunction } from 'express';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication.middleware';
import ForbiddenError from '../models/errors/forbidden.error.model';
import JWT from 'jsonwebtoken';

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if(!user) {
      throw new ForbiddenError('Usuário não informado');
    }

    const jwtPayload = { username: user.username };
    const jwtOptions = { subject: user?.uuid };
    const secretKey = process.env.JWT_SECRET;

    const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

    res.status(StatusCodes.OK).send({ token: jwt });
  }

  catch (err) {
    next(err);
  }
});

export default authorizationRoute;