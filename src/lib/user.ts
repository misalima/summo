import plans from "@/app/utils/constants";
import { getNeonDB } from "./neondb";
import { getUserUploadCount } from "./summaries";

export async function getPriceId(email: string) {
  const sql = await getNeonDB();

  const query =
    await sql`SELECT price_id FROM users WHERE email = ${email} AND status = 'active'`;

  return query?.[0]?.price_id || null;
}



export async function hasReachedUploadLimit(email: string) {
  const uploadCount = await getUserUploadCount(email);

  const priceId = await getPriceId(email)

  const isPro = plans.find((plan) => plan.priceId === priceId)?.id === 'pro';

  const uploadLimit = isPro ? 1000 : 10;

  return { hasReachedLimit: uploadCount >= uploadLimit, uploadLimit };
}
