import { getNeonDB } from "./neondb";

export async function getSummaries(userId: string) {
    const sql = await getNeonDB();
    const summaries = await sql`SELECT * FROM pdf_summaries where user_id = ${userId} ORDER BY created_at DESC`;
    return summaries;
}

export async function getSummary(summaryId: string) {
    const sql = await getNeonDB();
    const summary = await sql`SELECT * FROM pdf_summaries where id = ${summaryId}`;
    return summary;
}