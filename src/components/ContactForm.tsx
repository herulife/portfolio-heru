"use client";

import { useState } from "react";

export default function ContactForm({ targetEmail }: { targetEmail: string }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Kontak Portfolio dari ${form.name}`);
    const body = encodeURIComponent(`Nama: ${form.name}\nEmail: ${form.email}\n\nPesan:\n${form.message}`);
    window.open(`mailto:${targetEmail}?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="glass rounded-2xl p-8 animate-slide-up">
      <h2 className="text-2xl font-bold mb-6">Kirim Pesan</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="contact-name" className="block text-sm text-gray-400 mb-2">Nama Anda</label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
            placeholder="Nama Anda"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm text-gray-400 mb-2">Email Anda</label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
            placeholder="nama@email.com"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="block text-sm text-gray-400 mb-2">Pesan</label>
          <textarea
            id="contact-message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={5}
            className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors resize-none"
            placeholder="Tulis pesan Anda..."
          />
        </div>
        <button type="submit" className="btn-primary w-full py-3 rounded-lg text-white font-medium">
          {sent ? "Pesan Terkirim!" : "Kirim Pesan"}
        </button>
      </form>
    </div>
  );
}
