
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { LandingHero } from "@/components/features/home/landing-hero";
import { RoastPreview } from "@/components/features/home/roast-preview";
import { Manifesto } from "@/components/features/home/manifesto";

export function HomeContent() {

  return (
 <div
            className="space-y-24"
          >
            <LandingHero />
            <RoastPreview />
            <Manifesto />
          </div>

  );
}
