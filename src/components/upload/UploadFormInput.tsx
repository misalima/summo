"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function UploadFormInput({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex justify-end items-center gap-2">
          <Input
            type="file"
            id="file"
            name="file"
            accept="application/pdf"
            required
            className=""
          />
          <Button>Upload</Button>
        </div>
      </form>
    </div>
  );
}
