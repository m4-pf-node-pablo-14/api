import express from 'express';
import 'express-async-errors';
import handleError from './errors/handleError';
import commentRouter from './routes/comments.routes';
import followRouter from './routes/follow.routes';
import interestRouter from './routes/interests.routes';
import likePostRouter from './routes/likePost.routes';
import likesCommentsRouter from './routes/likesComments.routes';
import loginRouter from './routes/login.routes';
import postRouter from './routes/posts.routes';
import userRouter from './routes/users.routes';

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/follow', followRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/like/post', likePostRouter);
app.use('/like/comment', likesCommentsRouter);
app.use('/interests',interestRouter)

app.use(handleError);

export default app;
