# Express.js RESTful API Boilerplate

This project is a boilerplate for creating RESTful APIs using Express.js and TypeScript. It includes a basic setup with decorators for request timing and session checking.

## Features

- Express.js server setup
- TypeScript support
- Environment variable configuration with dotenv
- Custom decorators for request timing and session checking
- ESLint for code linting
- Nodemon for development hot-reloading

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

- `index.ts`: Main application file
- `controllers/`: Contains controller classes
- `decorators/`: Custom TypeScript decorators
- `dist/`: Compiled JavaScript files (generated after build)

## Decorators

This project includes two custom decorators:

1. `@timeRequest`: Logs the execution time of a controller method.
2. `@checkSession`: Checks for a session token in the request headers.

Example usage in a controller:

```typescript
import { timeRequest, checkSession } from '../decorators/requestDecorators';
export class SomeController {
@timeRequest
@checkSession
public someMethod(req: Request, res: Response): void {
// Method implementation
}
}   
```
    

