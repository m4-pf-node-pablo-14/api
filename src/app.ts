import express from 'express';
import 'express-async-errors';
import handleError from './errors/handleError';
import exampleLoginRouter from './routes/examplesLogin.routes';
import exampleMessageRouter from './routes/examplesMessages.routes';
import exampleUserRouter from './routes/examplesUsers.routes';

const app = express();

app.use(express.json());

app.use('/examples', exampleMessageRouter);
app.use('/examples', exampleUserRouter);
app.use('/examples', exampleLoginRouter);

app.use(handleError);

export default app;
