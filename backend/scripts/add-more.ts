import mongoose from "mongoose";
import Blog from "../src/modules/blog/model/blog.model";
import Testimonial from "../src/modules/testimonial/model/testimonial.model";
import News from "../src/modules/news/model/news.model";
import connectDB from "../src/config/database";

const addMore = async () => {
  try {
    await connectDB();

    await Blog.insertMany([
      { title: "CUET 2026: Complete Guide to Central University Admissions", slug: "cuet-2026-complete-guide-central-university-admissions", excerpt: "Everything you need to know about CUET 2026 - syllabus, pattern, preparation tips, and top universities accepting CUET scores.", content: "<p>CUET (Common University Entrance Test) has become the single gateway for admissions to all central universities in India. Here is your complete guide.</p><h3>What is CUET?</h3><p>CUET is conducted by NTA for admission to undergraduate programs in 45+ central universities including Delhi University, JNU, BHU, and more.</p><h3>Exam Pattern</h3><p>The exam consists of three sections: Language, Domain Subjects, and General Test. It is conducted in CBT mode.</p><h3>Top Universities</h3><p>Delhi University, JNU, BHU, Jamia Millia Islamia, AMU, and many more accept CUET scores.</p>", category: "Exam Tips", author: "Admin", readTime: "8 min read", featured: true, tags: ["CUET", "Admissions", "Central Universities"], publishedAt: new Date("2026-03-10") },
      { title: "Scholarships for Indian Students in 2026: Complete List", slug: "scholarships-indian-students-2026-complete-list", excerpt: "A comprehensive list of government and private scholarships available for Indian students in 2026.", content: "<p>Education costs are rising, but scholarships can make quality education accessible. Here is a curated list of scholarships for 2026.</p><h3>Government Scholarships</h3><ul><li>National Scholarship Portal - Merit-cum-Means Scholarship</li><li>Central Sector Scholarship Scheme</li><li>Post-Matric Scholarship for SC/ST/OBC</li></ul><h3>Private Scholarships</h3><ul><li>Tata Scholarship</li><li>Reliance Foundation Scholarship</li><li>HDFC Educational Crisis Scholarship</li></ul><h3>International Scholarships</h3><ul><li>Chevening Scholarship (UK)</li><li>Fulbright Scholarship (USA)</li><li>DAAD Scholarship (Germany)</li></ul>", category: "Education", author: "Admin", readTime: "7 min read", featured: false, tags: ["Scholarships", "Financial Aid", "Education"], publishedAt: new Date("2026-03-08") },
      { title: "Career Options After 12th: A Complete Roadmap", slug: "career-options-after-12th-complete-roadmap", excerpt: "Confused about what to do after 12th? Explore all career paths across science, commerce, and arts streams.", content: "<p>Choosing the right career path after 12th is crucial. Here is a comprehensive roadmap for every stream.</p><h3>Science Stream</h3><p>Engineering (B.Tech), Medical (MBBS), Research (BSc), Architecture, Data Science, and more.</p><h3>Commerce Stream</h3><p>CA, CS, B.Com, BBA, Economics Hons, Finance, and Banking.</p><h3>Arts Stream</h3><p>Law (BA LLB), Design, Mass Communication, Psychology, UPSC, and Teaching.</p><h3>Emerging Careers</h3><p>AI/ML, Cybersecurity, Digital Marketing, UX Design, and Blockchain are high-demand fields.</p>", category: "Career", author: "Admin", readTime: "9 min read", featured: true, tags: ["Career", "After 12th", "Guidance"], publishedAt: new Date("2026-03-05") },
      { title: "How to Crack JEE Advanced: Tips from Toppers", slug: "how-to-crack-jee-advanced-tips-from-toppers", excerpt: "JEE Advanced toppers share their preparation strategies, study plans, and tips for scoring high.", content: "<p>JEE Advanced is one of the toughest engineering entrance exams. Here are proven strategies from top rankers.</p><h3>Study Plan</h3><p>Dedicate 6-8 hours daily. Focus on conceptual understanding rather than rote learning. Solve previous 10 years papers.</p><h3>Subject-wise Tips</h3><p><strong>Physics:</strong> Focus on Mechanics and Electrodynamics. HC Verma is essential.</p><p><strong>Chemistry:</strong> NCERT is the bible. Practice organic reaction mechanisms daily.</p><p><strong>Maths:</strong> Practice is key. Solve problems from Cengage and Arihant series.</p><h3>Common Mistakes</h3><p>Don't ignore NCERT. Don't skip mock tests. Don't burn out before the exam.</p>", category: "Exam Tips", author: "Admin", readTime: "11 min read", featured: false, tags: ["JEE", "Engineering", "Preparation"], publishedAt: new Date("2026-03-01") },
    ]);

    await Testimonial.insertMany([
      { name: "Sneha Gupta", role: "B.Com Student, SRCC Delhi", content: "The college comparison tool helped me choose between SRCC and LSR. EduPortal made the admission process so much easier with their step-by-step guidance.", rating: 5 },
      { name: "Arjun Reddy", role: "B.Tech Student, IIT Madras", content: "I used EduPortal to research all IITs before making my choice. The placement data and campus reviews were incredibly helpful.", rating: 5 },
      { name: "Kavya Nair", role: "MBBS Student, CMC Vellore", content: "From NEET preparation tips to college selection, EduPortal was my go-to resource. Highly recommend for all medical aspirants!", rating: 4 },
      { name: "Rohan Joshi", role: "MBA Student, FMS Delhi", content: "The CAT preparation articles and college comparison features are top-notch. Helped me get into my dream B-school.", rating: 5 },
      { name: "Ishita Sharma", role: "BBA Student, Christ University", content: "EduPortal's counseling sessions were a game-changer. They helped me understand which course and college would be the best fit for my career goals.", rating: 4 },
      { name: "Aditya Kumar", role: "B.Sc Student, IISc Bangalore", content: "The detailed information about research programs and scholarships helped me secure admission at IISc. Thank you EduPortal!", rating: 5 },
    ]);

    await News.insertMany([
      { title: "NEET 2026 Syllabus Revised by NMC", slug: "neet-2026-syllabus-revised-nmc", excerpt: "The National Medical Commission has released the revised NEET 2026 syllabus with important changes in Physics and Chemistry.", content: "The NMC has announced significant revisions to the NEET 2026 syllabus. Changes include new topics in Modern Physics and updated Organic Chemistry chapters. Students should download the revised syllabus from the official website and adjust their preparation strategy accordingly.", category: "Exam Updates", author: "Admin", readTime: "4 min read", featured: false, publishedAt: new Date("2026-03-20") },
      { title: "IIT Bombay Placement 2026: Record Average Package", slug: "iit-bombay-placement-2026-record-average-package", excerpt: "IIT Bombay reports record-breaking placement season with average package crossing ₹30 LPA for the first time.", content: "IIT Bombay has concluded its 2026 placement season with remarkable results. The average CTC reached ₹30.5 LPA, a 20% increase from last year. Top recruiters included Google, Microsoft, Amazon, and Goldman Sachs. The highest domestic package was ₹2.1 Crore.", category: "Placements", author: "Admin", readTime: "3 min read", featured: false, publishedAt: new Date("2026-03-18") },
      { title: "CLAT 2027 Notification Released: Apply by June", slug: "clat-2027-notification-released-apply-by-june", excerpt: "The Consortium of NLUs has released the CLAT 2027 notification with important dates and eligibility criteria.", content: "The Consortium of National Law Universities has released the official notification for CLAT 2027. The exam will be held in December 2026. Registration opens in June 2026. Eligibility: 10+2 with 45% marks (40% for SC/ST).", category: "Exam Updates", author: "Admin", readTime: "3 min read", featured: false, publishedAt: new Date("2026-03-15") },
    ]);

    console.log("Additional data added successfully!");
    console.log("Blogs: 4 new");
    console.log("Testimonials: 6 new");
    console.log("News: 3 new");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

addMore();
