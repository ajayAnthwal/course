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

export interface Course {
  _id: string;
  name: string;
  slug: string;
  shortName: string;
  description: string;
  image?: string;
  category: string;
  level: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | "certificate";
  duration: string;
  durationYears: number;
  eligibility: string;
  admissionProcess: string;
  syllabus: { semester: string; subjects: string[] }[];
  careerOpportunities: string[];
  averageSalary: { min: number; max: number; currency: string };
  topRecruiters: string[];
  fees: { min: number; max: number; currency: string };
  entranceExams: string[];
  specializations: string[];
  collegeCount: number;
  rating: number;
  featured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Exam {
  _id: string;
  name: string;
  slug: string;
  fullName: string;
  description: string;
  image?: string;
  category: string;
  level: "national" | "state" | "university";
  conductingBody: string;
  mode: "computer-based" | "pen-paper" | "both";
  frequency: string;
  eligibility: string;
  syllabus: { subject: string; topics: string[] }[];
  examPattern: { section: string; questions: number; marks: number; duration: string }[];
  importantDates: { event: string; date: string }[];
  registrationFee: { amount: number; currency: string };
  website?: string;
  applicants: string;
  totalMarks: number;
  duration: string;
  languages: string[];
  rating: number;
  featured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
  author: string;
  authorAvatar?: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  isActive: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}
