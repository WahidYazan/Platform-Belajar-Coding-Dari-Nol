import AppShell from "@/components/app-shell";
import { ProgressProvider } from "@/hooks/progress-context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProgressProvider>
            <AppShell>{children}</AppShell>
        </ProgressProvider>
    );
}
