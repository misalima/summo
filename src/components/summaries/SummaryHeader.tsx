import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface SummaryHeaderProps {
  title?: string;
  createdAt: any;
  readingTime: number;
}
export default function SummaryHeader({
  title,
  createdAt,
  readingTime,
}: SummaryHeaderProps) {
  return (
    <>
      <div className="flex gap-4 mb-4 justify-between">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            {readingTime} min read
          </div>
        </div>
        <div>
          <Link href="/dashboard">
            <Button
              className="sm:gap-2 group flex items-center shadow-xs hover:shadow-md transition-all duration-300"
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back <span className="hidden sm:inline">to summaries</span>
            </Button>
          </Link>
        </div>
      </div>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {title || "No title"}
      </h1>
    </>
  );
}
