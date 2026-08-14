import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../component/app-sidebar";
import { DashboardHeader } from "../component/dashboard-header";
import { ProgressProvider } from "@/hooks/progress-context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProgressProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <DashboardHeader />
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </ProgressProvider>
    );
}
