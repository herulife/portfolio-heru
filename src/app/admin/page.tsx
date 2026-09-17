"use client";

import { useEffect, useState } from "react";

type Tab = "dashboard" | "profile" | "projects" | "skills" | "experience";

interface Profile {
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

const skillCategories = ["Frontend", "Backend", "Tools", "Soft Skills"];
const projectCategories = ["Web App", "Company Profile", "Landing Page"];

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [msg, setMsg] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [profile, setProfile] = useState<Profile>({ name: "", role: "", location: "", email: "", phone: "", whatsapp: "", github: "", linkedin: "", bio: "", avatar_url: "" });
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);

  const [editProject, setEditProject] = useState<any>(null);
  const [editSkill, setEditSkill] = useState<any>(null);
  const [editExp, setEditExp] = useState<any>(null);

  const [projForm, setProjForm] = useState({ title: "", category: "Web App", description: "", url: "", technologies: "", featured: false, image_url: "" });
  const [skillForm, setSkillForm] = useState({ name: "", category: "Frontend", percentage: 50 });
  const [expForm, setExpForm] = useState({ title: "", company: "", period: "", description: "" });

  const showMsg = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 2500); };

  const loadAll = () => {
    fetch("/api/profile").then(r => r.json()).then(setProfile);
    fetch("/api/projects").then(r => r.json()).then(setProjects);
    fetch("/api/skills").then(r => r.json()).then(setSkills);
    fetch("/api/experience").then(r => r.json()).then(setExperiences);
  };

  useEffect(() => { if (auth) loadAll(); }, [auth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (res.ok) setAuth(true);
    else { showMsg("Password salah!"); }
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(profile) });
    showMsg("Profile updated!");
  };

  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editProject?.id ? "PUT" : "POST";
    const body = editProject?.id ? { ...projForm, id: editProject.id } : projForm;
    await fetch("/api/projects", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    showMsg(editProject?.id ? "Project updated!" : "Project added!");
    setProjForm({ title: "", category: "Web App", description: "", url: "", technologies: "", featured: false, image_url: "" });
    setEditProject(null);
    fetch("/api/projects").then(r => r.json()).then(setProjects);
  };

  const deleteProject = async (id: number) => {
    if (!confirm("Hapus project ini?")) return;
    await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
    showMsg("Project deleted!");
    fetch("/api/projects").then(r => r.json()).then(setProjects);
  };

  const saveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editSkill?.id ? "PUT" : "POST";
    const body = editSkill?.id ? { ...skillForm, id: editSkill.id } : skillForm;
    await fetch("/api/skills", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    showMsg(editSkill?.id ? "Skill updated!" : "Skill added!");
    setSkillForm({ name: "", category: "Frontend", percentage: 50 });
    setEditSkill(null);
    fetch("/api/skills").then(r => r.json()).then(setSkills);
  };

  const deleteSkill = async (id: number) => {
    if (!confirm("Hapus skill ini?")) return;
    await fetch(`/api/skills?id=${id}`, { method: "DELETE" });
    showMsg("Skill deleted!");
    fetch("/api/skills").then(r => r.json()).then(setSkills);
  };

  const saveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editExp?.id ? "PUT" : "POST";
    const body = editExp?.id ? { ...expForm, id: editExp.id } : expForm;
    await fetch("/api/experience", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    showMsg(editExp?.id ? "Experience updated!" : "Experience added!");
    setExpForm({ title: "", company: "", period: "", description: "" });
    setEditExp(null);
    fetch("/api/experience").then(r => r.json()).then(setExperiences);
  };

  const deleteExp = async (id: number) => {
    if (!confirm("Hapus experience ini?")) return;
    await fetch(`/api/experience?id=${id}`, { method: "DELETE" });
    showMsg("Experience deleted!");
    fetch("/api/experience").then(r => r.json()).then(setExperiences);
  };

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass rounded-2xl p-8 w-full max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <p className="text-gray-400 text-sm">Heru Fidiyanto Portfolio</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="Masukkan password" autoFocus />
            </div>
            {msg && <p className="text-red-400 text-sm text-center">{msg}</p>}
            <button type="submit" className="btn-primary w-full py-3 rounded-lg text-white font-medium">Masuk</button>
          </form>
        </div>
      </div>
    );
  }

  const sidebarItems: { id: Tab; label: string; icon: JSX.Element }[] = [
    { id: "dashboard", label: "Dashboard", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { id: "profile", label: "Profile", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    { id: "projects", label: "Projects", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
    { id: "skills", label: "Skills", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> },
    { id: "experience", label: "Experience", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  ];

  return (
    <div className="min-h-screen flex bg-darker">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-gray-800 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-white">Admin Panel</h2>
              <p className="text-xs text-gray-400">Portfolio CMS</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                tab === item.id
                  ? "bg-primary/20 text-primary"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <a href="/" target="_blank" className="flex items-center gap-2 text-gray-400 hover:text-primary text-sm transition-colors px-4 py-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            Lihat Website
          </a>
          <button onClick={() => setAuth(false)} className="w-full flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm transition-colors px-4 py-2 mt-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <main className="flex-1 lg:ml-64 min-h-screen">
        <header className="sticky top-0 z-30 bg-darker/80 backdrop-blur border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <h1 className="text-lg font-bold capitalize">{tab}</h1>
          {msg && <span className="bg-primary/20 text-primary text-sm px-4 py-1 rounded-full animate-fade-in">{msg}</span>}
        </header>

        <div className="p-6">
          {tab === "dashboard" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Projects", value: projects.length, color: "from-blue-500/20 to-blue-600/20" },
                  { label: "Skills", value: skills.length, color: "from-green-500/20 to-green-600/20" },
                  { label: "Experience", value: experiences.length, color: "from-purple-500/20 to-purple-600/20" },
                  { label: "Featured", value: projects.filter((p) => p.featured === 1).length, color: "from-yellow-500/20 to-yellow-600/20" },
                ].map((stat) => (
                  <div key={stat.label} className={`glass rounded-xl p-6 bg-gradient-to-br ${stat.color}`}>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="font-bold mb-4">Recent Projects</h3>
                <div className="space-y-3">
                  {projects.slice(-5).reverse().map((p) => (
                    <div key={p.id} className="flex items-center justify-between bg-darker rounded-lg px-4 py-3 border border-gray-800">
                      <div>
                        <p className="font-medium">{p.title}</p>
                        <p className="text-sm text-gray-400">{p.category}</p>
                      </div>
                      <a href={p.url} target="_blank" className="text-primary text-sm hover:underline">Lihat</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "profile" && (
            <div className="max-w-2xl animate-fade-in">
              <form onSubmit={saveProfile} className="glass rounded-xl p-6 space-y-4">
                <h3 className="font-bold mb-4">Edit Profile</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {(["name", "role", "location", "email", "phone", "whatsapp", "github", "linkedin"] as (keyof Profile)[]).map((field) => (
                    <div key={field}>
                      <label className="block text-sm text-gray-400 mb-1 capitalize">{field.replace("_", " ")}</label>
                      <input type="text" value={profile[field] || ""} onChange={(e) => setProfile({ ...profile, [field]: e.target.value })} className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Bio</label>
                  <textarea value={profile.bio || ""} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} rows={4} className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none resize-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Avatar URL</label>
                  <input type="text" value={profile.avatar_url || ""} onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })} className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none" />
                </div>
                <button type="submit" className="btn-primary px-6 py-2.5 rounded-lg text-white text-sm font-medium">Simpan Profile</button>
              </form>
            </div>
          )}

          {tab === "projects" && (
            <div className="space-y-6 animate-fade-in">
              <form onSubmit={saveProject} className="glass rounded-xl p-6">
                <h3 className="font-bold mb-4">{editProject ? "Edit Project" : "Tambah Project"}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Judul Project" value={projForm.title} onChange={(e) => setProjForm({ ...projForm, title: e.target.value })} required className="bg-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none" />
                  <select value={projForm.category} onChange={(e) => setProjForm({ ...projForm, category: e.target.value })} className="bg-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none">
                    {projectCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input type="text" placeholder="URL" value={projForm.url} onChange={(e) => setProjForm({ ...projForm, url: e.target.value })} className="bg-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none" />
                  <input type="text" placeholder="Technologies" value={projForm.technologies} onChange={(e) => setProjForm({ ...projForm, technologies: e.target.value })} className="bg-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none" />
                  <input type="text" placeholder="Image URL" value={projForm.image_url} onChange={(e) => setProjForm({ ...projForm, image_url: e.target.value })} className="bg-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none" />
                  <label className="flex items-center gap-2 bg-darker border border-gray-700 rounded-lg px-4 py-2.5">
                    <input type="checkbox" checked={!!projForm.featured} onChange={(e) => setProjForm({ ...projForm, featured: e.target.checked })} className="accent-primary" />
                    <span className="text-gray-300 text-sm">Featured</span>
                  </label>
                  <textarea placeholder="Deskripsi" value={projForm.description} onChange={(e) => setProjForm({ ...projForm, description: e.target.value })} rows={3} className="bg-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none md:col-span-2 resize-none" />
                </div>
                <div className="flex gap-3 mt-4">
                  <button type="submit" className="btn-primary px-6 py-2 rounded-lg text-white text-sm font-medium">{editProject ? "Update" : "Tambah"}</button>
                  {editProject && <button type="button" onClick={() => { setEditProject(null); setProjForm({ title: "", category: "Web App", description: "", url: "", technologies: "", featured: false, image_url: "" }); }} className="border border-gray-600 px-6 py-2 rounded-lg text-gray-300 text-sm hover:border-primary hover:text-primary transition-all">Batal</button>}
                </div>
              </form>

              <div className="glass rounded-xl p-6">
                <h3 className="font-bold mb-4">Semua Projects ({projects.length})</h3>
                <div className="space-y-2">
                  {projects.map((p) => (
                    <div key={p.id} className="flex items-center gap-4 bg-darker rounded-lg px-4 py-3 border border-gray-800 hover:border-gray-600 transition-colors">
                      {p.image_url ? <img src={p.image_url} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" /> : <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-xs">{p.title.slice(0, 2)}</div>}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{p.title}</p>
                          {p.featured === 1 && <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">Featured</span>}
                        </div>
                        <p className="text-xs text-gray-400 truncate">{p.category} · {p.technologies}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => { setEditProject(p); setProjForm(p); }} className="text-blue-400 hover:text-blue-300 px-2 py-1 text-sm">Edit</button>
                        <button onClick={() => deleteProject(p.id)} className="text-red-400 hover:text-red-300 px-2 py-1 text-sm">Hapus</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "skills" && (
            <div className="space-y-6 animate-fade-in">
              <form onSubmit={saveSkill} className="glass rounded-xl p-6">
                <h3 className="font-bold mb-4">{editSkill ? "Edit Skill" : "Tambah Skill"}</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <input type="text" placeholder="Nama Skill" value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} required className="bg-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none" />
                  <select value={skillForm.category} onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })} className="bg-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none">
                    {skillCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <div className="flex items-center gap-3">
                    <input type="range" min="0" max="100" value={skillForm.percentage} onChange={(e) => setSkillForm({ ...skillForm, percentage: Number(e.target.value) })} className="flex-1 accent-primary" />
                    <span className="text-primary font-bold w-10 text-right">{skillForm.percentage}%</span>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button type="submit" className="btn-primary px-6 py-2 rounded-lg text-white text-sm font-medium">{editSkill ? "Update" : "Tambah"}</button>
                  {editSkill && <button type="button" onClick={() => { setEditSkill(null); setSkillForm({ name: "", category: "Frontend", percentage: 50 }); }} className="border border-gray-600 px-6 py-2 rounded-lg text-gray-300 text-sm hover:border-primary hover:text-primary transition-all">Batal</button>}
                </div>
              </form>

              <div className="glass rounded-xl p-6">
                <h3 className="font-bold mb-4">Semua Skills ({skills.length})</h3>
                {skillCategories.map((cat) => {
                  const catSkills = skills.filter((s) => s.category === cat);
                  if (catSkills.length === 0) return null;
                  return (
                    <div key={cat} className="mb-6 last:mb-0">
                      <h4 className="text-sm font-medium text-gray-400 mb-3">{cat}</h4>
                      <div className="space-y-2">
                        {catSkills.map((s) => (
                          <div key={s.id} className="flex items-center gap-4 bg-darker rounded-lg px-4 py-3 border border-gray-800">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">{s.name}</span>
                                <span className="text-primary text-sm font-bold">{s.percentage}%</span>
                              </div>
                              <div className="w-full bg-gray-800 rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${s.percentage}%` }}></div>
                              </div>
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                              <button onClick={() => { setEditSkill(s); setSkillForm(s); }} className="text-blue-400 hover:text-blue-300 px-2 py-1 text-sm">Edit</button>
                              <button onClick={() => deleteSkill(s.id)} className="text-red-400 hover:text-red-300 px-2 py-1 text-sm">Hapus</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "experience" && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <form onSubmit={saveExp} className="glass rounded-xl p-6">
                <h3 className="font-bold mb-4">{editExp ? "Edit Experience" : "Tambah Experience"}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Jabatan" value={expForm.title} onChange={(e) => setExpForm({ ...expForm, title: e.target.value })} required className="bg-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none" />
                  <input type="text" placeholder="Perusahaan" value={expForm.company} onChange={(e) => setExpForm({ ...expForm, company: e.target.value })} required className="bg-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none" />
                  <input type="text" placeholder="Periode (contoh: 2021 - 2025)" value={expForm.period} onChange={(e) => setExpForm({ ...expForm, period: e.target.value })} className="bg-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none" />
                  <textarea placeholder="Deskripsi" value={expForm.description} onChange={(e) => setExpForm({ ...expForm, description: e.target.value })} rows={3} className="bg-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none resize-none md:col-span-2" />
                </div>
                <div className="flex gap-3 mt-4">
                  <button type="submit" className="btn-primary px-6 py-2 rounded-lg text-white text-sm font-medium">{editExp ? "Update" : "Tambah"}</button>
                  {editExp && <button type="button" onClick={() => { setEditExp(null); setExpForm({ title: "", company: "", period: "", description: "" }); }} className="border border-gray-600 px-6 py-2 rounded-lg text-gray-300 text-sm hover:border-primary hover:text-primary transition-all">Batal</button>}
                </div>
              </form>

              <div className="glass rounded-xl p-6">
                <h3 className="font-bold mb-4">Semua Experience ({experiences.length})</h3>
                <div className="space-y-3">
                  {experiences.map((e) => (
                    <div key={e.id} className="bg-darker rounded-lg px-4 py-4 border border-gray-800">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{e.title}</p>
                          <p className="text-sm text-primary">{e.company}</p>
                          <p className="text-xs text-gray-400 mt-1">{e.period}</p>
                          <p className="text-sm text-gray-300 mt-2">{e.description}</p>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <button onClick={() => { setEditExp(e); setExpForm(e); }} className="text-blue-400 hover:text-blue-300 px-2 py-1 text-sm">Edit</button>
                          <button onClick={() => deleteExp(e.id)} className="text-red-400 hover:text-red-300 px-2 py-1 text-sm">Hapus</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
