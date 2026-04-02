import { Request, Response, NextFunction } from "express";
type AsyncFn = (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const catchAsync: (fn: AsyncFn) => (req: Request, res: Response, next: NextFunction) => void;
export default catchAsync;
//# sourceMappingURL=catchAsync.d.ts.map