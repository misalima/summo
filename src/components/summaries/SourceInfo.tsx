import { ExternalLink, FileText } from "lucide-react";
import { Button } from "../ui/button";
import DownloadSummaryButton from "./DownloadSummaryButton";

export default function SourceInfo({
  fileName,
  originalFileUrl,
  title,
  summaryText,
  createdAt,
}: {
  fileName: string;
  originalFileUrl: string;
  title: string;
  summaryText: string;
  createdAt: string;
}) {
  return (
    <>
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center justity-center gap-2">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{fileName}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" asChild>
            <a href={originalFileUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                View Original File
              </span>
            </a>
          </Button>
        </div>
        <DownloadSummaryButton
          title={title}
          summaryText={summaryText}
          createdAt={createdAt}
          fileName={fileName}
        />
      </div>
    </>
  );
}
