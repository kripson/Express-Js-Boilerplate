# Express.js RESTful API Boilerplate

This project is a boilerplate for creating RESTful APIs using Express.js and TypeScript. It includes several features and follows a structured approach to organizing code.

## Key Features

- Express.js Server Setup: The project sets up an Express server to handle HTTP requests.
- TypeScript Support: The code is written in TypeScript, providing type safety and better tooling.
- Environment Variable Configuration: Uses dotenv for managing environment variables.
- Postgres Database: Integrates with a Postgres database using drizzle as the ORM.
- Validation with Zod: Utilizes zod for data validation.
- ESLint for Code Linting: Ensures code quality and consistency.
- Nodemon for Development: Automatically restarts the server during development.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/expressjs-restful-boilerplate.git
   cd expressjs-restful-boilerplate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development

To run the server in development mode with hot-reloading:

```bash
npm run dev
```

### Production

To build and run the server in production mode:

```bash
npm run build
npm start
```

### Linting

To lint your code:

```bash
npm run lint
```

## Project Structure

### Project entry

- `index.ts`: Main application file

#### index.ts

Main application file that initializes the Express app and sets up middleware and routes.

#### controllers/

Contains controller classes that handle the logic for different routes.

#### helpers/

Contains helper classes for various utilities, such as validation.

#### ioc/

Implements a simplified version of Inversion of Control (IoC) pattern for managing dependencies.

#### middlewares/

Contains middleware functions for request processing.

#### dist/

Compiled JavaScript files generated after building the TypeScript code.

### Main Components

#### index.ts

- Initializes the Express app.
- Loads environment variables.
- Sets up middleware for JSON parsing and session checking.
- Defines routes using controller instances.

This file is the main entry file. It imports all of the middlewares and controllers and maps top level routes to specific controllers.

## Project architecture

1. Controllers:
   HomeController: Handles requests to the home route.
   UserController: Manages user-related operations (CRUD) and other end points for specific actions can be added.

2. Middlewares:
   sessionChecker: A middleware function that checks for a session token in the request headers.

3. Helpers:
   ValidationHelper: A helper class that uses zod to validate incoming data against defined schemas.
   
4. Database:
   db.ts: Sets up the database connection using drizzle-orm and Postgres.

5. Code Quality
   The project uses ESLint for linting and follows best practices for TypeScript development.
   The IoC pattern is implemented to manage dependencies, making the code more modular and testable.

The architecture is pretty straight forward. The index.ts file instantiates the express.js app and hooks all the middlewares to it. The incoming requests are routed to specific controllers which take care of the crud and other specific operations. They perform validation and other required checks/modifications using the helper classes. There is a special ioc class that provides all of the helper classes.
