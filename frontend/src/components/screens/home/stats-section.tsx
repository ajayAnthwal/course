"use client";

interface SiteStats {
  colleges?: number;
  students?: number;
  courses?: number;
}

interface StatsSectionProps {
  siteStats?: SiteStats;
}

export default function StatsSection({ siteStats }: StatsSectionProps) {
  const statsDisplay = [
    { value: siteStats ? `${siteStats.colleges}+` : "10,000+", label: "Colleges Listed", icon: "🏛️" },
    { value: siteStats ? `${siteStats.students}+` : "50,000+", label: "Students Helped", icon: "🎓" },
    { value: siteStats ? `${siteStats.courses}+` : "500+", label: "Courses Available", icon: "📚" },
    { value: "95%", label: "Satisfaction Rate", icon: "⭐" },
  ];

  return (
    <>
      <section className="py-8 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40">
            {["NIRF", "NAAC", "AICTE", "UGC", "NBA"].map((org) => (
              <span key={org} className="text-xl font-bold text-neutral-900 tracking-wider">{org}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statsDisplay.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                <p className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-1">{stat.value}</p>
                <p className="text-sm text-neutral-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
