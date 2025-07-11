import { Crown, Zap } from "lucide-react";
import { isDev } from "./helpers";

const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 4,
      description: "Perfect for individuals and small teams",
      items: [
        "10 PDF summaries per month",
        "Standard processing speed",
        "Email support",
        "Basic export formats",
        "Access to all core features",
      ],
      paymentLink: isDev ? "https://buy.stripe.com/test_dRm14naXn09J3hV2vmcZa00" : "#",
      priceId: isDev ? "price_1RjP7ZEE1pygz9KjfjbptLsJ" : "",
      icon: Zap,
    },
    {
      id: "pro",
      name: "Pro",
      price: 14,
      description: "For power users and growing teams",
      items: [
        "Unlimited PDF summaries",
        "Priority processing",
        "24/7 priority support",
        "Markdown export",
        "Advanced analytics",
        "Team collaboration",
        "API access",
      ],
      paymentLink: isDev ? "https://buy.stripe.com/test_3cI8wPc1r5u319Nb1ScZa01" : "#",
      priceId: isDev ? "price_1RjP7ZEE1pygz9KjDJlM6G6M" : "",
      popular: true,
      icon: Crown,
    },
  ]

  export default plans;