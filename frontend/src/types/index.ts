export type UserRole = "admin" | "student" | "college" | "teacher";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface College {
  _id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  coverImage?: string;
  location: {
    city: string;
    state: string;
    country: string;
    address?: string;
    pincode?: string;
  };
  type: "government" | "private" | "deemed" | "autonomous";
  establishedYear: number;
  approvedBy: string[];
  courses: {
    name: string;
    duration: string;
    fees: {
      min: number;
      max: number;
      currency: string;
    };
    level: "undergraduate" | "postgraduate" | "diploma" | "doctorate";
  }[];
  facilities: string[];
  rankings: {
    source: string;
    rank: number;
    year: number;
  }[];
  rating: number;
  reviewCount: number;
  nirf?: {
    overall: number;
    engineering: number;
    management: number;
    pharmacy: number;
    medical: number;
  };
  entranceExams: string[];
  website?: string;
  email?: string;
  phone?: string;
  featured: boolean;
  verified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type LeadStatus = "new" | "contacted" | "interested" | "admitted" | "not_interested";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  college: College | string;
  course?: string;
  message?: string;
  source: string;
  status: LeadStatus;
  assignedTo?: User | string;
  createdBy?: User | string;
  followUpDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CollegeFilters {
  page?: number;
  limit?: number;
  search?: string;
  city?: string;
  state?: string;
  type?: string;
  course?: string;
  minFees?: number;
  maxFees?: number;
  minRating?: number;
  featured?: string | boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
