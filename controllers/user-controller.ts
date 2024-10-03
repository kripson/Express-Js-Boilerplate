import { Request, Response, Router } from "express";
import { Ioc } from "../ioc/ioc";
import { schemas } from "../database/schema";
import { eq, sql } from "drizzle-orm";
import db from "../database/db";

export class UserController {
  router: Router;

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  // Set up routes for CRUD operations
  private setupRoutes() {
    this.router.post("/getAll", this.getUsers);
    this.router.post("/", this.createUser);
    this.router.put("/:id", this.updateUser);
  }

  // Retrieve all users
  public getUsers(_req: Request, res: Response) {
    //TODO:implement filtering
    //server response messages can be made enums or internationalisation can be done instead of hard coded strings
    
    const allUsers = db.select().from(schemas.users);

    res.status(200).send({
      status: 200,
      data: allUsers,
      message: "Users fetched successfully",
    });
  }

  // Create a new user
  public createUser = async (req: Request, res: Response) => {
    const { email, name } = req.body;

    const newUser = {
      name,
      email,
    };

    const { validationHelper } = new Ioc().getMapping();

    const validity = validationHelper.validate({
      schema: "users",
      action: "create",
      data: newUser,
    });

    if (validity.valid) {
      //server response messages can be made enums or internationalisation can be done instead of hard coded strings
      await db.insert(schemas.users).values(newUser);

      res.status(200).send({
        status: 200,
        data: [newUser],
        message: "User created successfully",
      });
    } else {
      res.status(400).send({
        status: 400,
        errors: validity.errors,
        message: "Validation Error",
      });
    }
  };

  // Update an existing user
  public updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send("No user id found in the request");
    }

    const { validationHelper } = new Ioc().getMapping();

    const validity = validationHelper.validate({
      schema: "users",
      action: "update",
      data: req.body,
    });

    if (validity.valid) {
      const updatedUser = await db
        .update(schemas.users)
        .set({
          ...req.body,
          updatedAt: sql`NOW()`,
        })
        .where(eq(schemas.users.id, Number(id)))
        .returning();
      //server response messages can be made enums or internationalisation can be done instead of hard coded strings

      res.status(200).send({
        status: 200,
        data: [updatedUser],
        message: "User updated successfully",
      });
    } else {
      //server response messages can be made enums or internationalisation can be done instead of hard coded strings
      res.status(400).send({
        status: 400,
        errors: validity.errors,
        message: "Validation Error",
      });
    }
  };
}
