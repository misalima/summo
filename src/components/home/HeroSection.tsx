import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      <div className="flex items-center gap-2">
        <div className="relative p-[2px] overflow-hidden rounded-full bg-linear-to-r from-primary to-secondary animate-gradient-x">
          <Badge className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200">
            <Sparkles className="w-6 h-6 mr-2 text-primary animate-pulse group" />
            <p className="text-base text-gray-600">AI-powered</p>
          </Badge>
        </div>
      </div>
      <h1 className="font-bold py-6 text-center">
        Transform your PDFs and Worksheets into actionable insights
      </h1>
      <h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-2xl px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Summo is a tool that helps you summarize articles and documents using
        AI.
      </h2>
      <div>
        <Button variant={"link"} className="text- bg-amber-400 mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-8 lg:mt-16 hover:bg-amber-600 transition-colors duration-200 hover:no-underline">
          <Link href={"/#pricing"} className="flex gap-2 items-center">
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 animate-pulse" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
