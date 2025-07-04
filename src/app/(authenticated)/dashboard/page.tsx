import EmptySummariesState from "@/components/summaries/EmptySummariesState";
import SummaryCard from "@/components/summaries/SummaryCard";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userId = user.id;
  const uploadLimit = 5;
  const summaries = await getSummaries(userId);

  return (
    <main className="min-h-screen">
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight">
                Your Summaries
              </h1>
              <p className="text-gray-600">
                Here are the summaries you have created.
              </p>
            </div>
            <div>
              <Button
                variant={"link"}
                className="group hover:no-underline bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300"
              >
                <Link href="/upload" className="flex text-white items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Upload a PDF
                </Link>
              </Button>
            </div>
          </div>
          <div className="mb-6">
            <div className="bg-rose-50 border border-rose-200 rounded-lg text-rose-800 p-4 flex justify-between items-center">
              <p>
                You've have reached the limit of {uploadLimit} uploads on the
                Free Plan.
              </p>
              <Button
                variant={"outline"}
                className="group hover:no-underline border-rose-800 border-3 bg-transparent hover:bg-rose-800/70 hover:text-white"
              >
                <Link href="/pricing" className="flex items-center font-bold">
                  Upgrade to Pro
                </Link>
              </Button>
            </div>
          </div>
          {summaries.length === 0 ? (
            <EmptySummariesState />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
              {summaries.map((summary, index) => (
                <SummaryCard key={index} summary={summary} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
