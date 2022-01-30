import { Router, Request, Response, NextFunction, response } from "express";
import StatusCode from 'http-status-codes';

//TODO get /users
//TODO get /users/:uid
//TODO post /users
//TODO put /users/:uid
//TODO delete /users/:uid

const usersRoute = Router();

usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
  const users = [ { name: "Eduardo" } ];

  res.status(StatusCode.OK).send(users);
});


usersRoute.get('/users/:uid', (req: Request<{ uid: string }>, res: Response, next: NextFunction) => {
  const uid = req.params.uid;

  res.status(StatusCode.OK).send({ uid });
});


usersRoute.post('/users', (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body;

  res.status(StatusCode.CREATED).send(newUser);
});


usersRoute.put('/users/:uid', (req: Request<{ uid: string }>, res: Response, next: NextFunction) => {
  const uid = req.params.uid;
  const modifiedUser = req.body;

  res.status(StatusCode.OK).send({ uid });
});


usersRoute.delete('/users/:uid', (req: Request<{ uid: string }>, res: Response, next: NextFunction) => {
  const uid = req.params.uid;

  res.sendStatus(StatusCode.OK);
});


export default usersRoute;
