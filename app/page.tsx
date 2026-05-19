import { CollegeDirectory } from "@/app/components/CollegeDirectory";
import { LandingCountryStripSection } from "@/app/components/LandingCountryStripSection";
import { LandingHeroSection } from "@/app/components/LandingHeroSection";
import { LandingTopUniversitiesSection } from "@/app/components/LandingTopUniversitiesSection";
import { getAllColleges } from "@/lib/colleges-catalog";

export default function HomePage() {
  const colleges = getAllColleges();
  return (
    <>
      <LandingHeroSection />
      <LandingCountryStripSection />
      <LandingTopUniversitiesSection />
      <section
        id="directory"
        className="relative -mt-6 scroll-mt-[calc(5.5rem+env(safe-area-inset-top,0px))] overflow-x-clip rounded-t-3xl bg-surface pb-12 pt-10 shadow-[0_-12px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 sm:-mt-8 sm:scroll-mt-32 sm:pb-16 sm:pt-12 dark:bg-slate-950 dark:ring-slate-800"
      >
        <div className="mx-auto mb-8 max-w-7xl px-4 sm:mb-10 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-brand-ink sm:text-3xl md:text-4xl dark:text-slate-50">
            Find University as per your choice
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 sm:text-base dark:text-slate-400">
            Filter by country and budget in INR, then open details or compare up
            to three universities side by side.
          </p>
        </div>
        <CollegeDirectory
          colleges={colleges}
          showDirectoryHeader={false}
          fixedCountryLabel={null}
        />
      </section>
    </>
  );
}
