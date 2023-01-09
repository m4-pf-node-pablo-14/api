import express from 'express';
import 'express-async-errors';
import handleError from './errors/handleError';
import exampleRouter from './routes/examples.routes';

const app = express();

app.use(express.json());

app.use('/examples', exampleRouter);

app.use(handleError);

export default app;
