"use client";
import z from "zod";
import UploadFormInput from "./UploadFormInput";
import { useUploadThing } from "@/app/utils/uploadthing";
import { toast } from "sonner";

const schema = z.object({
  file: z.instanceof(File, {message: "File is required"})
  .refine((file) => file.type.startsWith("application/pdf"), {message: "File must be a PDF"})
  .refine((file) => file.size <= 20 * 1024 * 1024, {message: "File must be less than 20MB"})

});

export default function UploadForm() {

  const { startUpload } = useUploadThing(
    'pdfUploader', {
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
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const file = formData.get("file") as File;
    
    //validate file
    const validatedFields = schema.safeParse({file});

    console.log(validatedFields);

    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file");
      toast.error(validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file");
      return;
    }

    toast.info("Uploading file...");
    
    //upload to uploadthing
    const response = await startUpload([file]);
    if (!response) {
      toast.error("Something went wrong.", {
        description: "Please try again.",
      });
      return;
    }
    //parse the pdf 
    //summarize the pdf
    //save the summary to the database
    //redirect to the summary page
  };

    return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
