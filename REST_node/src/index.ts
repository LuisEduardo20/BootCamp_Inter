import express, { Request, Response, NextFunction } from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

//? Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//? Rotas do usuário
app.use(usersRoute);
app.use(statusRoute);

//? Handlers de erro
app.use(errorHandler);

//? Configuração de porta
app.listen(3000, () => {
  console.log('Aplicação executando na porta 3000');
});