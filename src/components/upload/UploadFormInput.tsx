"use client";
import { forwardRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit, isLoading }, ref) => {
    return (
      <div>
        <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
          <div className="flex justify-end items-center gap-2">
            <Input
              type="file"
              id="file"
              name="file"
              accept="application/pdf"
              required
              disabled={isLoading}
              className={cn(isLoading && "opacity-50 cursor-not-allowed")}
            />
            <Button disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                "Upload your file"
              )}
            </Button>
          </div>
        </form>
      </div>
    );
  }
);

UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;
