import { Response, NextFunction } from "express";
export declare const protect: (req: import("express").Request, res: Response, next: NextFunction) => void;
export declare const restrictTo: (...roles: string[]) => (req: any, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map