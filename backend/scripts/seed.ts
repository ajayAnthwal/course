import mongoose from "mongoose";
import User from "../src/modules/user/model/user.model";
import College from "../src/modules/college/model/college.model";
import Category from "../src/modules/category/model/category.model";
import Blog from "../src/modules/blog/model/blog.model";
import News from "../src/modules/news/model/news.model";
import Testimonial from "../src/modules/testimonial/model/testimonial.model";
import connectDB from "../src/config/database";

function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const colleges = [
  {
    name: "Indian Institute of Technology Bombay",
    slug: toSlug("Indian Institute of Technology Bombay"),
    description: "IIT Bombay is a public engineering institution located in Powai, Mumbai. It is one of the oldest and most prestigious engineering institutions in India.",
    location: { city: "Mumbai", state: "Maharashtra", country: "India" },
    type: "government" as const,
    establishedYear: 1958,
    approvedBy: ["AICTE", "UGC", "NAAC"],
    courses: [
      { name: "Computer Science Engineering", duration: "4 years", fees: { min: 200000, max: 250000, currency: "INR" }, level: "undergraduate" as const },
      { name: "Mechanical Engineering", duration: "4 years", fees: { min: 200000, max: 250000, currency: "INR" }, level: "undergraduate" as const },
      { name: "MBA", duration: "2 years", fees: { min: 800000, max: 1200000, currency: "INR" }, level: "postgraduate" as const },
    ],
    facilities: ["Library", "Hostel", "Sports Complex", "Labs", "WiFi"],
    rating: 4.8,
    reviewCount: 1250,
    entranceExams: ["JEE Advanced"],
    website: "https://www.iitb.ac.in",
    featured: true,
    verified: true,
  },
  {
    name: "Delhi University",
    slug: toSlug("Delhi University"),
    description: "The University of Delhi is a premier university of the country and is known for its high standards in teaching and research.",
    location: { city: "New Delhi", state: "Delhi", country: "India" },
    type: "government" as const,
    establishedYear: 1922,
    approvedBy: ["UGC", "NAAC"],
    courses: [
      { name: "B.Com (Hons)", duration: "3 years", fees: { min: 15000, max: 50000, currency: "INR" }, level: "undergraduate" as const },
      { name: "BA English", duration: "3 years", fees: { min: 15000, max: 50000, currency: "INR" }, level: "undergraduate" as const },
      { name: "M.Com", duration: "2 years", fees: { min: 20000, max: 60000, currency: "INR" }, level: "postgraduate" as const },
    ],
    facilities: ["Library", "Hostel", "Sports Complex", "WiFi", "Cafeteria"],
    rating: 4.5,
    reviewCount: 3200,
    entranceExams: ["CUET"],
    website: "https://www.du.ac.in",
    featured: true,
    verified: true,
  },
  {
    name: "Indian Institute of Management Ahmedabad",
    slug: toSlug("Indian Institute of Management Ahmedabad"),
    description: "IIM Ahmedabad is a public business school located in Ahmedabad, Gujarat. It is consistently ranked among the top business schools in India.",
    location: { city: "Ahmedabad", state: "Gujarat", country: "India" },
    type: "government" as const,
    establishedYear: 1961,
    approvedBy: ["AICTE", "AACSB", "EQUIS"],
    courses: [
      { name: "PGP (MBA)", duration: "2 years", fees: { min: 2300000, max: 2500000, currency: "INR" }, level: "postgraduate" as const },
    ],
    facilities: ["Library", "Hostel", "Sports Complex", "Labs", "WiFi", "Auditorium"],
    rating: 4.9,
    reviewCount: 890,
    entranceExams: ["CAT"],
    website: "https://www.iima.ac.in",
    featured: true,
    verified: true,
  },
  {
    name: "BITS Pilani",
    slug: toSlug("BITS Pilani"),
    description: "Birla Institute of Technology and Science, Pilani is a private deemed university focusing on higher education in engineering and sciences.",
    location: { city: "Pilani", state: "Rajasthan", country: "India" },
    type: "deemed" as const,
    establishedYear: 1964,
    approvedBy: ["UGC", "NAAC"],
    courses: [
      { name: "Computer Science Engineering", duration: "4 years", fees: { min: 1800000, max: 2200000, currency: "INR" }, level: "undergraduate" as const },
      { name: "Electrical Engineering", duration: "4 years", fees: { min: 1800000, max: 2200000, currency: "INR" }, level: "undergraduate" as const },
    ],
    facilities: ["Library", "Hostel", "Sports Complex", "Labs", "WiFi"],
    rating: 4.6,
    reviewCount: 1100,
    entranceExams: ["BITSAT"],
    website: "https://www.bits-pilani.ac.in",
    featured: true,
    verified: true,
  },
  {
    name: "Vellore Institute of Technology",
    slug: toSlug("Vellore Institute of Technology"),
    description: "VIT University is a private research university located in Vellore, Tamil Nadu. Known for its strong industry connections.",
    location: { city: "Vellore", state: "Tamil Nadu", country: "India" },
    type: "private" as const,
    establishedYear: 1984,
    approvedBy: ["AICTE", "UGC", "NAAC"],
    courses: [
      { name: "Computer Science Engineering", duration: "4 years", fees: { min: 198000, max: 340000, currency: "INR" }, level: "undergraduate" as const },
    ],
    facilities: ["Library", "Hostel", "Sports Complex", "Labs", "WiFi"],
    rating: 4.3,
    reviewCount: 2800,
    entranceExams: ["VITEEE"],
    website: "https://vit.ac.in",
    featured: false,
    verified: true,
  },
  {
    name: "SRM Institute of Science and Technology",
    slug: toSlug("SRM Institute of Science and Technology"),
    description: "SRM Institute is a private deemed university located in Chennai, Tamil Nadu, India.",
    location: { city: "Chennai", state: "Tamil Nadu", country: "India" },
    type: "private" as const,
    establishedYear: 1985,
    approvedBy: ["AICTE", "UGC", "NAAC"],
    courses: [
      { name: "Computer Science Engineering", duration: "4 years", fees: { min: 250000, max: 400000, currency: "INR" }, level: "undergraduate" as const },
    ],
    facilities: ["Library", "Hostel", "Labs", "WiFi"],
    rating: 4.1,
    reviewCount: 1900,
    entranceExams: ["SRMJEEE"],
    website: "https://www.srmist.edu.in",
    featured: false,
    verified: true,
  },
];

const seed = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await College.deleteMany({});
    await Category.deleteMany({});
    await Blog.deleteMany({});
    await News.deleteMany({});
    await Testimonial.deleteMany({});

    // Create users
    await User.create([
      { name: "Admin User", email: "admin@education.com", password: "Admin@123", role: "admin", phone: "9876543210" },
      { name: "Test Student", email: "student@education.com", password: "Student@123", role: "student", phone: "9876543211" },
      { name: "Test College Admin", email: "college@education.com", password: "College@123", role: "college", phone: "9876543212" },
      { name: "Test Teacher", email: "teacher@education.com", password: "Teacher@123", role: "teacher", phone: "9876543213" },
    ]);

    // Seed colleges
    await College.insertMany(colleges);

    // Seed categories
    await Category.insertMany([
      { name: "Engineering", slug: "engineering", icon: "⚙️", color: "#6366f1", count: 2500, description: "Engineering and technology programs" },
      { name: "Management", slug: "management", icon: "📊", color: "#10b981", count: 1200, description: "MBA and business management programs" },
      { name: "Medical", slug: "medical", icon: "🩺", color: "#f43f5e", count: 800, description: "Medical and healthcare programs" },
      { name: "Law", slug: "law", icon: "⚖️", color: "#f59e0b", count: 600, description: "Legal studies and law programs" },
      { name: "Design", slug: "design", icon: "🎨", color: "#8b5cf6", count: 400, description: "Design and creative arts programs" },
      { name: "Science", slug: "science", icon: "🔬", color: "#06b6d4", count: 1800, description: "Pure and applied science programs" },
    ]);

    // Seed news
    await News.insertMany([
      { title: "JEE Main 2026 Registration Opens", slug: "jee-main-2026-registration-opens", excerpt: "The NTA has opened registration for JEE Main 2026. Here is everything you need to know.", content: "The National Testing Agency (NTA) has officially opened the registration window for JEE Main 2026. Students can apply through the official website. The exam will be conducted in two sessions - January and April 2026. Key dates include registration deadline, admit card release, and result declaration.", category: "Exam Updates", author: "Admin", readTime: "5 min read", featured: true, publishedAt: new Date("2026-03-28") },
      { title: "Top 10 Engineering Colleges: NIRF Rankings 2026", slug: "top-10-engineering-colleges-nirf-rankings-2026", excerpt: "IIT Madras retains the top spot in the latest NIRF engineering rankings.", content: "The National Institutional Ranking Framework (NIRF) has released its 2026 rankings for engineering institutions across India. IIT Madras continues to hold the number one position, followed by IIT Bombay and IIT Delhi.", category: "Rankings", author: "Admin", readTime: "8 min read", featured: true, publishedAt: new Date("2026-03-25") },
      { title: "CAT 2026 Pattern Changes Announced", slug: "cat-2026-pattern-changes-announced", excerpt: "IIM has announced significant changes to the CAT 2026 exam pattern.", content: "The Indian Institutes of Management have announced major changes to the Common Admission Test (CAT) 2026 pattern. The exam will now include a new section on data interpretation and logical reasoning.", category: "Exam Updates", author: "Admin", readTime: "4 min read", featured: false, publishedAt: new Date("2026-03-22") },
    ]);

    // Seed blogs
    await Blog.insertMany([
      { title: "How to Choose the Right Engineering College", slug: "how-to-choose-the-right-engineering-college", excerpt: "A comprehensive guide to selecting the best engineering college based on your goals and preferences.", content: "<p>Choosing the right engineering college is one of the most important decisions in a student's life. Here are the key factors to consider:</p><h3>1. Accreditation and Rankings</h3><p>Always check if the college is accredited by NAAC, NBA, or AICTE.</p><h3>2. Placement Records</h3><p>Look at the placement statistics of the last 3-5 years.</p><h3>3. Faculty Quality</h3><p>Research the qualifications and experience of the faculty members.</p>", category: "Education", author: "Admin", readTime: "6 min read", featured: true, tags: ["Engineering", "College Selection"], publishedAt: new Date("2026-03-20") },
      { title: "Top Skills Every MBA Graduate Needs in 2026", slug: "top-skills-every-mba-graduate-needs-2026", excerpt: "The business world is evolving rapidly. Here are the skills that will set MBA graduates apart.", content: "<p>In today's rapidly changing business landscape, MBA graduates need more than just textbook knowledge.</p><h3>1. Data Analytics</h3><p>Understanding data and making data-driven decisions is crucial.</p><h3>2. Digital Marketing</h3><p>Digital channels dominate marketing strategies.</p>", category: "Career", author: "Admin", readTime: "5 min read", featured: false, tags: ["MBA", "Career"], publishedAt: new Date("2026-03-18") },
      { title: "NEET 2026 Preparation Strategy", slug: "neet-2026-preparation-strategy", excerpt: "A month-by-month preparation plan to crack NEET 2026 with a top rank.", content: "<p>NEET is one of the most competitive exams in India. Here is a comprehensive preparation strategy:</p><h3>Months 1-3: Foundation Building</h3><p>Focus on NCERT textbooks for Physics, Chemistry, and Biology.</p>", category: "Exam Tips", author: "Admin", readTime: "10 min read", featured: false, tags: ["NEET", "Medical"], publishedAt: new Date("2026-03-15") },
    ]);

    // Seed testimonials
    await Testimonial.insertMany([
      { name: "Priya Sharma", role: "B.Tech Student, IIT Delhi", content: "EduPortal helped me find the perfect college. The detailed information and counseling made my decision easy.", rating: 5 },
      { name: "Rahul Verma", role: "MBA Student, IIM Ahmedabad", content: "The college comparison feature is incredible. I could compare fees, placements, and ratings side by side.", rating: 5 },
      { name: "Ananya Patel", role: "Medical Student, AIIMS", content: "From exam preparation to college selection, EduPortal guided me through every step of my journey.", rating: 5 },
      { name: "Vikram Singh", role: "Law Student, NLS Bangalore", content: "The exam preparation resources and college listings were extremely helpful for my CLAT preparation.", rating: 4 },
    ]);

    console.log("");
    console.log("==========================================");
    console.log("  Database seeded successfully!");
    console.log("==========================================");
    console.log("  Admin:    admin@education.com / Admin@123");
    console.log("  Student:  student@education.com / Student@123");
    console.log("  College:  college@education.com / College@123");
    console.log("  Teacher:  teacher@education.com / Teacher@123");
    console.log("==========================================");
    console.log("");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seed();
