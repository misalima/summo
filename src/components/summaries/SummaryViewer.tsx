export default function SummaryViewer({ summary, title }: { summary: string, title: string }) {
    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p>{summary}</p>
        </div>
    )
}