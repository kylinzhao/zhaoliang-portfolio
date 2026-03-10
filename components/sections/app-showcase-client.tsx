"use client";

import { motion } from "framer-motion";
import type { App } from "@/types/app";
import { ExternalLink } from "lucide-react";

interface AppGridClientProps {
  apps: App[];
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export function AppGridClient({ apps }: AppGridClientProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-6"
    >
      {apps.map((app, index) => (
        <motion.div
          key={app.name}
          variants={item}
          className="group relative"
        >
          <a
            href={app.appStoreUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {/* App Icon */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-card shadow-md group-hover:shadow-xl transition-shadow duration-300">
              {app.icon ? (
                <img
                  src={app.icon}
                  alt={`${app.name} icon`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to text-based icon
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector(".fallback-icon")) {
                      const fallback = document.createElement("div");
                      fallback.className =
                        "fallback-icon absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 text-2xl font-bold text-primary";
                      fallback.textContent = app.name.slice(0, 2);
                      parent.appendChild(fallback);
                    }
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                  <span className="text-2xl font-bold text-primary">
                    {app.name.slice(0, 2)}
                  </span>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* App Name */}
            <div className="mt-2 text-center">
              <p className="text-xs font-medium text-foreground line-clamp-2">
                {app.name}
              </p>
            </div>
          </a>
        </motion.div>
      ))}
    </motion.div>
  );
}
