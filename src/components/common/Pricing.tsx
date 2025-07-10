import { Check, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Start free and upgrade
            anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <Card className="relative border-2 hover:border-gray-300 transition-all duration-200 hover:shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-blue-600 mr-2" />
                <CardTitle className="text-xl font-semibold">Basic</CardTitle>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$4</span>
                <span className="text-gray-600 ml-1">/month</span>
              </div>
              <CardDescription className="text-gray-600">
                Perfect for individuals and small teams
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    10 PDF summaries per month
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Standard processing speed
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Email support</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Basic export formats</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Access to all core features
                  </span>
                </li>
              </ul>
            </CardContent>

            <CardFooter className="pt-6">
              <Button
                variant="outline"
                className="w-full h-12 text-base font-medium"
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="relative border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-200">
            {/* Popular Badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                <Crown className="w-4 h-4 mr-1" />
                Most Popular
              </div>
            </div>

            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-2">
                <Crown className="w-6 h-6 text-blue-600 mr-2" />
                <CardTitle className="text-xl font-semibold">Pro</CardTitle>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$14</span>
                <span className="text-gray-600 ml-1">/month</span>
              </div>
              <CardDescription className="text-gray-600">
                For power users and growing teams
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">
                    Unlimited PDF summaries
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">
                    Priority processing
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">
                    24/7 priority support
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">
                    Markdown export
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">
                    Advanced analytics
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">
                    Team collaboration
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">API access</span>
                </li>
              </ul>
            </CardContent>

            <CardFooter className="pt-6">
              <Button className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700">
                Start Pro Trial
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
            <span>✓ Cancel anytime</span>
            <span>✓ No setup fees</span>
            <span>✓ Secure & private</span>
          </div>
        </div>
      </div>
    </section>
  );
}
