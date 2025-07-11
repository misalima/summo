import { getNeonDB } from "./neondb";

export async function getSummaries(userId: string) {
  const sql = await getNeonDB();
  const summaries =
    await sql`SELECT * FROM pdf_summaries where user_id = ${userId} ORDER BY created_at DESC`;
  return summaries;
}

export async function getSummary(summaryId: string) {
  try {
    const sql = await getNeonDB();
    const summary = await sql`SELECT 
        id,
        user_id,
        title,
        original_file_url,
        summary_text,
        status,
        title,
        file_name,
        created_at,
        updated_at,
        LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 AS word_count
        FROM pdf_summaries where id = ${summaryId}`;
    return summary;
  } catch (error) {
    console.error("Error getting summary", error);
    return null;
  }
}

export async function getUserUploadCount(userId: string) {
  try {
    const sql = await getNeonDB();
    const [result] =
      await sql`SELECT COUNT(*) as count FROM pdf_summaries WHERE user_id = ${userId}`;
    return result.count || 0;
  } catch (error) {
    console.error("Error getting user upload count", error);
    return 0;
  }
}
