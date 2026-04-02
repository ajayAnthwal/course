"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button, Badge } from "@/components/ui";

interface CompareCollege {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  type: string;
  rating: number;
  fees: {
    annual: number;
    total: number;
  };
  placement: {
    avgPackage: number;
    highestPackage: number;
    topRecruiters: string[];
  };
  admission: {
    exam: string;
    cutoff: string;
  };
  facilities: string[];
  NIRFRanking?: number;
}

interface CompareModalProps {
  open: boolean;
  onClose: () => void;
  selectedColleges: CompareCollege[];
  onRemove: (id: string) => void;
}

export function CompareModal({ open, onClose, selectedColleges, onRemove }: CompareModalProps) {
  return (
    <Modal isOpen={open} onClose={onClose} title={`Compare Colleges (${selectedColleges.length})`} size="full">
      {selectedColleges.length < 2 ? (
        <div className="text-center py-8 text-neutral-500">
          <p>Add at least 2 colleges to compare</p>
          <p className="text-sm mt-2">Click "Add to Compare" on college cards</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="text-left p-3 bg-neutral-50 font-semibold text-sm">Feature</th>
                {selectedColleges.map((college) => (
                  <th key={college._id} className="p-3 bg-neutral-50 font-semibold text-sm min-w-[180px]">
                    <div className="flex flex-col items-center gap-2">
                      {college.logo && (
                        <img src={college.logo} alt={college.name} className="w-12 h-12 object-contain" />
                      )}
                      <span className="text-center">{college.name}</span>
                      <button
                        onClick={() => onRemove(college._id)}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 font-medium text-sm bg-neutral-50">Type</td>
                {selectedColleges.map((c) => (
                  <td key={c._id} className="p-3 text-center text-sm">{c.type}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-medium text-sm bg-neutral-50">NIRF Ranking</td>
                {selectedColleges.map((c) => (
                  <td key={c._id} className="p-3 text-center text-sm">
                    {c.NIRFRanking ? (
                      <Badge variant="primary">#{c.NIRFRanking}</Badge>
                    ) : (
                      <span className="text-neutral-400">N/A</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-medium text-sm bg-neutral-50">Rating</td>
                {selectedColleges.map((c) => (
                  <td key={c._id} className="p-3 text-center text-sm">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-accent-400">⭐</span>
                      <span className="font-medium">{c.rating.toFixed(1)}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-medium text-sm bg-neutral-50">Annual Fees</td>
                {selectedColleges.map((c) => (
                  <td key={c._id} className="p-3 text-center text-sm font-medium text-primary-600">
                    ₹{c.fees.annual.toLocaleString()}/yr
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-medium text-sm bg-neutral-50">Total Fees</td>
                {selectedColleges.map((c) => (
                  <td key={c._id} className="p-3 text-center text-sm">
                    ₹{c.fees.total.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-medium text-sm bg-neutral-50">Avg. Package</td>
                {selectedColleges.map((c) => (
                  <td key={c._id} className="p-3 text-center text-sm font-medium text-green-600">
                    ₹{c.placement.avgPackage.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-medium text-sm bg-neutral-50">Highest Package</td>
                {selectedColleges.map((c) => (
                  <td key={c._id} className="p-3 text-center text-sm">
                    ₹{c.placement.highestPackage.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-medium text-sm bg-neutral-50">Top Recruiters</td>
                {selectedColleges.map((c) => (
                  <td key={c._id} className="p-3 text-center text-sm">
                    <div className="flex flex-wrap justify-center gap-1">
                      {c.placement.topRecruiters.slice(0, 3).map((r, i) => (
                        <span key={i} className="text-xs bg-neutral-100 px-2 py-1 rounded">{r}</span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-medium text-sm bg-neutral-50">Admission Exam</td>
                {selectedColleges.map((c) => (
                  <td key={c._id} className="p-3 text-center text-sm">
                    <Badge variant="secondary">{c.admission.exam}</Badge>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-medium text-sm bg-neutral-50">Cutoff</td>
                {selectedColleges.map((c) => (
                  <td key={c._id} className="p-3 text-center text-sm">{c.admission.cutoff}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-medium text-sm bg-neutral-50">Facilities</td>
                {selectedColleges.map((c) => (
                  <td key={c._id} className="p-3 text-center text-sm">
                    <div className="flex flex-wrap justify-center gap-1">
                      {c.facilities.slice(0, 4).map((f, i) => (
                        <span key={i} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded">
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
}

export function useCompare() {
  const [compareList, setCompareList] = useState<CompareCollege[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToCompare = (college: CompareCollege) => {
    if (!compareList.find((c) => c._id === college._id) && compareList.length < 4) {
      setCompareList([...compareList, college]);
    }
  };

  const removeFromCompare = (id: string) => {
    setCompareList(compareList.filter((c) => c._id !== id));
  };

  const clearCompare = () => setCompareList([]);

  return {
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isModalOpen,
    setIsModalOpen,
  };
}