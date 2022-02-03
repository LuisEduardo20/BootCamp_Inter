import {  } from 'express';
import { Request, Response, NextFunction } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import userRepository from '../repositorie/user.repository';

async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers['authorization'];
  
    if(!authorizationHeader) {
      throw new ForbiddenError('Credenciais não informadas');
    }
    
    const [authType, token] = authorizationHeader.split(' ');
    
    if(authType !== 'Basic' || !token) {
      throw new ForbiddenError('Tipo de autenticação inválido');
    }
    
    const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
    
    const [username, password] = tokenContent.split(':')
    
    if(!username || !password) {
      throw new ForbiddenError('Credenciais não informadas');
    }
    
    const user = await userRepository.findByUsernameAndPassword(username, password);
    
    if(!user) {
      throw new ForbiddenError('Usuário ou senha inválidos!');
    }

    req.user = user;

    next();
  }
  catch (err) {
    next(err);
  }
}

export default basicAuthenticationMiddleware;