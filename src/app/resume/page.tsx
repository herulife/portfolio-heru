import type { Metadata } from "next";
import { getSiteExperience } from "@/lib/site-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pengalaman & Resume Heru Fidiyanto",
  description:
    "Pengalaman kerja Heru Fidiyanto: Freelance Developer di Projects.co.id (2021–2025) dan Developer di BenuaTech (2022–2025). Full Stack Developer Tasikmalaya, Indonesia.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Pengalaman & Resume Heru Fidiyanto",
    description:
      "Riwayat pengalaman kerja Heru Fidiyanto sebagai Full Stack Developer: Projects.co.id dan BenuaTech.",
    url: "/resume",
  },
};

export default async function Resume() {
  const experiences = await getSiteExperience();

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Pengalaman <span className="gradient-text">Heru Fidiyanto</span>
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto rounded"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Riwayat pengalaman kerja Heru Fidiyanto sebagai Full Stack Developer.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>

          {experiences.map((exp, index) => (
            <article
              key={exp.id}
              className={`relative mb-12 animate-slide-up ${
                index % 2 === 0 ? "md:pr-[52%]" : "md:pl-[52%]"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="glass rounded-2xl p-6 ml-16 md:ml-0 relative">
                <div className="absolute left-0 md:left-auto md:right-auto top-6 w-4 h-4 bg-primary rounded-full border-4 border-darker transform -translate-x-[42px] md:translate-x-0"></div>
                <div className="absolute left-0 md:left-auto md:right-auto top-6 w-8 h-0.5 bg-primary transform -translate-x-[32px] md:translate-x-0 hidden md:block"
                  style={{ left: index % 2 === 0 ? "auto" : "-32px", right: index % 2 === 0 ? "-32px" : "auto" }}
                ></div>

                <span className="text-primary text-sm font-medium">{exp.period}</span>
                <h2 className="text-xl font-bold mt-2 mb-1">{exp.title} — {exp.company}</h2>
                <p className="text-gray-400 mb-3">@ {exp.company}</p>
                <p className="text-gray-300 leading-relaxed">{exp.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
