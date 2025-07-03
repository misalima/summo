"use client";
import z from "zod";
import UploadFormInput from "./UploadFormInput";
import { useUploadThing } from "@/app/utils/uploadthing";
import { toast } from "sonner";
import {
  generatePDFSummary,
  storePDFSummaryAction,
} from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const schema = z.object({
  file: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "File must be a PDF",
    })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File must be less than 20MB",
    }),
});

export default function UploadForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Upload complete");
      toast.success("File uploaded successfully");
    },
    onUploadError: (error: Error) => {
      console.log(`Error uploading file: ${error.message}`);
      toast.error("Error uploading file");
    },
    onUploadBegin: () => {
      console.log("Uploading file...");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData(e.target as HTMLFormElement);
      const file = formData.get("file") as File;

      //validate file
      const validatedFields = schema.safeParse({ file });

      console.log(validatedFields);

      if (!validatedFields.success) {
        console.log(
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file"
        );
        toast.error(
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file"
        );
        setIsLoading(false);
        return;
      }

      toast.info("Uploading file...");

      //upload to uploadthing
      const resp = await startUpload([file]);
      if (!resp) {
        toast.error("Something went wrong.", {
          description: "Please try again.",
        });
        setIsLoading(false);
        return;
      }
      //parse the pdf
      const result = await generatePDFSummary(resp);

      const { data = null, message = null } = result || {};

      if (data) {
        let storeResult: any;
        toast.info("Generating summary...");

        if (data.summary) {
          storeResult = await storePDFSummaryAction({
            summary: data.summary,
            fileUrl: resp[0].serverData.file.url,
            title: data.title,
            fileName: file.name,
          });
          toast.success("Summary generated successfully");
          setIsLoading(false);
          formRef.current?.reset();
          router.push(`/summaries/${storeResult.id}`);
        }
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Error generating summary");
      formRef.current?.reset();
    }    
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
