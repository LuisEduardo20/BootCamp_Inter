import express, { Request, Response, NextFunction } from 'express';
import basicAuthenticationMiddleware from './middlewares/basic-authentication.middleware';
import errorHandler from './middlewares/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const port = process.env.PORT || 3002;

const app = express();

//? Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//? Rotas do usuário
app.use(basicAuthenticationMiddleware);
app.use(usersRoute);
app.use(statusRoute);
app.use(authorizationRoute);

//? Handlers de erro
app.use(errorHandler);

//? Configuração de porta
app.listen(port, () => {
  console.log(`Aplicação executando na porta ${port}`);
});