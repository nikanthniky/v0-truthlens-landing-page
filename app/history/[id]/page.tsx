import { SiteLayout } from "@/components/site-layout";
import { HistoryDetail } from "../history-detail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <SiteLayout>
      <HistoryDetail id={id} />
    </SiteLayout>
  );
}
