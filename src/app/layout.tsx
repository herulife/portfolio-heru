import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

const SITE_URL = "https://herufidiyanto.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Heru Fidiyanto - Full Stack Developer di Tasikmalaya",
    template: "%s | Heru Fidiyanto",
  },
  description:
    "Heru Fidiyanto adalah Full Stack Developer di Tasikmalaya, Indonesia. Berpengalaman membangun aplikasi web modern dengan JavaScript, PHP, Laravel, React, Vue, Next.js, Node.js, dan Go. Lihat portfolio projek, pengalaman kerja, dan kontak.",
  keywords: [
    "Heru Fidiyanto",
    "Full Stack Developer",
    "Web Developer Tasikmalaya",
    "Jasa Pembuatan Website",
    "Jasa Pembuatan Aplikasi Web",
    "Freelance Developer Indonesia",
    "Portfolio Heru Fidiyanto",
    "React Developer",
    "Laravel Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Vue.js Developer",
    "Projects.co.id",
    "BenuaTech",
  ],
  authors: [{ name: "Heru Fidiyanto", url: SITE_URL }],
  creator: "Heru Fidiyanto",
  publisher: "Heru Fidiyanto",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "Heru Fidiyanto - Full Stack Developer",
    title: "Heru Fidiyanto - Full Stack Developer di Tasikmalaya",
    description:
      "Portfolio Heru Fidiyanto: Full Stack Developer di Tasikmalaya, Indonesia. JavaScript, PHP, Laravel, React, Vue, Next.js, Node.js, Go. Lihat projek, pengalaman, dan kontak.",
    images: [
      {
        url: "/uploads/avatar.png",
        width: 800,
        height: 800,
        alt: "Heru Fidiyanto - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heru Fidiyanto - Full Stack Developer di Tasikmalaya",
    description:
      "Portfolio Heru Fidiyanto: Full Stack Developer di Tasikmalaya, Indonesia. Lihat projek, pengalaman, dan kontak.",
    images: ["/uploads/avatar.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Portfolio",
};

export const viewport: Viewport = {
  themeColor: "#0ea5e9",
  width: "device-width",
  initialScale: 1,
};

// Structured data (JSON-LD) — pola yang membuat cv-heru mudah dipahami Google,
// diperkuat dengan schema Person + WebSite resmi.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Heru Fidiyanto",
  url: SITE_URL,
  image: `${SITE_URL}/uploads/avatar.png`,
  jobTitle: "Full Stack Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tasikmalaya",
    addressCountry: "ID",
  },
  email: "mailto:herufidiyanto1@gmail.com",
  telephone: "+62 821 1475 2228",
  sameAs: [
    "https://github.com/herulife",
    "https://id.linkedin.com/in/heru-fidiyanto-3405a692",
    "https://wa.me/6282114752228",
  ],
  knowsAbout: [
    "JavaScript",
    "PHP",
    "Laravel",
    "React JS",
    "Vue.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "Go",
    "MySQL",
    "PostgreSQL",
    "WordPress",
    "Docker",
  ],
  worksFor: [
    { "@type": "Organization", name: "Projects.co.id" },
    { "@type": "Organization", name: "BenuaTech" },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Heru Fidiyanto - Full Stack Developer",
  url: SITE_URL,
  inLanguage: "id-ID",
  author: { "@type": "Person", name: "Heru Fidiyanto" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
          <div className="container mx-auto px-4">
            <nav aria-label="Navigasi footer" className="mb-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href="/" className="hover:text-primary transition-colors">Beranda</a>
              <a href="/about" className="hover:text-primary transition-colors">Tentang</a>
              <a href="/resume" className="hover:text-primary transition-colors">Pengalaman</a>
              <a href="/portfolio" className="hover:text-primary transition-colors">Portfolio</a>
              <a href="/contact" className="hover:text-primary transition-colors">Kontak</a>
            </nav>
            <p>&copy; {new Date().getFullYear()} Heru Fidiyanto — Full Stack Developer Tasikmalaya. All rights reserved.</p>
            <p className="mt-1">Built with Next.js &amp; Tailwind CSS</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
