import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config";

export interface JwtPayload {
  id: string;
  role: string;
  verified?: boolean;
  [key: string]: any;
}

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  } as SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwt.secret) as JwtPayload;
};
