import { Router, Request, Response, NextFunction, response } from "express";
import StatusCode from 'http-status-codes';
import errorHandler from "../middlewares/error-handler.middleware";
import userRepository from "../repositorie/user.repository";

const usersRoute = Router();

//? GET ALL USERS
usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  const users = await userRepository.findAllUsers();
  
  res.status(StatusCode.OK).send(users);
});


//? GET SPECIFIC USER
usersRoute.get('/users/:uuuid', async (req: Request<{ uuuid: string }>, res: Response, next: NextFunction) => {
  try {
    const uuid = req.params.uuuid;
    
    const user = await userRepository.findUserById(uuid);
    
    res.status(StatusCode.OK).send(user);
  }
  catch (err) {
    next(err);
  }
});


//? CREATE USER
usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body;
  
  const uuid = await userRepository.createUser(newUser);
  
  res.status(StatusCode.CREATED).send(uuid);
});


//? UPDATE USER
usersRoute.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;
  const modifiedUser = req.body;

  modifiedUser.uuid = uuid;

  await userRepository.updateUser(modifiedUser);
  
  res.status(StatusCode.OK).send();
});


//? DELETE USER
usersRoute.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;

  await userRepository.deleteUser(uuid);

  res.sendStatus(StatusCode.OK);
});


export default usersRoute;
