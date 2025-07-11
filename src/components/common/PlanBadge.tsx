import plans from "@/app/utils/constants";
import { getPriceId } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

export default async function PlanBadge() {
  const user = await currentUser();

  if (!user?.id) return null;

  const email = user?.emailAddresses?.[0]?.emailAddress;

  let priceId: string | null = null;

  if (email) {
    priceId = await getPriceId(email);
  }

  let planName = "Upgrade";

  const plan = plans.find((plan) => plan.priceId === priceId);

  if (plan) {
    planName = plan.name;
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "cursor-pointer ml-2 bg-gray-50 hidden lg:flex flex-row items-center",
        !priceId && "bg-red-50"
      )}
    >
      <Crown
        className={cn(
          "w-3 h-3 mr-1 text-amber-600",
          !priceId && "text-red-600"
        )}
      />
      {planName}
    </Badge>
  );
}
