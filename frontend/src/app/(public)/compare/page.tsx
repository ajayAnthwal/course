"use client";

import { useState } from "react";
import { CompareModal, useCompare } from "@/features/compare";
import { Card, CardContent, Button, Badge, Input } from "@/components/ui";
import Link from "next/link";

export default function ComparePage() {
  const { compareList, addToCompare, removeFromCompare, isModalOpen, setIsModalOpen } = useCompare();

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-4">Compare Colleges</h1>
          <p className="text-primary-100">
            Compare colleges side-by-side on fees, placements, ratings, and more
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {compareList.length > 0 ? (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-neutral-600">
                {compareList.length} college{compareList.length > 1 ? "s" : ""} selected for comparison
              </p>
              <Button onClick={() => setIsModalOpen(true)}>
                Compare Now ({compareList.length})
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {compareList.map((college) => (
                <div key={college._id} className="relative bg-white rounded-xl p-4 border border-neutral-200">
                  <button
                    onClick={() => removeFromCompare(college._id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-100 text-red-600 rounded-full text-xs hover:bg-red-200"
                  >
                    ×
                  </button>
                  <p className="font-medium text-neutral-900">{college.name}</p>
                  <p className="text-sm text-neutral-500">{college.type}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">⚖️</div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">No Colleges Selected</h2>
            <p className="text-neutral-500 mb-6">
              Browse colleges and add them to compare
            </p>
            <Link href="/colleges">
              <Button>Browse Colleges</Button>
            </Link>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">Popular Comparisons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { c1: "IIT Bombay", c2: "IIT Delhi" },
              { c1: "IIM Ahmedabad", c2: "IIM Bangalore" },
              { c1: "BITS Pilani", c2: "VIT Vellore" },
            ].map((comp, i) => (
              <Link key={i} href={`/compare?c1=${comp.c1}&c2=${comp.c2}`}>
                <Card hover className="text-center p-4">
                  <p className="text-sm text-neutral-600">{comp.c1}</p>
                  <p className="text-neutral-400 my-2">vs</p>
                  <p className="text-sm text-neutral-600">{comp.c2}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CompareModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedColleges={compareList}
        onRemove={removeFromCompare}
      />
    </div>
  );
}