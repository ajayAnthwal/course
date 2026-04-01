import mongoose from "mongoose";
import User from "../src/modules/user/model/user.model";
import College from "../src/modules/college/model/college.model";
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

    // Create users
    await User.create([
      { name: "Admin User", email: "admin@education.com", password: "Admin@123", role: "admin", phone: "9876543210" },
      { name: "Test Student", email: "student@education.com", password: "Student@123", role: "student", phone: "9876543211" },
      { name: "Test College Admin", email: "college@education.com", password: "College@123", role: "college", phone: "9876543212" },
      { name: "Test Teacher", email: "teacher@education.com", password: "Teacher@123", role: "teacher", phone: "9876543213" },
    ]);

    // Seed colleges (slugs are pre-generated)
    await College.insertMany(colleges);

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
