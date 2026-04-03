import { Request, Response, NextFunction } from "express";
import documentService from "../service/document.service";
import catchAsync from "../../../utils/catchAsync";

export const getAllDocuments = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const result = await documentService.getAllDocuments(req.query as any);
  res.status(200).json({
    success: true,
    message: "Documents retrieved successfully",
    data: result.documents,
    pagination: result.pagination,
  });
});

export const getDocumentById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const document = await documentService.getDocumentById(req.params.id);
  res.status(200).json({
    success: true,
    message: "Document retrieved successfully",
    data: document,
  });
});

export const createDocument = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const data: any = { ...req.body };
  if (req.file) {
    data.fileUrl = `/uploads/${req.file.filename}`;
    data.originalName = req.file.originalname;
    data.mimeType = req.file.mimetype;
    data.size = req.file.size;
  }
  if (req.user?.id) data.uploadedBy = req.user.id;
  const document = await documentService.createDocument(data);
  res.status(201).json({
    success: true,
    message: "Document uploaded successfully",
    data: document,
  });
});

export const updateDocument = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const document = await documentService.updateDocument(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Document updated successfully",
    data: document,
  });
});

export const deleteDocument = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  await documentService.deleteDocument(req.params.id);
  res.status(200).json({ success: true, message: "Document deleted successfully" });
});

export const verifyDocument = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { status, reason } = req.body;
  const document = await documentService.verifyDocument(
    req.params.id,
    status,
    reason,
    req.user?.id
  );
  res.status(200).json({
    success: true,
    message: `Document ${status} successfully`,
    data: document,
  });
});

export const getDocumentStats = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const stats = await documentService.getStats();
  res.status(200).json({
    success: true,
    message: "Document stats retrieved successfully",
    data: stats,
  });
});