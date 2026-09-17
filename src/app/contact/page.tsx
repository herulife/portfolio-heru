import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { getSiteProfile } from "@/lib/site-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kontak Heru Fidiyanto",
  description:
    "Hubungi Heru Fidiyanto, Full Stack Developer di Tasikmalaya, Indonesia. Email herufidiyanto1@gmail.com, WhatsApp +62 821 1475 2228, GitHub dan LinkedIn tersedia.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Kontak Heru Fidiyanto - Full Stack Developer",
    description:
      "Hubungi Heru Fidiyanto untuk projek website dan aplikasi web. Email, WhatsApp, GitHub, LinkedIn.",
    url: "/contact",
  },
};

export default async function Contact() {
  const profile = await getSiteProfile();

  const items = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "Telepon", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { label: "WhatsApp", value: "Chat via WhatsApp", href: profile.whatsapp },
    { label: "GitHub", value: profile.github.replace("https://", ""), href: profile.github },
    { label: "LinkedIn", value: "Heru Fidiyanto", href: profile.linkedin },
    { label: "Lokasi", value: profile.location, href: undefined as string | undefined },
  ];

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Kontak <span className="gradient-text">Heru Fidiyanto</span>
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto rounded"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Tertarik bekerja sama dengan Heru Fidiyanto? Hubungi melalui email,
            WhatsApp, atau formulir di bawah ini.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <section className="space-y-6 animate-slide-in-left" aria-label="Informasi kontak">
            <h2 className="text-2xl font-bold mb-6">Hubungi Saya</h2>

            {items.map((item) => {
              const inner = (
                <>
                  <div>
                    <p className="text-gray-400 text-sm">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </>
              );
              const cls =
                "glass rounded-xl p-4 flex items-center gap-4 hover:border-primary transition-all block";
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={cls}
                >
                  {inner}
                </a>
              ) : (
                <div key={item.label} className={cls}>
                  {inner}
                </div>
              );
            })}
          </section>

          <ContactForm targetEmail={profile.email} />
        </div>
      </div>
    </div>
  );
}
