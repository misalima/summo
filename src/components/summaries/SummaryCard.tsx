import Link from "next/link";
import { Card } from "../ui/card";
import DeleteButton from "./DeleteButton";
import { FileTextIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { formatFileNameFromUrl } from "@/lib/utils";

const SummaryHeader = ({
  fileUrl,
  title,
  created_at,
}: {
  fileUrl: string;
  title: string | null;
  created_at: string;
}) => {
    console.log(created_at);
  return (
    <div className="flex items-start gap-2 sm:gap-4">
      <FileTextIcon className="w-6 h-6 sm:w-8 sm:h-8" />
      <div className="flex-1 min-w-0">
        <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">
          {title || formatFileNameFromUrl(fileUrl)}
        </h3>
        <p className="text-sm text-gray-400">{formatDistanceToNow(new Date(created_at), { addSuffix: true })}</p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
    return (
        <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800" style={{backgroundColor: status === "pending" ? "#ffcc33" : "#bbffbb"}}>
                {status}
            </span>
        </div>
    )
}

export default function SummaryCard({ summary }: { summary: any }) {
  console.log(summary);
  return (
    <div>
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton summaryId={summary.id} />
        </div>
        <Link className="block p-4 sm:p-6" href={`/summaries/${summary.id}`}>
          <div className="flex flex-col gap-3 sm:gap-4">
            <SummaryHeader
              fileUrl={summary.fileUrl}
              title={summary.title}
              created_at={summary.created_at}
            />
            <p className="line-clamp-2 text-sm text-gray-600 mt-2 sm:text-base pl-2">
              {summary.summary_text}
            </p>

            <div className="flex justify-between items-center mt-2 sm:mt-4">
                <StatusBadge status={summary.status} />
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
}
