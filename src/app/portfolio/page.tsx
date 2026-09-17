import type { Metadata } from "next";
import PortfolioGrid from "@/components/PortfolioGrid";
import { getSiteProjects } from "@/lib/site-data";

export const revalidate = 3600;

const SITE_URL = "https://herufidiyanto.netlify.app";

export const metadata: Metadata = {
  title: "Portfolio Projek Heru Fidiyanto",
  description:
    "Portfolio projek Heru Fidiyanto: aplikasi web, company profile, dan landing page — Showroom Mobil Bekas, Toko Komputer, Toko Buku CintaBuku, Pondok Pesantren & PSB/PPDB, Travel Umroh & Haji, dan lainnya.",
  keywords: [
    "Portfolio Heru Fidiyanto",
    "Projek Web Heru Fidiyanto",
    "Showroom Mobil Bekas",
    "Toko Komputer",
    "Website Sekolah",
    "Website Toko Buku",
    "Pondok Pesantren PSB PPDB",
    "Travel Umroh Haji",
  ],
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio Projek Heru Fidiyanto - Full Stack Developer",
    description:
      "Kumpulan projek web Heru Fidiyanto: Web App, Company Profile, dan Landing Page untuk berbagai klien dan industri.",
    url: "/portfolio",
  },
};

export default async function Portfolio() {
  const projects = await getSiteProjects();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portfolio Projek Heru Fidiyanto",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: p.url,
      name: p.title,
      description: p.description,
    })),
  };

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Portfolio Projek <span className="gradient-text">Heru Fidiyanto</span>
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto rounded mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Berikut adalah {projects.length} projek web yang telah dikerjakan Heru Fidiyanto:
            aplikasi web, company profile, dan landing page untuk berbagai klien dan industri.
          </p>
        </div>

        <PortfolioGrid projects={projects} />

        <p className="text-center text-gray-500 text-sm mt-12">
          Lihat juga <a href={SITE_URL} className="text-primary hover:underline">profil Heru Fidiyanto</a> dan{" "}
          <a href="/contact" className="text-primary hover:underline">kontak</a> untuk
          diskusi projek Anda.
        </p>
      </div>
    </div>
  );
}
