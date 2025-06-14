import express from "express";
import 'reflect-metadata';
import { AppDataSource } from './config/ormconfig';
import { router } from './routes';

const PORT = process.env.PORT ?? 4000;

async function boostrap() {
  // Initialize DB
  await AppDataSource.initialize();
  console.log("Database initialized");

  // Start express
  const app = express();
  app.use(express.json());
  app.use('/api', router);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

boostrap().catch((error) => {
  console.log(error);
  process.exit(1);
});