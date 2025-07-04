"use server";

import { getNeonDB } from "@/lib/neondb";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummary(summaryId: string) {
  try {
    const sql = await getNeonDB();
    const user = await currentUser();
    if (!user) {
      throw new Error("User not found");
    }
    const userId = user.id;
    const result =
      await sql`DELETE FROM pdf_summaries WHERE id = ${summaryId} AND user_id = ${userId} RETURNING id`;

    if (result.length > 0) {
      revalidatePath("/dashboard");
      return { success: true, message: "Summary deleted successfully" };
    }
    return { success: false, error: "Summary not found" };
  } catch (error) {
    console.error("Error deleting summary", error);
    return { success: false, error: "Failed to delete summary" };
  }
}
