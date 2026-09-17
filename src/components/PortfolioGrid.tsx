"use client";

import { useState } from "react";
import type { SiteProject } from "@/lib/site-data";

const categories = ["All", "Web App", "Company Profile", "Landing Page"];

export default function PortfolioGrid({ projects }: { projects: SiteProject[] }) {
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`filter-btn px-6 py-2 rounded-full text-sm font-medium border border-gray-700 ${
              filter === cat ? "active" : "text-gray-400 hover:text-primary hover:border-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((project, index) => (
          <article
            key={project.id}
            className="project-card glass rounded-2xl overflow-hidden animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="h-48 bg-gradient-to-br from-primary/20 to-surface flex items-center justify-center relative overflow-hidden group">
              {project.image_url ? (
                <img
                  src={project.image_url}
                  alt={`${project.title} — projek ${project.category} oleh Heru Fidiyanto`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <span className="text-4xl font-bold gradient-text relative z-10">
                  {project.title.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                </span>
              )}
              {project.featured === 1 && (
                <div className="absolute top-3 right-3 bg-primary/80 text-white text-xs px-2 py-1 rounded-full z-10">
                  Featured
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary text-xs font-medium px-2 py-1 rounded bg-primary/10">
                  {project.category}
                </span>
              </div>
              <h2 className="text-lg font-bold mb-2">{project.title}</h2>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
              {project.technologies && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.split(",").map((tech, i) => (
                    <span key={i} className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              )}
              <a
                href={project.url}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
              >
                Live Demo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <p>No projects found for this category.</p>
        </div>
      )}
    </>
  );
}
