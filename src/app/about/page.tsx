import type { Metadata } from "next";
import { getSiteProfile, getSiteSkills } from "@/lib/site-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tentang Heru Fidiyanto",
  description:
    "Tentang Heru Fidiyanto: Full Stack Developer di Tasikmalaya, Indonesia. Keahlian JavaScript, React, Vue, Next.js, PHP/Laravel, Node.js, Go, MySQL, PostgreSQL, dan Docker.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Tentang Heru Fidiyanto - Full Stack Developer",
    description:
      "Profil dan keahlian Heru Fidiyanto: Full Stack Developer di Tasikmalaya, Indonesia.",
    url: "/about",
  },
};

export default async function About() {
  const profile = await getSiteProfile();
  const skills = await getSiteSkills();

  const frontendSkills = skills.filter((s) => s.category === "Frontend");
  const backendSkills = skills.filter((s) => s.category === "Backend");
  const toolsSkills = skills.filter((s) => s.category === "Tools");
  const softSkills = skills.filter((s) => s.category === "Soft Skills");

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tentang <span className="gradient-text">Heru Fidiyanto</span>
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto rounded"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            {profile.name} adalah {profile.role} di {profile.location} yang
            berfokus pada pengembangan aplikasi web modern.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <section className="glass rounded-2xl p-8 animate-slide-in-left" aria-label="Informasi pribadi">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Informasi Pribadi</h2>
            <div className="space-y-4">
              {[
                ["Nama", profile.name],
                ["Peran", profile.role],
                ["Lokasi", profile.location],
                ["Email", profile.email],
                ["Telepon", profile.phone],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="text-primary font-medium w-24">{label}</span>
                  <span className="text-gray-300">{value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="glass rounded-2xl p-8 animate-slide-up" aria-label="Tentang saya">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Tentang Saya</h2>
            <p className="text-gray-300 leading-relaxed mb-6">{profile.bio}</p>
            <div className="flex gap-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener"
                className="btn-primary px-6 py-2 rounded-lg text-white text-sm font-medium"
              >
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener"
                className="border border-gray-600 hover:border-primary px-6 py-2 rounded-lg text-gray-300 hover:text-primary text-sm font-medium transition-all"
              >
                LinkedIn
              </a>
            </div>
          </section>
        </div>

        <section className="animate-slide-up" aria-label="Keahlian">
          <h2 className="text-3xl font-bold text-center mb-12">
            Keahlian <span className="gradient-text">Saya</span>
          </h2>

          {[
            { title: "Frontend", items: frontendSkills },
            { title: "Backend", items: backendSkills },
            { title: "Tools", items: toolsSkills },
            ...(softSkills.length > 0 ? [{ title: "Soft Skills", items: softSkills }] : []),
          ].map((section) => (
            <div key={section.title} className="mb-12">
              <h3 className="text-xl font-semibold mb-6 text-center">{section.title}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {section.items.map((skill) => (
                  <div key={skill.id} className="glass rounded-xl p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-primary font-bold">{skill.percentage}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-bar-fill"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
