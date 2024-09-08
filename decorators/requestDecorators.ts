import { Request, Response, NextFunction } from 'express';

export function timeRequest(_target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const result = originalMethod.apply(this, [req, res, next]);
    const end = Date.now();
    console.log(`${propertyKey} execution time: ${end - start}ms`);

    //do something with the time log
    return result;
  };

  return descriptor;
}

export function checkSession(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (req: Request, res: Response, next: NextFunction) {
    // This is a simple check. In a real application, you'd implement proper session validation
    if (!req.headers['session-token']) {
      return res.status(401).json({ error: 'Unauthorized: No session token provided' });
    }
    return originalMethod.apply(this, [req, res, next]);
  };

  return descriptor;
}