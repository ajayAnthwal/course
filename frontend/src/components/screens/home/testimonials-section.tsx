"use client";

import { Badge, Card } from "@/components/ui";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3 tracking-tight">
            Loved by Students Across India
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Join thousands of students who found their dream college through EduPortal.
          </p>
        </div>
        {testimonials.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t._id} hover padding="lg">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-accent-400 text-sm">⭐</span>
                  ))}
                </div>
                <p className="text-neutral-600 leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{t.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-neutral-400">
            <p className="text-lg">No testimonials yet</p>
          </div>
        )}
      </div>
    </section>
  );
}
