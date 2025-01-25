import AppSidebar from "@/components/AppSidebar";
import NavBar from "@/components/NavBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full overflow-visible flex flex-col">
        <NavBar />
        {children}
      </div>
    </SidebarProvider>
  );
}