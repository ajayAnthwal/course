export const metadata = {
  title: "Dashboard | EduPortal",
  description: "Manage your EduPortal account",
};

export default function DashboardGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
