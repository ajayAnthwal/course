import ParentDashboardLayout from "@/components/layout/parent-dashboard-layout";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ParentDashboardLayout>{children}</ParentDashboardLayout>;
}