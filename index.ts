
import express from "express";
import { sessionChecker } from "./middlewares";
import {
  HomeController,
  UserController,
} from "./controllers";


const app = express();
const port = process.env.PORT || 3000;


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("*", sessionChecker);

// Routes
const homeController = new HomeController();
const userController = new UserController();

app.use("/", homeController.router);
app.use("/users", userController.router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
