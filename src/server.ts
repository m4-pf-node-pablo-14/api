import app from './app';
import AppDataSource from './data-source';
import 'dotenv/config';

const port = parseInt(process.env.PORT) || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected!');
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
