import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileNameAsTitle(fileName: string): string {
  const withoutExtension = fileName.replace(/\.[^/.]+$/, "");
  const withSpaces = withoutExtension
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2");

  return withSpaces
  .split(" ")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(" ").trim();
}

export function formatFileNameFromUrl(url: string): string {
  const fileName = url.split("/").pop() || "";
  return fileName ? formatFileNameAsTitle(fileName) : "Untitled";
}