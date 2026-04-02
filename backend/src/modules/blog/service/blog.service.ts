import Blog, { IBlog } from "../model/blog.model";
import AppError from "../../../utils/appError";

interface GetBlogQuery {
  page?: string;
  limit?: string;
  search?: string;
  category?: string;
  featured?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

class BlogService {
  async getAll(query: GetBlogQuery) {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "12", 10);
    const skip = (page - 1) * limit;

    const filter: any = { isActive: true };
    if (query.search) filter.$text = { $search: query.search };
    if (query.category) filter.category = { $regex: query.category, $options: "i" };
    if (query.featured) filter.featured = query.featured === "true";

    const sort: any = {};
    if (query.sortBy) {
      sort[query.sortBy] = query.sortOrder === "desc" ? -1 : 1;
    } else {
      sort.publishedAt = -1;
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter).sort(sort).skip(skip).limit(limit),
      Blog.countDocuments(filter),
    ]);

    return { blogs, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getById(id: string): Promise<IBlog> {
    const blog = await Blog.findById(id);
    if (!blog) throw new AppError("Blog not found", 404);
    return blog;
  }

  async getBySlug(slug: string): Promise<IBlog> {
    const blog = await Blog.findOne({ slug, isActive: true });
    if (!blog) throw new AppError("Blog not found", 404);
    return blog;
  }

  async getFeatured(): Promise<IBlog[]> {
    return Blog.find({ featured: true, isActive: true }).sort({ publishedAt: -1 }).limit(4);
  }

  async getLatest(limit = 6): Promise<IBlog[]> {
    return Blog.find({ isActive: true }).sort({ publishedAt: -1 }).limit(limit);
  }

  async create(data: Partial<IBlog>): Promise<IBlog> {
    return Blog.create(data);
  }

  async update(id: string, data: Partial<IBlog>): Promise<IBlog> {
    const blog = await Blog.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!blog) throw new AppError("Blog not found", 404);
    return blog;
  }

  async delete(id: string): Promise<void> {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) throw new AppError("Blog not found", 404);
  }
}

export default new BlogService();
