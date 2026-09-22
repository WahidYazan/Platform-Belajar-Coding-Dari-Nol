import AppShell from "@/components/app-shell";
import HomeContent from "./component/home-content";
import { SiteFooter } from "./component/site-footer-home";

export default function HomePage() {
    return (
        <AppShell footer={<SiteFooter />}>
            <HomeContent />
        </AppShell>
    );
}
