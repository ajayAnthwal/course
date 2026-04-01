import mongoose from "mongoose";
import User from "../src/modules/user/model/user.model";
import College from "../src/modules/college/model/college.model";
import connectDB from "../src/config/database";

const colleges = [
  {
    name: "Indian Institute of Technology Bombay",
    description:
      "IIT Bombay is a public engineering institution located in Powai, Mumbai. It is one of the oldest and most prestigious engineering institutions in India.",
    location: { city: "Mumbai", state: "Maharashtra", country: "India" },
    type: "government",
    establishedYear: 1958,
    approvedBy: ["AICTE", "UGC", "NAAC"],
    courses: [
      {
        name: "Computer Science Engineering",
        duration: "4 years",
        fees: { min: 200000, max: 250000, currency: "INR" },
        level: "undergraduate",
      },
      {
        name: "Mechanical Engineering",
        duration: "4 years",
        fees: { min: 200000, max: 250000, currency: "INR" },
        level: "undergraduate",
      },
      {
        name: "MBA",
        duration: "2 years",
        fees: { min: 800000, max: 1200000, currency: "INR" },
        level: "postgraduate",
      },
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
    description:
      "The University of Delhi is a premier university of the country and is known for its high standards in teaching and research and attracts eminent scholars to its faculty.",
    location: { city: "New Delhi", state: "Delhi", country: "India" },
    type: "government",
    establishedYear: 1922,
    approvedBy: ["UGC", "NAAC"],
    courses: [
      {
        name: "B.Com (Hons)",
        duration: "3 years",
        fees: { min: 15000, max: 50000, currency: "INR" },
        level: "undergraduate",
      },
      {
        name: "BA English",
        duration: "3 years",
        fees: { min: 15000, max: 50000, currency: "INR" },
        level: "undergraduate",
      },
      {
        name: "M.Com",
        duration: "2 years",
        fees: { min: 20000, max: 60000, currency: "INR" },
        level: "postgraduate",
      },
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
    description:
      "IIM Ahmedabad is a public business school located in Ahmedabad, Gujarat, India. It is consistently ranked among the top business schools in India and Asia.",
    location: { city: "Ahmedabad", state: "Gujarat", country: "India" },
    type: "government",
    establishedYear: 1961,
    approvedBy: ["AICTE", "AACSB", "EQUIS"],
    courses: [
      {
        name: "PGP (MBA)",
        duration: "2 years",
        fees: { min: 2300000, max: 2500000, currency: "INR" },
        level: "postgraduate",
      },
      {
        name: "FPM (PhD)",
        duration: "4-5 years",
        fees: { min: 500000, max: 800000, currency: "INR" },
        level: "doctorate",
      },
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
    description:
      "Birla Institute of Technology and Science, Pilani is a private deemed university in Pilani, India. It focuses primarily on higher education in engineering and sciences.",
    location: { city: "Pilani", state: "Rajasthan", country: "India" },
    type: "deemed",
    establishedYear: 1964,
    approvedBy: ["UGC", "NAAC"],
    courses: [
      {
        name: "Computer Science Engineering",
        duration: "4 years",
        fees: { min: 1800000, max: 2200000, currency: "INR" },
        level: "undergraduate",
      },
      {
        name: "Electrical Engineering",
        duration: "4 years",
        fees: { min: 1800000, max: 2200000, currency: "INR" },
        level: "undergraduate",
      },
    ],
    facilities: ["Library", "Hostel", "Sports Complex", "Labs", "WiFi", "Research Centers"],
    rating: 4.6,
    reviewCount: 1100,
    entranceExams: ["BITSAT"],
    website: "https://www.bits-pilani.ac.in",
    featured: true,
    verified: true,
  },
  {
    name: "Vellore Institute of Technology",
    description:
      "VIT University is a private research university located in Vellore, Tamil Nadu. Known for its strong industry connections and international collaborations.",
    location: { city: "Vellore", state: "Tamil Nadu", country: "India" },
    type: "private",
    establishedYear: 1984,
    approvedBy: ["AICTE", "UGC", "NAAC"],
    courses: [
      {
        name: "Computer Science Engineering",
        duration: "4 years",
        fees: { min: 198000, max: 340000, currency: "INR" },
        level: "undergraduate",
      },
      {
        name: "Biotechnology",
        duration: "4 years",
        fees: { min: 198000, max: 340000, currency: "INR" },
        level: "undergraduate",
      },
    ],
    facilities: ["Library", "Hostel", "Sports Complex", "Labs", "WiFi", "Gym"],
    rating: 4.3,
    reviewCount: 2800,
    entranceExams: ["VITEEE"],
    website: "https://vit.ac.in",
    featured: false,
    verified: true,
  },
  {
    name: "SRM Institute of Science and Technology",
    description:
      "SRM Institute of Science and Technology is a private deemed university located in Chennai, Tamil Nadu, India.",
    location: { city: "Chennai", state: "Tamil Nadu", country: "India" },
    type: "private",
    establishedYear: 1985,
    approvedBy: ["AICTE", "UGC", "NAAC"],
    courses: [
      {
        name: "Computer Science Engineering",
        duration: "4 years",
        fees: { min: 250000, max: 400000, currency: "INR" },
        level: "undergraduate",
      },
      {
        name: "Medicine (MBBS)",
        duration: "5.5 years",
        fees: { min: 2500000, max: 3000000, currency: "INR" },
        level: "undergraduate",
      },
    ],
    facilities: ["Library", "Hostel", "Sports Complex", "Labs", "WiFi", "Hospital"],
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

    // Create admin user
    await User.create({
      name: "Admin User",
      email: "admin@education.com",
      password: "Admin@123",
      role: "admin",
      phone: "9876543210",
    });

    // Create test users
    await User.create({
      name: "Test Student",
      email: "student@education.com",
      password: "Student@123",
      role: "student",
      phone: "9876543211",
    });

    await User.create({
      name: "Test College Admin",
      email: "college@education.com",
      password: "College@123",
      role: "college",
      phone: "9876543212",
    });

    await User.create({
      name: "Test Teacher",
      email: "teacher@education.com",
      password: "Teacher@123",
      role: "teacher",
      phone: "9876543213",
    });

    // Seed colleges
    await College.insertMany(colleges);

    console.log("Database seeded successfully!");
    console.log("Admin: admin@education.com / Admin@123");
    console.log("Student: student@education.com / Student@123");
    console.log("College: college@education.com / College@123");
    console.log("Teacher: teacher@education.com / Teacher@123");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seed();
