import Document, { IDocument } from "../model/document.model";
import AppError from "../../../utils/appError";
import mongoose from "mongoose";

interface GetDocumentsQuery {
  page?: string;
  limit?: string;
  category?: string;
  type?: string;
  status?: string;
  entityId?: string;
  search?: string;
}

class DocumentService {
  async getAllDocuments(query: GetDocumentsQuery) {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "20", 10);
    const skip = (page - 1) * limit;

    const filter: any = { isActive: true };

    if (query.category) filter.category = query.category;
    if (query.type) filter.type = query.type;
    if (query.status) filter.status = query.status;
    if (query.entityId) filter.entityId = new mongoose.Types.ObjectId(query.entityId);
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { originalName: { $regex: query.search, $options: "i" } },
      ];
    }

    const [documents, total] = await Promise.all([
      Document.find(filter)
        .populate("uploadedBy", "name email")
        .populate("verifiedBy", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Document.countDocuments(filter),
    ]);

    return {
      documents,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getDocumentById(id: string): Promise<IDocument> {
    const document = await Document.findById(id)
      .populate("uploadedBy", "name email")
      .populate("verifiedBy", "name");
    if (!document) throw new AppError("Document not found", 404);
    return document;
  }

  async createDocument(data: Partial<IDocument>): Promise<IDocument> {
    return Document.create(data);
  }

  async updateDocument(id: string, data: Partial<IDocument>): Promise<IDocument> {
    const document = await Document.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!document) throw new AppError("Document not found", 404);
    return document;
  }

  async deleteDocument(id: string): Promise<void> {
    const document = await Document.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!document) throw new AppError("Document not found", 404);
  }

  async verifyDocument(id: string, status: "approved" | "rejected", reason?: string, adminId: string): Promise<IDocument> {
    const updateData: any = {
      status,
      verifiedBy: adminId,
      verifiedAt: new Date(),
    };
    if (status === "rejected" && reason) {
      updateData.rejectionReason = reason;
    }

    const document = await Document.findByIdAndUpdate(id, updateData, { new: true })
      .populate("uploadedBy", "name email")
      .populate("verifiedBy", "name");
    if (!document) throw new AppError("Document not found", 404);
    return document;
  }

  async getStats() {
    const [total, pending, approved, rejected] = await Promise.all([
      Document.countDocuments({ isActive: true }),
      Document.countDocuments({ isActive: true, status: "pending" }),
      Document.countDocuments({ isActive: true, status: "approved" }),
      Document.countDocuments({ isActive: true, status: "rejected" }),
    ]);

    const categoryBreakdown = await Document.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    return {
      total,
      pending,
      approved,
      rejected,
      categoryBreakdown: categoryBreakdown.map((c) => ({ category: c._id, count: c.count })),
    };
  }
}

export default new DocumentService();