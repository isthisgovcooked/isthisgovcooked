import Nav from "@/components/sections/Nav";
import JourneyProgress from "@/components/ui/JourneyProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Hero from "@/components/sections/Hero";
import BudgetCountdown from "@/components/ui/BudgetCountdown";
import PressureGauge from "@/components/sections/PressureGauge";
import WhyStrip from "@/components/sections/WhyStrip";
import CookedMetre from "@/components/sections/CookedMetre";
import OverviewSection from "@/components/sections/Overview";
import StrategiesSection from "@/components/sections/Strategies";
import BaselineSection from "@/components/sections/Baseline";
import RankingsSection from "@/components/sections/Rankings";
import FairCentreSection from "@/components/sections/FairCentre";
import ForwardSection from "@/components/sections/Forward";
import RateSensitivity from "@/components/sections/RateSensitivity";
import BudgetQuiz from "@/components/sections/BudgetQuiz";
import ColSection from "@/components/sections/Col";
import PersonalCalc from "@/components/sections/PersonalCalc";
import ChatSection from "@/components/sections/Chat";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      {process.env.NEXT_PUBLIC_BUDGET_LIVE === "true" && (
        <div className="bg-red-700 text-white font-mono text-sm text-center py-2.5 px-4">
          🚨 BUDGET NIGHT — 2026-27 analysis now live →{" "}
          <a href="#forward" className="underline font-bold hover:text-red-200">
            See the verdict before the spin starts
          </a>
          <span className="ml-4 text-red-300 text-xs">
            Published within 1hr of Treasurer sitting down
          </span>
        </div>
      )}
      <Nav />
      <JourneyProgress />
      <main>
        <Hero />
        <BudgetCountdown />
        <PressureGauge />
        <WhyStrip />
        <CookedMetre />
        <OverviewSection
          nextSection={{
            label: "See the tricks",
            href: "#strategies",
            teaser: "Now you've seen the numbers — here's how they made them look better than they were.",
          }}
        />
        <StrategiesSection
          nextSection={{
            label: "The baseline",
            href: "#baseline",
            teaser: "Strip out the tricks. Here's what the real numbers look like year-by-year.",
          }}
        />
        <BaselineSection
          nextSection={{
            label: "Who ran it better?",
            href: "#rankings",
            teaser: "Every year ranked. No party loyalty. Just the data.",
          }}
        />
        <RankingsSection
          nextSection={{
            label: "The fair test",
            href: "#faircentre",
            teaser: "What would actually fair look like? We built the model.",
          }}
        />
        <FairCentreSection
          nextSection={{
            label: "What's coming",
            href: "#forward",
            teaser: "25 years of history in the charts. Here's what the government has locked in for you next.",
          }}
        />
        <ForwardSection
          nextSection={{
            label: "Your wallet",
            href: "#col",
            teaser: "Abstract billions. Real dollars. Here's what it costs you personally.",
          }}
        />
        <RateSensitivity />
        <BudgetQuiz />
        <ColSection
          nextSection={{
            label: "Ask anything",
            href: "#chat",
            teaser: "The data is loaded. What do you want to know?",
          }}
        />
        <PersonalCalc />
        <ChatSection />
      </main>
      <ScrollToTop />
      <Footer />
    </>
  );
}
