"use client";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-neutral-200 rounded-lg ${className}`} />
  );
}

export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <div className="bg-neutral-50 px-5 py-3 border-b border-neutral-200">
        <div className="flex gap-4">
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-20" />
          ))}
        </div>
      </div>
      <div className="divide-y divide-neutral-100">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="px-5 py-4 flex gap-4">
            {Array.from({ length: cols }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-24" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5">
      <Skeleton className="h-3 w-20 mb-3" />
      <Skeleton className="h-7 w-16 mb-2" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5">
      <Skeleton className="h-4 w-32 mb-4" />
      <Skeleton className="h-[250px] w-full" />
    </div>
  );
}
