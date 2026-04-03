"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import {
  Card,
  CardContent,
  Button,
  Input,
  Select,
  Badge,
  Spinner,
  Modal,
  Textarea,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { useColleges, useCollegeStats, useCreateCollege, useUpdateCollege, useDeleteCollege } from "@/features/colleges";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { College } from "@/types";

const typeOptions = [
  { label: "All Types", value: "" },
  { label: "Government", value: "government" },
  { label: "Private", value: "private" },
  { label: "Deemed", value: "deemed" },
  { label: "Autonomous", value: "autonomous" },
];

const typeBadge: Record<string, { variant: "success" | "primary" | "warning" | "secondary" }> = {
  government: { variant: "success" },
  private: { variant: "primary" },
  deemed: { variant: "warning" },
  autonomous: { variant: "secondary" },
};

interface CollegeFormProps {
  college?: College | null;
  onClose: () => void;
  onSuccess: () => void;
}

function CollegeForm({ college, onClose, onSuccess }: CollegeFormProps) {
  const createCollege = useCreateCollege();
  const updateCollege = useUpdateCollege();
  const isEdit = !!college;

  const [form, setForm] = useState({
    name: college?.name || "",
    description: college?.description || "",
    type: college?.type || "private",
    establishedYear: college?.establishedYear || new Date().getFullYear(),
    city: college?.location?.city || "",
    state: college?.location?.state || "",
    country: college?.location?.country || "India",
    address: college?.location?.address || "",
    pincode: college?.location?.pincode || "",
    website: college?.website || "",
    email: college?.email || "",
    phone: college?.phone || "",
    featured: college?.featured || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim() || form.name.length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!form.description.trim() || form.description.length < 10) newErrors.description = "Description must be at least 10 characters";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (form.establishedYear < 1800 || form.establishedYear > new Date().getFullYear()) newErrors.establishedYear = "Invalid year";
    if (form.website && !/^https?:\/\/.+/.test(form.website)) newErrors.website = "Must be a valid URL";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Must be a valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const payload: any = {
      name: form.name,
      description: form.description,
      type: form.type,
      establishedYear: form.establishedYear,
      location: {
        city: form.city,
        state: form.state,
        country: form.country,
        address: form.address || undefined,
        pincode: form.pincode || undefined,
      },
      website: form.website || undefined,
      email: form.email || undefined,
      phone: form.phone || undefined,
      featured: form.featured,
    };

    if (isEdit) {
      updateCollege.mutate({ id: college._id, data: payload }, { onSuccess });
    } else {
      createCollege.mutate(payload, { onSuccess });
    }
  };

  const isPending = createCollege.isPending || updateCollege.isPending;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Input
            label="College Name"
            placeholder="Enter college name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            error={errors.name}
          />
        </div>
        <div className="sm:col-span-2">
          <Textarea
            label="Description"
            placeholder="Enter college description"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            error={errors.description}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Type</label>
          <Select value={form.type} onValueChange={(value) => setForm((f) => ({ ...f, type: value as any }))}>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              {typeOptions.filter((o) => o.value !== "").map((option) => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Input
          label="Established Year"
          type="number"
          min={1800}
          max={new Date().getFullYear()}
          value={form.establishedYear}
          onChange={(e) => setForm((f) => ({ ...f, establishedYear: parseInt(e.target.value) || 0 }))}
          error={errors.establishedYear}
        />
        <Input
          label="City"
          placeholder="e.g., Mumbai"
          value={form.city}
          onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
          error={errors.city}
        />
        <Input
          label="State"
          placeholder="e.g., Maharashtra"
          value={form.state}
          onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
          error={errors.state}
        />
        <Input
          label="Country"
          value={form.country}
          onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
        />
        <Input
          label="Pincode"
          placeholder="e.g., 400001"
          value={form.pincode}
          onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value }))}
        />
        <div className="sm:col-span-2">
          <Input
            label="Address"
            placeholder="Full address"
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
          />
        </div>
        <Input
          label="Website"
          placeholder="https://example.com"
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
          error={errors.website}
        />
        <Input
          label="Email"
          type="email"
          placeholder="contact@college.edu"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          error={errors.email}
        />
        <Input
          label="Phone"
          placeholder="+91 9876543210"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        />
        <div className="flex items-center gap-3 pt-6">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={form.featured}
              onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
            />
            <div className="w-10 h-5 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
          <span className="text-sm font-medium text-neutral-700">Featured College</span>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t border-neutral-100">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} isLoading={isPending}>
          {isEdit ? "Update College" : "Add College"}
        </Button>
      </div>
    </div>
  );
}

function AdminCollegesContent() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data: statsData } = useCollegeStats();
  const { data: collegesData, isLoading, isFetching } = useColleges({
    page,
    limit: 10,
    search: search || undefined,
    type: typeFilter || undefined,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const deleteCollege = useDeleteCollege();

  const stats = statsData?.data;
  const colleges = collegesData?.data || [];
  const pagination = collegesData?.pagination;

  const statCards = [
    { label: "Total Colleges", value: stats?.total ?? 0, icon: "🏛️", color: "bg-primary-50 text-primary-700" },
    { label: "Government", value: stats?.government ?? 0, icon: "🏢", color: "bg-green-50 text-green-700" },
    { label: "Private", value: stats?.private ?? 0, icon: "🏫", color: "bg-blue-50 text-blue-700" },
    { label: "Featured", value: stats?.featured ?? 0, icon: "⭐", color: "bg-yellow-50 text-yellow-700" },
  ];

  const openAdd = () => {
    setSelectedCollege(null);
    setIsEdit(false);
    setIsFormOpen(true);
  };

  const openEdit = (college: College) => {
    setSelectedCollege(college);
    setIsEdit(true);
    setIsFormOpen(true);
  };

  const openDelete = (college: College) => {
    setSelectedCollege(college);
    setIsDeleteOpen(true);
  };

  const handleDelete = () => {
    if (!selectedCollege) return;
    deleteCollege.mutate(selectedCollege._id, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setSelectedCollege(null);
      },
    });
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedCollege(null);
  };

  return (
    <DashboardLayout role="admin" userName={user?.name}>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">College Management</h1>
            <p className="text-neutral-500 mt-1">Manage colleges listed on the platform.</p>
          </div>
          <Button onClick={openAdd} leftIcon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }>
            Add College
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.label} hover>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">{stat.label}</p>
                    <p className="text-xl font-bold text-neutral-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Search colleges..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                />
              </div>
              <div className="w-full sm:w-48">
                <Select value={typeFilter} onValueChange={(value) => { setTypeFilter(value); setPage(1); }}>
                  <SelectTrigger><SelectValue placeholder="All Types" /></SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Colleges Table */}
        <Card padding="none">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : colleges.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="text-4xl mb-3">🏛️</div>
              <p className="text-neutral-500 font-medium">No colleges found</p>
              <p className="text-sm text-neutral-400 mt-1">
                {search || typeFilter ? "Try adjusting your filters" : "Add your first college to get started"}
              </p>
              {!search && !typeFilter && (
                <Button className="mt-4" onClick={openAdd}>Add College</Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-100">
                    <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">College</th>
                    <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Type</th>
                    <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Location</th>
                    <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Courses</th>
                    <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Rating</th>
                    <th className="text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {colleges.map((college) => {
                    const tb = typeBadge[college.type] || typeBadge.private;
                    const lowestFee = college.courses?.reduce((min, c) => {
                      return c.fees?.min && c.fees.min < min ? c.fees.min : min;
                    }, Infinity);
                    return (
                      <tr
                        key={college._id}
                        className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                              <span className="text-sm font-semibold text-primary-700">
                                {college.name.charAt(0)}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-neutral-900 text-sm truncate">{college.name}</p>
                                {college.featured && (
                                  <span className="text-yellow-500 text-xs">⭐</span>
                                )}
                                {college.verified && (
                                  <span className="text-secondary-500 text-xs">✓</span>
                                )}
                              </div>
                              <p className="text-xs text-neutral-500">Est. {college.establishedYear}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={tb.variant} size="sm">
                            {college.type.charAt(0).toUpperCase() + college.type.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-neutral-700">{college.location.city}, {college.location.state}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-neutral-700">{college.courses?.length || 0}</p>
                          {lowestFee !== Infinity && (
                            <p className="text-xs text-neutral-400">From {formatCurrency(lowestFee)}</p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-medium text-neutral-900">{college.rating}</span>
                            <span className="text-xs text-neutral-400">({college.reviewCount})</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" onClick={() => openEdit(college)}>
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-error-600 hover:text-error-700 hover:bg-error-50"
                              onClick={() => openDelete(college)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-100">
              <p className="text-sm text-neutral-500">
                Showing {(pagination.page - 1) * pagination.limit + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1 || isFetching}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm text-neutral-500 px-2">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= pagination.totalPages || isFetching}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Add/Edit College Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={isEdit ? "Edit College" : "Add College"}
        description={isEdit ? "Update college information" : "Add a new college to the platform"}
        size="lg"
      >
        <CollegeForm
          college={selectedCollege}
          onClose={() => setIsFormOpen(false)}
          onSuccess={handleFormSuccess}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete College"
        size="sm"
      >
        {selectedCollege && (
          <div className="space-y-4">
            <p className="text-sm text-neutral-600">
              Are you sure you want to delete <strong>{selectedCollege.name}</strong>? This will also remove all associated leads. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDelete} isLoading={deleteCollege.isPending}>
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}

export default function AdminCollegesPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminCollegesContent />
    </ProtectedRoute>
  );
}
