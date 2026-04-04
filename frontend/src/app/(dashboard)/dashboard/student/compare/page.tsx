"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input } from "@/components/ui";
import { useColleges } from "@/features/colleges";
import { FiStar, FiX, FiPlus, FiSearch, FiMapPin, FiHome, FiTrendingUp } from "react-icons/fi";

interface CompareItem {
  _id: string;
  name: string;
  type: string;
  city: string;
  state: string;
  rating: number;
  fees: string;
  established: number;
  courses: string[];
}

export default function ComparePage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [compareList, setCompareList] = useState<CompareItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const { data: collegesData, isLoading } = useColleges({
    search: searchQuery,
    limit: 20,
  });

  useEffect(() => {
    const addId = searchParams.get("add");
    if (addId && compareList.length < 4) {
      const college = (collegesData as any)?.data?.find((c: any) => c._id === addId);
      if (college && !compareList.find((c) => c._id === addId)) {
        setCompareList([...compareList, {
          _id: college._id,
          name: college.name,
          type: college.type,
          city: college.location?.city,
          state: college.location?.state,
          rating: college.rating,
          fees: college.feeStructure?.min ? `₹${college.feeStructure.min.toLocaleString()}` : "N/A",
          established: college.establishedYear,
          courses: college.courses?.slice(0, 3).map((c: any) => c.name) || [],
        }]);
      }
    }
  }, [searchParams, collegesData]);

  const addToCompare = (college: any) => {
    if (compareList.length >= 4) {
      alert("Maximum 4 colleges can be compared");
      return;
    }
    if (compareList.find((c) => c._id === college._id)) return;
    
    setCompareList([...compareList, {
      _id: college._id,
      name: college.name,
      type: college.type,
      city: college.location?.city,
      state: college.location?.state,
      rating: college.rating,
      fees: college.feeStructure?.min ? `₹${college.feeStructure.min.toLocaleString()}` : "N/A",
      established: college.establishedYear,
      courses: college.courses?.slice(0, 3).map((c: any) => c.name) || [],
    }]);
    setShowSearch(false);
  };

  const removeFromCompare = (id: string) => {
    setCompareList(compareList.filter((c) => c._id !== id));
  };

  const comparisonFields = [
    { label: "Type", key: "type" },
    { label: "Location", key: "location" },
    { label: "Rating", key: "rating", render: (v: number) => v ? <span className="flex items-center gap-1"><FiStar className="w-4 h-4 text-yellow-500" /> {v}/5</span> : "N/A" },
    { label: "Established", key: "established" },
    { label: "Course Fees", key: "fees" },
    { label: "Top Courses", key: "courses", render: (v: string[]) => v?.join(", ") || "N/A" },
  ];

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Compare Colleges</h1>
            <p className="text-sm text-gray-600">Compare up to 4 colleges side by side</p>
          </div>
          <Button onClick={() => setShowSearch(!showSearch)} leftIcon={showSearch ? <FiX className="w-4 h-4" /> : <FiPlus className="w-4 h-4" />}>
            {showSearch ? "Close Search" : "Add College"}
          </Button>
        </div>

        {showSearch && (
          <Card>
            <CardHeader>
              <CardTitle>Add College to Compare</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Search colleges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="max-h-64 overflow-y-auto space-y-2">
                {isLoading ? (
                  <p className="text-center py-4 text-gray-500">Loading...</p>
                ) : ((collegesData as any)?.data || []).length === 0 ? (
                  <p className="text-center py-4 text-gray-500">No colleges found</p>
                ) : (
                  ((collegesData as any)?.data || []).map((college: any) => (
                    <div
                      key={college._id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                      onClick={() => addToCompare(college)}
                    >
                      <div>
                        <p className="font-medium text-gray-900">{college.name}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <FiMapPin className="w-3 h-3" /> {college.location?.city}, {college.location?.state}
                        </p>
                      </div>
                      <Badge variant="secondary">{college.type}</Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {compareList.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Colleges to Compare</h3>
              <p className="text-gray-500 mb-4">Add colleges from your wishlist or search to compare them</p>
              <Button onClick={() => setShowSearch(true)}>Add College</Button>
            </CardContent>
          </Card>
        ) : (
          <Card padding="none">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-4 font-medium text-gray-600">Feature</th>
                    {compareList.map((college) => (
                      <th key={college._id} className="text-left p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{college.name}</p>
                            <p className="text-xs text-gray-500">{college.city}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeFromCompare(college._id)}
                          >
                            <FiX className="w-4 h-4" />
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFields.map((field) => (
                    <tr key={field.key} className="border-b border-gray-200">
                      <td className="p-4 font-medium text-gray-600">{field.label}</td>
                      {compareList.map((college: any) => (
                        <td key={college._id} className="p-4 text-gray-900">
                          {field.render 
                            ? field.render(college[field.key as keyof typeof college])
                            : (college[field.key as keyof typeof college] || "N/A")
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-4 font-medium text-gray-600">Actions</td>
                    {compareList.map((college) => (
                      <td key={college._id} className="p-4">
                        <Link href={`/colleges/${college._id}`}>
                          <Button variant="outline" size="sm">View Details</Button>
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}