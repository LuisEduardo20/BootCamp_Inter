import { Request, Response, NextFunction } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import JWT from 'jsonwebtoken';

async function bearerAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  
  try {
    const authorizationHeader = req.headers['authorization'];

    if(!authorizationHeader) {
      throw new ForbiddenError('Credenciais não informadas');
    }

    const [authType, token] = authorizationHeader.split(' ');

    if(authType !== 'Bearer' || !token) {
      throw new ForbiddenError('Tipo de autenticação inválido');
    }

    const tokenPayload = JWT.verify(token, process.env.JWT_SECRET);

    if(typeof tokenPayload !== 'object' || !tokenPayload.sub) {
      throw new ForbiddenError('Token inválido');
    }
    
    const user = {
      uuid: tokenPayload.sub,
      username: tokenPayload.username,
    }

    req.user = user;

    next();
  }
  catch (err) {
    next(err);
  }

}

export default bearerAuthenticationMiddleware;