import UploadForm from "@/components/upload/UploadForm";

export default function UploadPage() {
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
