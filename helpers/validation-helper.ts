import { z } from "zod";
import { schemas } from "../database/schema";

//database actions
type DataBaseAction = "create" | "update" | "delete";

// Mapping of models to their respective schema for each database action
type SchemaMapping = Map<
  keyof typeof schemas,
  {
    [key in DataBaseAction]?: z.AnyZodObject; // Using z.AnyZodObject for flexibility
  }
>;

// ValidationHelper class for managing schema validation
export class ValidationHelper {
  private schemaMapping: SchemaMapping = new Map([
    [
      "users",
      {
        create: z.object({
          // Schema for creating a User
          name: z.string({ message: "Name is a required field" }).min(1),
          email: z
            .string({ message: "Email is a required field" })
            .email({ message: "Invalid format" }),
        }),
        update: z.object({
          // Schema for updating a User
          //optional since partial update might not have all fields
          name: z
            .string({ message: "Id is a required field" })
            .min(1)
            .optional(),
          email: z
            .string({ message: "Id is a required field" })
            .email()
            .optional(),
          id: z.number({ message: "Id is a required field" }).int().positive(),
          updatedAt: z.number().optional(),
        }),
      },
    ],
  ]);

  // Method to validate data against the schema for a given model and action
  public validate(validationRequestObj: {
    schema: keyof typeof schemas;
    action: DataBaseAction;
    data: any;
  }) {
    try {
      const { schema, action, data } = validationRequestObj;

      const validationSchema = this.schemaMapping.get(schema)?.[action]; // Retrieving the schema for the given model and action

      if (!validationSchema) {
        return {
          valid: false,
          errors: [`No schema found for ${schema} and ${action}`], // Error message for missing schema
        };
      }

      validationSchema.parse(data); // Parsing the data against the schema

      return {
        valid: true, // Validation successful
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          valid: false,
          errors: error.errors.map((e) => {
            return e.path[0] + " : " + e.message; // Formatting error messages
          }),
        };
      } else {
        return {
          valid: false,
          errors: [error instanceof Error ? error.message : String(error)], // Handling non-ZodError errors
        };
      }
    }
  }
}
