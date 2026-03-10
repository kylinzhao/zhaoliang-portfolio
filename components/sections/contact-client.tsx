"use client";

import { Mail, Phone } from "lucide-react";
import { SectionWrapper } from "@/components/section-wrapper";
import type { ResumeFrontmatter } from "@/types/resume";

interface ContactClientProps {
  resume: ResumeFrontmatter;
}

export function ContactClient({ resume }: ContactClientProps) {
  const contacts = [
    {
      icon: Mail,
      label: "邮箱",
      value: resume.email,
      href: `mailto:${resume.email}`,
    },
    {
      icon: Phone,
      label: "电话",
      value: resume.phone,
      href: `tel:${resume.phone}`,
    },
  ];

  return (
    <SectionWrapper id="contact">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-12 text-center">
          联系我
        </h2>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.label}
                href={contact.href}
                className="bg-card border border-border rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-muted/30 transition-all duration-200 group"
              >
                <Icon className="w-8 h-8 mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  {contact.label}
                </div>
                <div className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {contact.value}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
