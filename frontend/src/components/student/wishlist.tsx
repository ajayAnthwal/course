"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@/components/ui";
import { Pagination } from "@/components/ui/pagination";
import { useWishlist, useWishlistStats, useRemoveFromWishlist } from "@/features/wishlist/hooks/useWishlist";
import { FiHeart, FiTrash2, FiEye, FiMinimize2, FiMapPin, FiStar } from "react-icons/fi";

export function StudentWishlist() {
  const { user } = useAuth();
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
      onSuccess: () => {},
      onError: () => {},
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-sm text-gray-600">Colleges you have saved for comparison</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{stats?.total || 0}</p>
          <p className="text-sm text-gray-500">Saved Colleges</p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <FiHeart className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-gray-600 mb-4">No colleges in your wishlist</p>
            <Link href="/colleges">
              <Button>Browse Colleges</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any) => (
            <Card key={item._id} hover className="overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-indigo-100 to-indigo-50 relative">
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
                <h3 className="font-semibold text-gray-900 truncate">{item.college?.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <FiMapPin className="w-3 h-3" />
                  {item.college?.location?.city}, {item.college?.location?.state}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-medium text-amber-500 flex items-center gap-1">
                    <FiStar className="w-4 h-4" /> {item.college?.rating || "N/A"}
                  </span>
                  <span className="text-sm text-gray-500">{item.college?.type}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link href={`/colleges/${item.college?._id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <FiEye className="w-4 h-4 mr-1" /> View
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => handleRemove(item.college?._id, item.college?.name)}
                    disabled={removeFromWishlist.isPending}
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Compare Colleges</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FiMinimize2 className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-4">Select up to 4 colleges to compare side by side</p>
          <Link href="/dashboard/student/compare">
            <Button>Go to Compare</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}