"use client";

import Link from "next/link";
import { Card, Badge } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import type { College } from "@/types";

interface CollegeCardProps {
  college: College;
}

const typeColors: Record<string, "success" | "primary" | "warning" | "secondary"> = {
  government: "success",
  private: "primary",
  deemed: "warning",
  autonomous: "secondary",
};

export function CollegeCard({ college }: CollegeCardProps) {
  const lowestFee = college.courses?.reduce((min, course) => {
    return course.fees?.min < min ? course.fees.min : min;
  }, Infinity);

  return (
    <Card hover padding="none" className="overflow-hidden group">
      {/* Cover Image / Placeholder */}
      <div className="relative h-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700" />
        {college.coverImage ? (
          <img
            src={college.coverImage}
            alt={college.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center relative">
            <span className="text-white/10 text-7xl font-bold select-none">
              {college.name.charAt(0)}
            </span>
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          {college.verified && (
            <Badge variant="success" size="sm" className="shadow-sm">
              <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified
            </Badge>
          )}
          {college.featured && (
            <Badge variant="warning" size="sm" className="shadow-sm">
              <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-neutral-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors leading-snug">
          {college.name}
        </h3>

        <div className="flex items-center gap-1.5 text-sm text-neutral-500 mb-3">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{college.location.city}, {college.location.state}</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Badge variant={typeColors[college.type] || "default"} size="sm">
            {college.type.charAt(0).toUpperCase() + college.type.slice(1)}
          </Badge>
          {college.establishedYear && (
            <span className="text-xs text-neutral-400">
              Est. {college.establishedYear}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1 bg-secondary-50 px-2.5 py-1 rounded-lg">
            <svg className="w-3.5 h-3.5 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-semibold text-secondary-700">{college.rating}</span>
          </div>
          <span className="text-xs text-neutral-400">
            ({college.reviewCount} reviews)
          </span>
        </div>

        {/* Courses */}
        {college.courses?.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-neutral-400 mb-1.5 font-medium uppercase tracking-wider">Popular Courses</p>
            <div className="flex flex-wrap gap-1.5">
              {college.courses.slice(0, 3).map((course, index) => (
                <span
                  key={index}
                  className="text-xs bg-neutral-50 text-neutral-600 px-2.5 py-1 rounded-lg border border-neutral-100"
                >
                  {course.name}
                </span>
              ))}
              {college.courses.length > 3 && (
                <span className="text-xs text-neutral-400 px-2.5 py-1">
                  +{college.courses.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Fee & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <div>
            <p className="text-xs text-neutral-400">Fees from</p>
            <p className="text-base font-bold text-neutral-900">
              {lowestFee !== Infinity ? formatCurrency(lowestFee) : "N/A"}
            </p>
          </div>
          <Link
            href={`/colleges/${college._id}`}
            className="flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors group/link"
          >
            View Details
            <svg className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </Card>
  );
}
