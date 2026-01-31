import { NextFunction, Request, Response } from "express";
import { auth as xAuth } from "../lib/auth";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await xAuth.api.getSession({
        headers: req.headers as any,
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!",
        });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email verification required. Please verify your email!",
        });
      }

      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as string,
        emailVerified: session.user.emailVerified,
      };
      if (roles.length > 0 && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message:
            "Forbidden! You don't have permission to access this resources!",
        });
      }
      next();
    } catch (error) {
      console.log("ERROR Happened", error);
      next(error);
    }
  };
};
export default auth;
