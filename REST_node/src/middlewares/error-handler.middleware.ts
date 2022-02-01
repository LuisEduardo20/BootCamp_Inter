import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import DataBaseError from '../models/errors/database.error.model';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if(err instanceof DataBaseError) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
  else {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export default errorHandler;