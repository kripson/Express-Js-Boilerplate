import { Request, Response } from 'express';
import { timeRequest, checkSession } from '../decorators/requestDecorators';

export class HomeController {
  @timeRequest
  @checkSession
  public index(_req: Request, res: Response): void {
    res.send('Welcome to the home page!');
  }
}