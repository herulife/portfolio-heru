// Data statis fallback — pola yang sama seperti cv-heru (konten selalu ada
// di HTML walau database tidak terbaca), sekaligus sumber fallback saat build.

export interface SiteProfile {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  bio: string;
  avatar_url: string;
}

export interface SiteSkill {
  id: number;
  name: string;
  category: string;
  percentage: number;
}

export interface SiteExperience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface SiteProject {
  id: number;
  title: string;
  category: string;
  description: string;
  url: string;
  image_url: string | null;
  technologies: string | null;
  featured: number;
}

export const FALLBACK_PROFILE: SiteProfile = {
  name: "Heru Fidiyanto",
  role: "Full Stack Developer",
  location: "Tasikmalaya, Indonesia",
  email: "herufidiyanto1@gmail.com",
  phone: "+62 821 1475 2228",
  whatsapp: "https://wa.me/6282114752228",
  github: "https://github.com/herulife",
  linkedin: "https://id.linkedin.com/in/heru-fidiyanto-3405a692",
  bio: "Developer yang berfokus pada pengembangan aplikasi web modern. Memiliki pengalaman dalam membangun sistem backend yang kuat dan tampilan frontend yang interaktif.",
  avatar_url: "/uploads/avatar.png",
};

export const FALLBACK_SKILLS: SiteSkill[] = [
  { id: 1, name: "JavaScript", category: "Frontend", percentage: 90 },
  { id: 2, name: "React JS", category: "Frontend", percentage: 85 },
  { id: 3, name: "Vue.js", category: "Frontend", percentage: 85 },
  { id: 4, name: "Next.js", category: "Frontend", percentage: 80 },
  { id: 5, name: "PHP / Laravel", category: "Backend", percentage: 90 },
  { id: 6, name: "Node.js / Express", category: "Backend", percentage: 85 },
  { id: 7, name: "Go", category: "Backend", percentage: 75 },
  { id: 8, name: "MySQL / PostgreSQL", category: "Backend", percentage: 85 },
  { id: 9, name: "VS Code", category: "Tools", percentage: 95 },
  { id: 10, name: "Postman", category: "Tools", percentage: 90 },
  { id: 11, name: "Docker", category: "Tools", percentage: 80 },
  { id: 12, name: "Figma", category: "Tools", percentage: 75 },
  { id: 13, name: "Trello", category: "Tools", percentage: 85 },
  { id: 14, name: "Problem Solving", category: "Soft Skills", percentage: 90 },
  { id: 15, name: "Teamwork", category: "Soft Skills", percentage: 90 },
  { id: 16, name: "Critical Thinking", category: "Soft Skills", percentage: 85 },
];

export const FALLBACK_EXPERIENCE: SiteExperience[] = [
  {
    id: 1,
    title: "Freelance Developer",
    company: "Projects.co.id",
    period: "2021 - 2025",
    description: "Mengerjakan berbagai proyek pengembangan web untuk klien dari berbagai industri.",
  },
  {
    id: 2,
    title: "Developer",
    company: "BenuaTech",
    period: "2022 - 2025",
    description: "Berkontribusi dalam pengembangan aplikasi web dan solusi digital perusahaan.",
  },
];

export const FALLBACK_PROJECTS: SiteProject[] = [
  { id: 1, title: "Showroom Mobil Bekas", category: "Web App", description: "Platform jual beli mobil bekas dengan fitur pencarian dan filter lengkap.", url: "https://mobil-bekas.netlify.app/", image_url: "/uploads/hero1.png", technologies: "React, Tailwind CSS", featured: 0 },
  { id: 2, title: "Toko Komputer", category: "Web App", description: "E-commerce toko komputer dengan sistem keranjang belanja.", url: "https://c93-komputer.netlify.app/", image_url: "/uploads/komputer.png", technologies: "React, JavaScript", featured: 0 },
  { id: 3, title: "Company Profile - Instol", category: "Company Profile", description: "Website company profile untuk perusahaan Instol.", url: "https://instol.netlify.app/", image_url: "/uploads/install.png", technologies: "HTML, CSS, JavaScript", featured: 0 },
  { id: 4, title: "Bakso Frozen", category: "Web App", description: "Website pemesanan bakso frozen online.", url: "https://bakso-pakaday.netlify.app/", image_url: "/uploads/bakso.png", technologies: "HTML, CSS, JavaScript", featured: 0 },
  { id: 5, title: "Landing Page Property", category: "Landing Page", description: "Landing page properti untuk pemasaran properti.", url: "https://demo-properti.netlify.app/", image_url: "/uploads/properti.png", technologies: "HTML, CSS, JavaScript", featured: 0 },
  { id: 6, title: "Managemen Dapur MBG", category: "Web App", description: "Aplikasi manajemen dapur untuk usaha MBG.", url: "https://dapurmbg.netlify.app/", image_url: "/uploads/dapurmbg.png", technologies: "HTML, CSS, JavaScript", featured: 0 },
  { id: 7, title: "Travel Umroh & Haji", category: "Landing Page", description: "Website pemesanan travel umroh dan haji.", url: "https://umah-haji-booking.lovable.app/", image_url: "/uploads/haji.png", technologies: "React, Tailwind CSS", featured: 0 },
  { id: 8, title: "Service Laptop & Komputer", category: "Company Profile", description: "Website company profile jasa service laptop dan komputer.", url: "https://service-tasik.vercel.app/", image_url: "/uploads/laptop.png", technologies: "Next.js, Tailwind CSS", featured: 0 },
  { id: 9, title: "Website Sekolah", category: "Company Profile", description: "Website profil sekolah dengan informasi akademik lengkap.", url: "https://demo-sekolah.netlify.app/", image_url: "/uploads/sekolah.png", technologies: "HTML, CSS, JavaScript", featured: 0 },
  { id: 10, title: "Website Toko Buku", category: "Web App", description: "Platform toko buku online dengan katalog lengkap.", url: "https://cintabuku.com", image_url: "/uploads/toko-buku.png", technologies: "Next.js, Tailwind CSS", featured: 1 },
  { id: 11, title: "Ramadhan Ceria", category: "Web App", description: "Aplikasi web interaktif untuk menyambut bulan Ramadhan.", url: "https://ramadhan.cintabuku.com", image_url: "/uploads/ramadhan.png", technologies: "Next.js, Tailwind CSS", featured: 0 },
  { id: 12, title: "Pondok Pesantren & PSB/PPDB", category: "Company Profile", description: "Website pondok pesantren dengan sistem pendaftaran online.", url: "https://darussunnahparung.com", image_url: "/uploads/pondok.png", technologies: "WordPress, PHP", featured: 0 },
];

// Pembaca server-side: HTML yang dikirim ke Googlebot sudah berisi konten
// lengkap (seperti cv-heru), bukan halaman kosong yang menunggu fetch API.
// Database dibaca secara lazy agar build tidak pernah crash kalau native
// module better-sqlite3 tidak tersedia — fallback statis dipakai.
async function loadDb(): Promise<any> {
  try {
    const mod = await import("@/lib/db");
    return mod.getDb();
  } catch {
    return null;
  }
}

export async function getSiteProfile(): Promise<SiteProfile> {
  try {
    const db = await loadDb();
    if (!db) return FALLBACK_PROFILE;
    const row = db.prepare("SELECT * FROM profile LIMIT 1").get() as SiteProfile | undefined;
    return row ?? FALLBACK_PROFILE;
  } catch {
    return FALLBACK_PROFILE;
  }
}

export async function getSiteSkills(): Promise<SiteSkill[]> {
  try {
    const db = await loadDb();
    if (!db) return FALLBACK_SKILLS;
    const rows = db.prepare("SELECT id, name, category, percentage FROM skills ORDER BY sort_order ASC").all() as SiteSkill[];
    return rows.length > 0 ? rows : FALLBACK_SKILLS;
  } catch {
    return FALLBACK_SKILLS;
  }
}

export async function getSiteExperience(): Promise<SiteExperience[]> {
  try {
    const db = await loadDb();
    if (!db) return FALLBACK_EXPERIENCE;
    const rows = db.prepare("SELECT id, title, company, period, description FROM experience ORDER BY sort_order ASC").all() as SiteExperience[];
    return rows.length > 0 ? rows : FALLBACK_EXPERIENCE;
  } catch {
    return FALLBACK_EXPERIENCE;
  }
}

export async function getSiteProjects(): Promise<SiteProject[]> {
  try {
    const db = await loadDb();
    if (!db) return FALLBACK_PROJECTS;
    const rows = db
      .prepare("SELECT id, title, category, description, url, image_url, technologies, featured FROM projects ORDER BY sort_order ASC")
      .all() as SiteProject[];
    return rows.length > 0 ? rows : FALLBACK_PROJECTS;
  } catch {
    return FALLBACK_PROJECTS;
  }
}
