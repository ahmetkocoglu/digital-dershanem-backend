import express, { Application } from "express"
import cors, { CorsOptions } from "cors"
import morgan from 'morgan';
import Routes from "./routes"
import * as middlewares from './middlewares';
import dbConnection from './configs/dbConnection';
import fileUpload from 'express-fileupload';

export default class Server {
  constructor(app: Application) {
    this.syncDatabase();
    this.config(app);
    new Routes(app);
    this.middlewares(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:3020",
      optionsSuccessStatus: 200
    }

    app.use(fileUpload({
      limits: { fileSize: 1024 * 1024 },

      useTempFiles : true,
      tempFileDir : process.cwd() + '/tmp/'
    }));

    app.use(require('./middlewares/logger'));

    app.use(morgan('dev'));

    app.use(cors(corsOptions))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(require('./middlewares/authentication'))
}

  private middlewares(app: Application): void {
    app.use(middlewares.notFound);
    app.use(middlewares.errorHandler);
  }

  private syncDatabase(): void {
    dbConnection();
  }
}

/*
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

require('dotenv').config();
import * as middlewares from './middlewares';
import Routes from './routes';

const app = express();
const port = process.env.PORT || 4000;

app.use(require('./middlewares/logger'));

import dbConnection from './configs/dbConnection';
dbConnection();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json('Hello, TypeScript Node Express!');
});

app.use('/api/v1', Routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
*/