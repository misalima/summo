import { Button } from "@/components/ui/button";
import UploadForm from "@/components/upload/UploadForm";
import { hasReachedUploadLimit } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function UploadPage() {
  const user = await currentUser();
  if (!user?.id) redirect("/sign-in");

  const userId = user.id;


  const { hasReachedLimit, uploadLimit } = await hasReachedUploadLimit(userId);

  if (hasReachedLimit) {
    redirect("/dashboard");
  }

  return (
    <section className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 text-center">
        <div className="flex flex-col gap-6 items-center justify-center text-center">
          <h1>Start Uploading Your PDFs</h1>
          <p className="text-gray-500">Upload your PDFs to get started</p>
        </div>
        <div className="mt-10 flex justify-center">
          <UploadForm />
        </div>
      </div>
    </section>
  );
}
