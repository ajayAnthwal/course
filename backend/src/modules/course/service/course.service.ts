import Course, { ICourse } from "../model/course.model";
import AppError from "../../../utils/appError";

interface GetCoursesQuery {
  page?: string;
  limit?: string;
  search?: string;
  category?: string;
  level?: string;
  featured?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

class CourseService {
  async getAllCourses(query: GetCoursesQuery) {
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

    const [courses, total] = await Promise.all([
      Course.find(filter).sort(sort).skip(skip).limit(limit),
      Course.countDocuments(filter),
    ]);

    return { courses, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getCourseById(id: string): Promise<ICourse> {
    const course = await Course.findById(id);
    if (!course) throw new AppError("Course not found", 404);
    return course;
  }

  async getCourseBySlug(slug: string): Promise<ICourse> {
    const course = await Course.findOne({ slug, isActive: true });
    if (!course) throw new AppError("Course not found", 404);
    return course;
  }

  async getFeaturedCourses(): Promise<ICourse[]> {
    return Course.find({ featured: true, isActive: true }).sort({ rating: -1 }).limit(8);
  }

  async getCourseStats() {
    const [total, ug, pg] = await Promise.all([
      Course.countDocuments({ isActive: true }),
      Course.countDocuments({ level: "undergraduate", isActive: true }),
      Course.countDocuments({ level: "postgraduate", isActive: true }),
    ]);
    return { total, undergraduate: ug, postgraduate: pg };
  }

  async createCourse(data: Partial<ICourse>): Promise<ICourse> {
    return Course.create(data);
  }

  async updateCourse(id: string, data: Partial<ICourse>): Promise<ICourse> {
    const course = await Course.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!course) throw new AppError("Course not found", 404);
    return course;
  }

  async deleteCourse(id: string): Promise<void> {
    const course = await Course.findByIdAndDelete(id);
    if (!course) throw new AppError("Course not found", 404);
  }
}

export default new CourseService();
