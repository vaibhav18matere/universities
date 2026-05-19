import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sundar Educational Consultancy — MBBS abroad guidance from Nashik, Maharashtra. Mission, experience, and why students choose SEC.",
};

type WhyChooseUsPoint = {
  readonly id: string;
  readonly text: string;
};

const whyChooseUsPoints: ReadonlyArray<WhyChooseUsPoint> = [
  {
    id: "pioneers",
    text: "Pioneers in education admission, exclusively in top medical colleges and universities of Russia.",
  },
  {
    id: "founders",
    text: "Founder members know the abroad medical education system genuinely, inside and out.",
  },
  {
    id: "process",
    text: "Thorough academic assessment, awareness seminars, timely admissions, visa guidance, and pre-departure orientation.",
  },
  {
    id: "accredited",
    text: "Accredited and recognized among leading institutes recruiting a strong number of students to Russia.",
  },
  {
    id: "staff",
    text: "Co-operative, competent staff provide counselling and processing—from pre-admission through graduation.",
  },
  {
    id: "parents",
    text: "Keeps parents and associates informed of the student’s progress and performance throughout academic life.",
  },
  {
    id: "bridge",
    text: "Acts as a bridge between students, parents, and the university for every requirement.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <header className="border-b border-slate-200 pb-10 dark:border-slate-800">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          About us
        </p>
        <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-brand-ink dark:text-slate-50 sm:text-4xl">
          Sundar Educational Consultancy
        </h1>
        <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">
          Trusted MBBS-abroad guidance based in Nashik, Maharashtra
        </p>
      </header>

      <div className="mt-10 space-y-8 text-base leading-relaxed text-slate-700 dark:text-slate-300">
        <p>
          SEC’s mission is to bring medical education within reach—giving
          students in India access to high-quality international teaching
          standards, updated academics, and educational professionalism at a
          reasonable cost and with convenience.
        </p>
        <p>
          SEC is run stringently by a group of professionals with mature
          experience guiding students for MBBS abroad. SEC has successfully guided
          hundreds of students to Russia, placed in leading universities. SEC
          also works in close coordination with authorities at leading
          universities to promote world-class medical education, resources, and
          talent.
        </p>
        <p>
          Today SEC holds exclusive rights for admission to government
          universities under the Ministry of Public Health, Russian Federation
          and the Kyrgyz Republic, whose certification is recognized by the
          Medical Council of India. SEC Proprietor: Pri. V. R. Rasal. SEC partners
          with WCI (World Choice International), working together in India and
          abroad to ease admission for medical students.
        </p>
        <p>
          Our representatives and staff are ready to share the right knowledge
          and experience with aspiring students—helping them make sound overseas
          decisions, meet their needs, select suitable courses, and plan for a
          bright and distinguished career.
        </p>
      </div>

      <section
        id="why-choose-us"
        className="mt-14 rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
        aria-labelledby="why-choose-us-heading"
      >
        <h2
          id="why-choose-us-heading"
          className="text-xl font-bold text-brand-ink dark:text-slate-50 sm:text-2xl"
        >
          Why choose us?
        </h2>
        <ul className="mt-6 list-none space-y-4 text-slate-700 dark:text-slate-300">
          {whyChooseUsPoints.map((point) => (
            <li key={point.id} className="flex gap-3">
              <span
                className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-accent"
                aria-hidden
              />
              <span className="leading-relaxed">{point.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-12 text-center text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        <Link
          href="/#directory"
          className="font-semibold text-accent underline-offset-4 hover:underline"
        >
          Open the university directory
        </Link>{" "}
        to search, filter, and compare up to three universities.
      </p>
    </div>
  );
}
