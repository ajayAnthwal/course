"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Badge } from "@/components/ui";
import { DiscussionList } from "./discussion-list";
import { useDiscussions } from "../hooks/useDiscussions";

const popularTags = [
  "admission", "placement", "fees", "cutoff", "courses", "exams", "hostel", "research"
];

const popularColleges = [
  { _id: "1", name: "IIT Bombay" },
  { _id: "2", name: "IIT Delhi" },
  { _id: "3", name: "IIM Ahmedabad" },
  { _id: "4", name: "AIIMS Delhi" },
];

export default function DiscussionsPage() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");

  const { data, isLoading } = useDiscussions({
    search: search || undefined,
    tag: selectedTag || undefined,
    collegeId: selectedCollege || undefined,
    limit: 20,
  });

  const discussions = data?.data || [];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-4">Q&A Discussions</h1>
          <p className="text-primary-100 mb-6">
            Ask questions, get answers from students and experts
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search discussions..."
              className="flex-1 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link href="/discussions/ask">
              <Button size="lg">Ask Question</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-4 mb-6">
              <select
                className="h-10 px-3 rounded-xl border border-neutral-200 bg-white text-sm"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                <option value="">All Topics</option>
                {popularTags.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              <select
                className="h-10 px-3 rounded-xl border border-neutral-200 bg-white text-sm"
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
              >
                <option value="">All Colleges</option>
                {popularColleges.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>

            {isLoading ? (
              <div className="text-center py-12">Loading...</div>
            ) : (
              <DiscussionList discussions={discussions} />
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-5 border border-neutral-200">
              <h3 className="font-semibold text-neutral-900 mb-4">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? "" : tag)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      tag === selectedTag
                        ? "bg-primary-100 text-primary-700"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-neutral-200">
              <h3 className="font-semibold text-neutral-900 mb-4">Top Colleges</h3>
              <div className="space-y-2">
                {popularColleges.map((college) => (
                  <Link
                    key={college._id}
                    href={`/discussions?college=${college._id}`}
                    className="block text-sm text-neutral-600 hover:text-primary-600"
                  >
                    {college.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-primary-50 rounded-xl p-5 border border-primary-100">
              <h3 className="font-semibold text-primary-900 mb-2">Have a question?</h3>
              <p className="text-sm text-primary-700 mb-4">
                Get answers from current students and alumni
              </p>
              <Link href="/discussions/ask">
                <Button className="w-full">Ask Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}