"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@/components/ui";

const wishlist = [
  { id: "1", collegeName: "BITS Pilani", city: "Pilani", course: "B.Tech CSE", fees: "₹4,00,000", rating: 4.5, logo: "🎓" },
  { id: "2", collegeName: "VIT Vellore", city: "Vellore", course: "B.Tech CSE", fees: "₹3,50,000", rating: 4.2, logo: "🏛️" },
  { id: "3", collegeName: "Manipal Academy", city: "Manipal", course: "B.Tech", fees: "₹4,20,000", rating: 4.3, logo: "🎓" },
  { id: "4", collegeName: "SRM Institute", city: "Chennai", course: "B.Tech CSE", fees: "₹3,80,000", rating: 4.1, logo: "🏛️" },
];

function StudentWishlistPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">My Wishlist</h1>
          <p className="text-neutral-500">Colleges you've saved for comparison</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <Card key={item.id} hover>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{item.logo}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900">{item.collegeName}</h3>
                    <p className="text-sm text-neutral-500">{item.city}</p>
                    <p className="text-sm text-neutral-600 mt-2">{item.course}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-medium text-neutral-700">{item.fees}</span>
                      <span className="text-sm text-yellow-500">⭐ {item.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link href={`/colleges/${item.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">View</Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Compare Colleges</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <div className="text-4xl mb-4">⚖️</div>
            <p className="text-neutral-500 mb-4">Select up to 4 colleges to compare</p>
            <Link href="/compare">
              <Button>Go to Compare</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function WishlistPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentWishlistPage />
    </ProtectedRoute>
  );
}

export default WishlistPage;