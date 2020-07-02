import './boostrap';

import express from 'express';
import morgan from 'morgan';
import 'express-async-error';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes';

class App {
  constructor() {
    this.app = express();

    this.middlewares();
    this.initMongo();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
  }

  initMongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }

  routes() {
    this.app.use('/api', routes);
  }
}

export default new App().app;
