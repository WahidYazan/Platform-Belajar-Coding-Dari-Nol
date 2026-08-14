import { redirect } from "next/navigation";

export default async function TutorialDetailPage({ params }: PageProps<"/tutorials/[slug]">) {
    const { slug } = await params;
    redirect(`/dashboard/tutorials/${slug}`);
}
