import { Request, Response, Router } from "express";

export class HomeController {
  router: Router;

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get("/", this.index);
  }

  index = (_req: Request, res: Response): void => {
    res.send(`Welcome to the home route!`);
  };
}
