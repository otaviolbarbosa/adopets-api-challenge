import { Router } from 'express';

import authMiddleware from '../app/middlewares/auth';
import UserController from '../app/controllers/UserController';
import ProductController from '../app/controllers/ProductController';

const routes = new Router();

// non authenticated routes
routes.get('/', (req, res) =>
  res.json({ message: 'Adopets Service - Only authorized access' })
);

routes.post('/signup', UserController.signUp);
routes.post('/signin', UserController.signIn);

routes.post('/signout', UserController.signOut);

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

export default routes;
