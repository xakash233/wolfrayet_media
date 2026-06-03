"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  TrendingUp,
  Award,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import type { PortfolioProject } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PortfolioEnhancedProps {
  projects: PortfolioProject[];
  categories: string[];
}

const portfolioStats = [
  { icon: TrendingUp, label: "Avg. ROI", value: "3.2x" },
  { icon: Award, label: "Projects", value: "250+" },
  { icon: Layers, label: "Industries", value: "15+" },
];

export function PortfolioEnhanced({
  projects,
  categories,
}: PortfolioEnhancedProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const featured = projects[1];

  return (
    <>
      <div className="mb-12 grid gap-4 sm:grid-cols-3">
        {portfolioStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card flex items-center gap-4 p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 overflow-hidden rounded-3xl border border-primary/20"
      >
        <button
          type="button"
          onClick={() => setSelectedProject(featured)}
          className="group relative block w-full text-left"
        >
          <div className="relative aspect-[21/9] min-h-[220px] sm:min-h-[280px]">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12">
              <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase text-primary-foreground">
                Featured Case Study
              </span>
              <h2 className="mt-4 max-w-xl text-3xl font-bold text-white sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-2 max-w-lg text-white/80">{featured.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {featured.results.slice(0, 2).map((r) => (
                  <span
                    key={r}
                    className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur"
                  >
                    {r}
                  </span>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                View case study
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </button>
      </motion.div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat)}
            className="rounded-full"
          >
            {cat}
          </Button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.button
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => setSelectedProject(project)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border/50 bg-card text-left transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5",
                index === 0 && filtered.length > 2 && "sm:col-span-2 sm:row-span-1"
              )}
            >
              <div
                className={cn(
                  "relative overflow-hidden",
                  index === 0 && filtered.length > 2
                    ? "aspect-[2/1]"
                    : "aspect-[4/3]"
                )}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {project.category}
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/70">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    {project.results.slice(0, 1).map((r) => (
                      <span
                        key={r}
                        className="rounded bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        {selectedProject && (
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedProject.title}
              </DialogTitle>
              <DialogDescription>
                {selectedProject.client} · {selectedProject.year} ·{" "}
                {selectedProject.category}
              </DialogDescription>
            </DialogHeader>
            <p className="text-muted-foreground leading-relaxed">
              {selectedProject.longDescription}
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {selectedProject.results.map((result) => (
                <div
                  key={result}
                  className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-center"
                >
                  <p className="text-sm font-semibold text-primary">{result}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/contact">
                Start a Similar Project
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
