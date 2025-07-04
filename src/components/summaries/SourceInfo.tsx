export default function SourceInfo({ fileName }: { fileName : string }) {
    console.log(fileName)
  return <p className="text-sm text-muted-foreground mt-2 mb-4">{fileName}</p>;
}
