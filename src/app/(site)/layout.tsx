import { MobileNavBar } from "../component/mobile-nav-bar";
import { SiteHeader } from "../component/site-header";
import { SiteFooter } from "../component/site-footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-svh flex-col pb-16 md:pb-0">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <MobileNavBar />
        </div>
    );
}
