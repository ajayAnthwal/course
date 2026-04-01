import Exam, { IExam } from "../model/exam.model";
import AppError from "../../../utils/appError";

interface GetExamsQuery {
  page?: string;
  limit?: string;
  search?: string;
  category?: string;
  level?: string;
  featured?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

class ExamService {
  async getAllExams(query: GetExamsQuery) {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "12", 10);
    const skip = (page - 1) * limit;

    const filter: any = { isActive: true };
    if (query.search) filter.$text = { $search: query.search };
    if (query.category) filter.category = { $regex: query.category, $options: "i" };
    if (query.level) filter.level = query.level;
    if (query.featured) filter.featured = query.featured === "true";

    const sort: any = {};
    if (query.sortBy) {
      sort[query.sortBy] = query.sortOrder === "desc" ? -1 : 1;
    } else {
      sort.featured = -1;
      sort.rating = -1;
    }

    const [exams, total] = await Promise.all([
      Exam.find(filter).sort(sort).skip(skip).limit(limit),
      Exam.countDocuments(filter),
    ]);

    return { exams, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getExamById(id: string): Promise<IExam> {
    const exam = await Exam.findById(id);
    if (!exam) throw new AppError("Exam not found", 404);
    return exam;
  }

  async getExamBySlug(slug: string): Promise<IExam> {
    const exam = await Exam.findOne({ slug, isActive: true });
    if (!exam) throw new AppError("Exam not found", 404);
    return exam;
  }

  async getFeaturedExams(): Promise<IExam[]> {
    return Exam.find({ featured: true, isActive: true }).sort({ rating: -1 }).limit(8);
  }

  async createExam(data: Partial<IExam>): Promise<IExam> {
    return Exam.create(data);
  }

  async updateExam(id: string, data: Partial<IExam>): Promise<IExam> {
    const exam = await Exam.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!exam) throw new AppError("Exam not found", 404);
    return exam;
  }

  async deleteExam(id: string): Promise<void> {
    const exam = await Exam.findByIdAndDelete(id);
    if (!exam) throw new AppError("Exam not found", 404);
  }
}

export default new ExamService();
