import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import DataBaseError from '../models/errors/database.error.model';
import ForbiddenError from '../models/errors/forbidden.error.model';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if(err instanceof DataBaseError) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
  else if(err instanceof ForbiddenError) {
    res.sendStatus(StatusCodes.FORBIDDEN);
  }
  else {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export default errorHandler;