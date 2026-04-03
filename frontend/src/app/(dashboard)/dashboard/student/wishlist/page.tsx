"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Button, useToast, Badge } from "@/components/ui";
import { useWishlist, useWishlistStats, useRemoveFromWishlist } from "@/features/wishlist/hooks/useWishlist";

function StudentWishlistPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [page, setPage] = useState(1);
  
  const { data: wishlistData, isLoading } = useWishlist({ page, limit: 12 });
  const { data: statsData } = useWishlistStats();
  const removeFromWishlist = useRemoveFromWishlist();

  const items = wishlistData?.data || [];
  const pagination = wishlistData?.pagination;
  const stats = statsData?.data;

  const handleRemove = (collegeId: string, collegeName: string) => {
    if (!confirm(`Remove ${collegeName} from wishlist?`)) return;
    removeFromWishlist.mutate(collegeId, {
      onSuccess: () => showToast("Removed from wishlist", "success"),
      onError: () => showToast("Failed to remove", "error"),
    });
  };

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">My Wishlist</h1>
            <p className="text-neutral-500">Colleges you've saved for comparison</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-neutral-900">{stats?.total || 0}</p>
            <p className="text-sm text-neutral-500">Saved Colleges</p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-neutral-500">Loading...</div>
        ) : items.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">❤️</div>
              <p className="text-neutral-500 mb-4">No colleges in your wishlist</p>
              <Link href="/colleges">
                <Button>Browse Colleges</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item: any) => (
              <Card key={item._id} hover className="overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-primary-100 to-primary-50 relative">
                  {item.college?.coverImage && (
                    <img 
                      src={item.college.coverImage} 
                      alt={item.college.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary">{item.college?.type}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-neutral-900 truncate">{item.college?.name}</h3>
                  <p className="text-sm text-neutral-500">{item.college?.location?.city}, {item.college?.location?.state}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-medium text-yellow-500">⭐ {item.college?.rating || "N/A"}</span>
                    <span className="text-sm text-neutral-500">{item.college?.type}</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Link href={`/colleges/${item.college?._id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">View</Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500"
                      onClick={() => handleRemove(item.college?._id, item.college?.name)}
                      disabled={removeFromWishlist.isPending}
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-neutral-500">
              Page {page} of {pagination.totalPages}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={page >= pagination.totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Compare Colleges</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <div className="text-4xl mb-4">⚖️</div>
            <p className="text-neutral-500 mb-4">Select up to 4 colleges to compare side by side</p>
            <Link href="/dashboard/student/compare">
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