import Category, { ICategory } from "../model/category.model";
import AppError from "../../../utils/appError";

class CategoryService {
  async getAll(query: { page?: string; limit?: string; search?: string }) {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "50", 10);
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.search) filter.name = { $regex: query.search, $options: "i" };

    const [categories, total] = await Promise.all([
      Category.find(filter).sort({ count: -1, name: 1 }).skip(skip).limit(limit),
      Category.countDocuments(filter),
    ]);

    return { categories, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getById(id: string): Promise<ICategory> {
    const category = await Category.findById(id);
    if (!category) throw new AppError("Category not found", 404);
    return category;
  }

  async create(data: Partial<ICategory>): Promise<ICategory> {
    return Category.create(data);
  }

  async update(id: string, data: Partial<ICategory>): Promise<ICategory> {
    const category = await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!category) throw new AppError("Category not found", 404);
    return category;
  }

  async delete(id: string): Promise<void> {
    const category = await Category.findByIdAndDelete(id);
    if (!category) throw new AppError("Category not found", 404);
  }
}

export default new CategoryService();
