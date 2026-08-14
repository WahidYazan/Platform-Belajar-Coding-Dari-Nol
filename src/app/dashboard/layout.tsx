import { ProgressProvider } from "@/hooks/progress-context";
import { MobileNavBar } from "../component/mobile-nav-bar";
import { SiteFooter } from "../component/site-footer";
import { SiteHeader } from "../component/site-header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProgressProvider>
            <div className="flex min-h-svh flex-col pb-16 md:pb-0">
                <SiteHeader />
                <main className="flex-1">{children}</main>
                <SiteFooter />
                <MobileNavBar />
            </div>
        </ProgressProvider>
    );
}
