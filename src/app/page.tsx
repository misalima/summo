import Pricing from "@/components/common/Pricing";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <div className="relative w-full">
      <HeroSection />
      <Pricing />
    </div>
  );
}
