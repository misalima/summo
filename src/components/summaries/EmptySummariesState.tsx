import { FileTextIcon, Plus } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function EmptySummariesState() {
  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center h-full mt-10">
        <FileTextIcon className="w-16 h-16 text-gray-400" />
        <h2 className="text-lg font-medium text-gray-500">No summaries yet</h2>
        <p className="text-sm text-gray-500">Upload a PDF to get started</p>
        <Button variant={"outline"} className="group hover:no-underline hover:bg-primary/20 hover:scale-105 transition-all duration-300">
            <Link href="/upload" className="flex text-gray-500 items-center">
                <Plus className="w-5 h-5 mr-2" />
                Upload a PDF
            </Link>
        </Button>
      </div>
    </>
  );
}
