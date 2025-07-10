import SourceInfo from "@/components/summaries/SourceInfo";
import SummaryHeader from "@/components/summaries/SummaryHeader";
import SummaryViewer from "@/components/summaries/SummaryViewer";
import { getSummary } from "@/lib/summaries";
import { FileText } from "lucide-react";
import { notFound } from "next/navigation";

export default async function SummaryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;

  const summary = await getSummary(id);

  if (!summary) {
    notFound();
  }

  const { title, summary_text, file_name, word_count, created_at, original_file_url } = summary[0];

  const readingTime = Math.ceil(word_count / 200);
  return (
    <div className="relative isolate min-h-screen">
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="flex flex-col">
            <SummaryHeader title={title} createdAt={created_at} readingTime={readingTime} />
            {file_name && <SourceInfo fileName={file_name} originalFileUrl={original_file_url} title={title} summaryText={summary_text} createdAt={created_at} />}
          </div>
          <div className="relative p-6 sm:p-8 backdrop:blur-md rounded-2xl sm:rounded-3xl shadow-xl">
            <div className="flex flex-col">
              <div className="absolute top-2 sm:top-4 right-4 sm:right-6 flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {word_count} words
                </p>
              </div>
              <SummaryViewer summary={summary_text} title={title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
