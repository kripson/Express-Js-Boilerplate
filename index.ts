import express from 'express';
import dotenv from 'dotenv';
import { HomeController } from './controllers/HomeController';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const homeController = new HomeController();
app.get('/', homeController.index);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
