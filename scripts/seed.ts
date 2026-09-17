import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(__dirname, "..", "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, "portfolio.db");
if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    location TEXT,
    email TEXT,
    phone TEXT,
    whatsapp TEXT,
    github TEXT,
    linkedin TEXT,
    bio TEXT,
    avatar_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    percentage INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    url TEXT,
    image_url TEXT,
    technologies TEXT,
    featured INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    password TEXT NOT NULL
  );
`);

db.prepare(
  `INSERT INTO profile (name, role, location, email, phone, whatsapp, github, linkedin, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
).run(
  "Heru Fidiyanto",
  "Full Stack Developer",
  "Tasikmalaya, Indonesia",
  "herufidiyanto1@gmail.com",
  "+62 821 1475 2228",
  "https://wa.me/6282114752228",
  "https://github.com/herulife",
  "https://id.linkedin.com/in/heru-fidiyanto-3405a692",
  "Developer yang berfokus pada pengembangan aplikasi web modern. Memiliki pengalaman dalam membangun sistem backend yang kuat dan tampilan frontend yang interaktif."
);

const insertExp = db.prepare(
  `INSERT INTO experience (title, company, period, description, sort_order) VALUES (?, ?, ?, ?, ?)`
);
insertExp.run("Freelance Developer", "Projects.co.id", "2021 - 2025", "Mengerjakan berbagai proyek pengembangan web untuk klien dari berbagai industri.", 1);
insertExp.run("Developer", "BenuaTech", "2022 - 2025", "Berkontribusi dalam pengembangan aplikasi web dan solusi digital perusahaan.", 2);

const insertSkill = db.prepare(
  `INSERT INTO skills (name, category, percentage, sort_order) VALUES (?, ?, ?, ?)`
);
insertSkill.run("JavaScript", "Frontend", 90, 1);
insertSkill.run("React JS", "Frontend", 85, 2);
insertSkill.run("Vue.js", "Frontend", 85, 3);
insertSkill.run("Next.js", "Frontend", 80, 4);
insertSkill.run("PHP / Laravel", "Backend", 90, 5);
insertSkill.run("Node.js / Express", "Backend", 85, 6);
insertSkill.run("Go", "Backend", 75, 7);
insertSkill.run("MySQL / PostgreSQL", "Backend", 85, 8);
insertSkill.run("VS Code", "Tools", 95, 9);
insertSkill.run("Postman", "Tools", 90, 10);
insertSkill.run("Docker", "Tools", 80, 11);
insertSkill.run("Figma", "Tools", 75, 12);
insertSkill.run("Trello", "Tools", 85, 13);

const insertProj = db.prepare(
  `INSERT INTO projects (title, category, description, url, technologies, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)`
);
insertProj.run("Showroom Mobil Bekas", "Web App", "Platform jual beli mobil bekas dengan fitur pencarian dan filter lengkap.", "https://mobil-bekas.netlify.app/", "React, Tailwind CSS", 0, 1);
insertProj.run("Toko Komputer", "Web App", "E-commerce toko komputer dengan sistem keranjang belanja.", "https://c93-komputer.netlify.app/", "React, JavaScript", 0, 2);
insertProj.run("Company Profile - Instol", "Company Profile", "Website company profile untuk perusahaan Instol.", "https://instol.netlify.app/", "HTML, CSS, JavaScript", 0, 3);
insertProj.run("Bakso Frozen", "Web App", "Website pemesanan bakso frozen online.", "https://bakso-pakaday.netlify.app/", "HTML, CSS, JavaScript", 0, 4);
insertProj.run("Landing Page Property", "Landing Page", "Landing page properti untuk pemasaran properti.", "https://demo-properti.netlify.app/", "HTML, CSS, JavaScript", 0, 5);
insertProj.run("Managemen Dapur MBG", "Web App", "Aplikasi manajemen dapur untuk usaha MBG.", "https://dapurmbg.netlify.app/", "HTML, CSS, JavaScript", 0, 6);
insertProj.run("Travel Umroh & Haji", "Landing Page", "Website pemesanan travel umroh dan haji.", "https://umah-haji-booking.lovable.app/", "React, Tailwind CSS", 0, 7);
insertProj.run("Service Laptop & Komputer", "Company Profile", "Website company profile jasa service laptop dan komputer.", "https://service-tasik.vercel.app/", "Next.js, Tailwind CSS", 0, 8);
insertProj.run("Website Sekolah", "Company Profile", "Website profil sekolah dengan informasi akademik lengkap.", "https://demo-sekolah.netlify.app/", "HTML, CSS, JavaScript", 0, 9);
insertProj.run("Website Toko Buku", "Web App", "Platform toko buku online dengan katalog lengkap.", "https://cintabuku.com", "Next.js, Tailwind CSS", 1, 10);
insertProj.run("Ramadhan Ceria", "Web App", "Aplikasi web interaktif untuk menyambut bulan Ramadhan.", "https://ramadhan.cintabuku.com", "Next.js, Tailwind CSS", 0, 11);
insertProj.run("Pondok Pesantren & PSB/PPDB", "Company Profile", "Website pondok pesantren dengan sistem pendaftaran online.", "https://darussunnahparung.com", "WordPress, PHP", 0, 12);
insertProj.run("Jurnal Guru", "Web App", "Aplikasi pencatatan jurnal untuk guru.", "https://guru.cintabuku.site/", "Next.js, Tailwind CSS", 0, 13);
insertProj.run("WinFix AI", "Web App", "Aplikasi AI untuk perbaikan Windows.", "https://wfix.benuatech.web.id/", "Next.js, AI Integration", 1, 14);
insertProj.run("Pondok Pesantren Al-Maa", "Company Profile", "Website profil Pondok Pesantren Al-Maa.", "https://almaparung.com/", "WordPress, PHP", 0, 15);
insertProj.run("LinkUndang", "Web App", "Platform pembuat undangan digital online.", "https://linkundang.web.id/", "Next.js, Tailwind CSS", 1, 16);
insertProj.run("Game Aksara Sunda", "Web App", "Game edukasi untuk belajar aksara Sunda.", "https://aksarasunda.my.id/", "JavaScript, HTML5 Canvas", 0, 17);

db.prepare(`INSERT INTO admin (id, password) VALUES (1, ?)`).run("heru123");

db.close();
console.log("Database seeded successfully at:", DB_PATH);
