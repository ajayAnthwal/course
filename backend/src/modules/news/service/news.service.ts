import News, { INews } from "../model/news.model";
import AppError from "../../../utils/appError";

interface GetNewsQuery {
  page?: string;
  limit?: string;
  search?: string;
  category?: string;
  featured?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

class NewsService {
  async getAllNews(query: GetNewsQuery) {
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

    const [articles, total] = await Promise.all([
      News.find(filter).sort(sort).skip(skip).limit(limit),
      News.countDocuments(filter),
    ]);

    return { articles, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getNewsById(id: string): Promise<INews> {
    const article = await News.findById(id);
    if (!article) throw new AppError("Article not found", 404);
    return article;
  }

  async getNewsBySlug(slug: string): Promise<INews> {
    const article = await News.findOne({ slug, isActive: true });
    if (!article) throw new AppError("Article not found", 404);
    return article;
  }

  async getFeaturedNews(): Promise<INews[]> {
    return News.find({ featured: true, isActive: true }).sort({ publishedAt: -1 }).limit(4);
  }

  async getLatestNews(limit = 6): Promise<INews[]> {
    return News.find({ isActive: true }).sort({ publishedAt: -1 }).limit(limit);
  }

  async createNews(data: Partial<INews>): Promise<INews> {
    return News.create(data);
  }

  async updateNews(id: string, data: Partial<INews>): Promise<INews> {
    const article = await News.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!article) throw new AppError("Article not found", 404);
    return article;
  }

  async deleteNews(id: string): Promise<void> {
    const article = await News.findByIdAndDelete(id);
    if (!article) throw new AppError("Article not found", 404);
  }
}

export default new NewsService();
