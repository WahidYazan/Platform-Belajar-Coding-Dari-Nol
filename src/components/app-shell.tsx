import { ChatWidget } from "@/app/component/chat-widget";
import { AppSidebar } from "@/app/component/site-header-sidebar";
import { SiteFooter } from "@/app/component/site-footer";
import { SiteHeader } from "@/app/component/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";

export default async function AppShell({
    children,
    footer,
}: {
    children: React.ReactNode;
    footer?: React.ReactNode;
}) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <div className="flex min-h-svh flex-col">
                <SiteHeader showTrigger={false} />
                <div className="flex flex-1 flex-col">
                    <main className="flex-1">{children}</main>
                    {footer ?? <SiteFooter />}
                </div>
            </div>
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <main className="flex-1">{children}</main>
                    {footer ?? <SiteFooter />}
                </div>
            </SidebarInset>
            <ChatWidget />
        </SidebarProvider>
    );
}
