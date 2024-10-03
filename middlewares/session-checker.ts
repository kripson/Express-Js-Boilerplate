import { Request, Response, NextFunction } from "express";

export function sessionChecker(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // This is a simple check. In a real application, you'd implement proper session validation
  if (!req.headers["session-token"]) {
    res.status(401).json({ error: "Unauthorized: No session token provided" });
    return;
  }

  next();
}
