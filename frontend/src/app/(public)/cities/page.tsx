"use client";

import { useState } from "react";
import { Badge, Button, Card } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

interface College {
  _id: string;
  name: string;
  slug: string;
  location: { city: string; state: string };
  type: "government" | "private" | "deemed" | "autonomous";
  rating: number;
  reviewCount: number;
  courses: { name: string; fees: { min: number; max: number } }[];
  featured: boolean;
}

const cities = [
  { name: "Delhi", state: "Delhi", count: 450, image: "🕌" },
  { name: "Mumbai", state: "Maharashtra", count: 380, image: "🏙️" },
  { name: "Bangalore", state: "Karnataka", count: 320, image: "🌆" },
  { name: "Chennai", state: "Tamil Nadu", count: 280, image: "🏖️" },
  { name: "Hyderabad", state: "Telangana", count: 250, image: "🏯" },
  { name: "Pune", state: "Maharashtra", count: 220, image: "🎓" },
  { name: "Kolkata", state: "West Bengal", count: 200, image: "🌉" },
  { name: "Ahmedabad", state: "Gujarat", count: 180, image: "🕉️" },
  { name: "Jaipur", state: "Rajasthan", count: 150, image: "🏰" },
  { name: "Chandigarh", state: "Punjab", count: 120, image: "🗿" },
  { name: "Coimbatore", state: "Tamil Nadu", count: 110, image: "🏭" },
  { name: "Bhopal", state: "Madhya Pradesh", count: 100, image: "🛕" },
];

const mockColleges: College[] = [
  { _id: "1", name: "Indian Institute of Technology Delhi", slug: "iit-delhi", location: { city: "Delhi", state: "Delhi" }, type: "government", rating: 4.7, reviewCount: 2200, courses: [{ name: "B.Tech", fees: { min: 200000, max: 250000 } }], featured: true },
  { _id: "2", name: "Jamia Millia Islamia", slug: "jmi-delhi", location: { city: "Delhi", state: "Delhi" }, type: "government", rating: 4.2, reviewCount: 1500, courses: [{ name: "BA", fees: { min: 10000, max: 50000 } }], featured: false },
  { _id: "3", name: "Delhi University", slug: "du-delhi", location: { city: "Delhi", state: "Delhi" }, type: "government", rating: 4.3, reviewCount: 3000, courses: [{ name: "B.Sc", fees: { min: 15000, max: 80000 } }], featured: true },
  { _id: "4", name: "Indian Institute of Technology Bombay", slug: "iit-bombay", location: { city: "Mumbai", state: "Maharashtra" }, type: "government", rating: 4.8, reviewCount: 2500, courses: [{ name: "B.Tech", fees: { min: 200000, max: 250000 } }], featured: true },
  { _id: "5", name: "St. Xavier's College", slug: "st-xaviers-mumbai", location: { city: "Mumbai", state: "Maharashtra" }, type: "private", rating: 4.5, reviewCount: 1800, courses: [{ name: "B.Com", fees: { min: 50000, max: 100000 } }], featured: true },
  { _id: "6", name: "SP Jain Institute of Management", slug: "sp-jain-mumbai", location: { city: "Mumbai", state: "Maharashtra" }, type: "private", rating: 4.4, reviewCount: 1200, courses: [{ name: "MBA", fees: { min: 400000, max: 600000 } }], featured: false },
];

export default function CitiesPage() {
  const [selectedState, setSelectedState] = useState("all");

  const filteredCities = selectedState === "all" 
    ? cities 
    : cities.filter(c => c.state === selectedState);

  const states = [...new Set(cities.map(c => c.state))];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">Colleges by City</Badge>
          <h1 className="text-4xl font-bold mb-4">Find Colleges in Top Cities</h1>
          <p className="text-xl text-primary-200 max-w-2xl">
            Explore best colleges in major Indian cities. Get detailed information about admissions, fees, and placements.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* State Filter */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-neutral-600">Filter by State:</span>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Cities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCities.map((city) => (
            <Link key={city.name} href={`/colleges?city=${city.name}`}>
              <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                <div className="text-5xl mb-4">{city.image}</div>
                <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {city.name}
                </h3>
                <p className="text-neutral-500 text-sm mb-3">{city.state}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{city.count} Colleges</Badge>
                  <span className="text-primary-600 text-sm">View All →</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Popular Colleges in Top Cities */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8">Popular Colleges in Top Cities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockColleges.map((college) => (
              <Link key={college._id} href={`/colleges/${college._id}`}>
                <Card className="p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {college.featured && <Badge variant="warning" size="sm" className="mb-2">Featured</Badge>}
                      <h4 className="font-semibold text-neutral-900">{college.name}</h4>
                      <p className="text-sm text-neutral-500">{college.location.city}, {college.location.state}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary-600">⭐ {college.rating}</div>
                      <p className="text-xs text-neutral-400">{college.reviewCount} reviews</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {college.courses.slice(0, 2).map((c) => (
                      <Badge key={c.name} variant="secondary" size="sm">{c.name}</Badge>
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}