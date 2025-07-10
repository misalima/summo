import { handleCheckoutSessionCompleted, handleSubscriptionDeleted } from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  try {
    event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret);
    switch (event.type) {
      case "checkout.session.completed":
        console.log("Checkout session completed");
        const sessionId = event.data.object.id;

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        });
        await handleCheckoutSessionCompleted({ session, stripe });
        break;
      case "customer.subscription.deleted":
        console.log("Subscription deleted");
        const subscription = event.data.object;
        const subscriptionId = event.data.object.id;

        await handleSubscriptionDeleted({ subscriptionId, stripe });

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: "Webhook verification failed" },
      { status: 400 }
    );
  }
  return NextResponse.json({ status: "success" });
};
