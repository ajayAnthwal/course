import Testimonial, { ITestimonial } from "../model/testimonial.model";
import AppError from "../../../utils/appError";

class TestimonialService {
  async getAll(query: { page?: string; limit?: string }) {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "20", 10);
    const skip = (page - 1) * limit;

    const filter: any = { isActive: true };

    const [testimonials, total] = await Promise.all([
      Testimonial.find(filter).sort({ rating: -1, createdAt: -1 }).skip(skip).limit(limit),
      Testimonial.countDocuments(filter),
    ]);

    return { testimonials, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getById(id: string): Promise<ITestimonial> {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) throw new AppError("Testimonial not found", 404);
    return testimonial;
  }

  async create(data: Partial<ITestimonial>): Promise<ITestimonial> {
    return Testimonial.create(data);
  }

  async update(id: string, data: Partial<ITestimonial>): Promise<ITestimonial> {
    const testimonial = await Testimonial.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!testimonial) throw new AppError("Testimonial not found", 404);
    return testimonial;
  }

  async delete(id: string): Promise<void> {
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) throw new AppError("Testimonial not found", 404);
  }
}

export default new TestimonialService();
