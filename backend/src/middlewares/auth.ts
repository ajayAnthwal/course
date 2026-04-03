import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import User from "../modules/user/model/user.model";

export const protect = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("You are not logged in. Please log in to get access.", 401));
  }

  const decoded = verifyToken(token);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("The user belonging to this token no longer exists.", 401));
  }

  req.user = { id: currentUser._id.toString(), role: currentUser.role };
  next();
});

export const restrictTo = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to perform this action.", 403));
    }
    next();
  };
};

export const authenticate = protect;
export const authorize = restrictTo;
