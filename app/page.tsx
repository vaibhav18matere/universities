import { CollegeDirectory } from "@/app/components/CollegeDirectory";
import { LandingCountryStripSection } from "@/app/components/LandingCountryStripSection";
import { LandingHeroSection } from "@/app/components/LandingHeroSection";
import { LandingTopUniversitiesSection } from "@/app/components/LandingTopUniversitiesSection";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { getAllColleges } from "@/lib/colleges-catalog";

export default function HomePage() {
  const colleges = getAllColleges();
  return (
    <>
      <LandingHeroSection />
      <LandingCountryStripSection />
      <LandingTopUniversitiesSection />
      <ScrollReveal animation="fade-up">
        <section
          id="directory"
          className="glass-panel relative -mt-6 scroll-mt-[calc(5.5rem+env(safe-area-inset-top,0px))] overflow-x-clip rounded-t-3xl pb-12 pt-10 shadow-[0_-12px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 sm:-mt-8 sm:scroll-mt-32 sm:pb-16 sm:pt-12 dark:shadow-[0_-12px_40px_rgba(0,0,0,0.3)] dark:ring-slate-800"
        >
          <div className="mx-auto mb-8 max-w-7xl px-4 sm:mb-10 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold text-brand-ink sm:text-3xl md:text-4xl dark:text-foreground">
              Find University as per your choice
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm font-medium text-text-muted sm:text-base">
              Filter by country and budget in INR, then open university details.
            </p>
          </div>
          <CollegeDirectory
            colleges={colleges}
            showDirectoryHeader={false}
            fixedCountryLabel={null}
          />
        </section>
      </ScrollReveal>
    </>
  );
}
