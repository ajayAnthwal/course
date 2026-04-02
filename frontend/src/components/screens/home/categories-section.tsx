"use client";

import Link from "next/link";
import { Badge, Card, CardContent } from "@/components/ui";

interface Category {
  name: string;
  icon?: string;
  count?: number;
  color?: string;
}

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-4">Browse by Category</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3 tracking-tight">
            Explore Top Categories
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Find colleges and courses across various streams. We cover all major disciplines to help you make the right choice.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link key={cat.name} href="/colleges">
              <Card hover className="text-center group cursor-pointer">
                <CardContent>
                  <div
                    className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ background: cat.color || "#6366f1" }}
                  >
                    {cat.icon || "📁"}
                  </div>
                  <h3 className="font-semibold text-neutral-900 text-sm mb-1">{cat.name}</h3>
                  <p className="text-xs text-neutral-500">{cat.count}+ colleges</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
