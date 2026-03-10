"use client";

import { Mail, Phone, Eye, EyeOff } from "lucide-react";
import { SectionWrapper } from "@/components/section-wrapper";
import type { ResumeFrontmatter } from "@/types/resume";
import { useState } from "react";

interface ContactClientProps {
  resume: ResumeFrontmatter;
}

export function ContactClient({ resume }: ContactClientProps) {
  const [showPhone, setShowPhone] = useState(false);

  // 简单的混淆编码（Base64 + 反转）
  const encodePhone = (phone: string) => {
    return btoa(phone.split('').reverse().join(''));
  };

  const decodePhone = (encoded: string) => {
    return atob(encoded).split('').reverse().join('');
  };

  // 编码后的手机号（在服务端可以动态生成）
  const encodedPhone = resume.phone ? encodePhone(resume.phone) : '';

  // 部分显示手机号
  const maskPhone = (phone: string) => {
    const parts = phone.match(/(\d{3})(\d{4})(\d{4})/);
    if (parts) {
      return `${parts[1]} ${'*'.repeat(4)} ${parts[3]}`;
    }
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1 **** $2');
  };

  const contacts = [
    {
      icon: Mail,
      label: "邮箱",
      value: resume.email,
      href: `mailto:${resume.email}`,
      isProtected: false,
    },
    {
      icon: Phone,
      label: "电话",
      maskedValue: resume.phone ? maskPhone(resume.phone) : '',
      fullValue: resume.phone,
      href: resume.phone ? `tel:${resume.phone}` : '#',
      isProtected: true,
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

            // 受保护的电话号码卡片
            if (contact.isProtected && 'maskedValue' in contact) {
              return (
                <div
                  key={contact.label}
                  className="bg-card border border-border rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-muted/30 transition-all duration-200 group relative"
                >
                  <Icon className="w-8 h-8 mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    {contact.label}
                  </div>

                  {/* 手机号显示区域 */}
                  <div className="text-lg font-semibold group-hover:text-primary transition-colors mb-3">
                    {showPhone ? (
                      // 完整号码（使用 data-* 属性避免爬虫）
                      <span
                        data-encoded={encodedPhone}
                        onClick={(e) => {
                          e.stopPropagation();
                          // 点击复制
                          if (contact.fullValue) {
                            navigator.clipboard.writeText(contact.fullValue);
                            alert('已复制到剪贴板');
                          }
                        }}
                        className="cursor-pointer hover:underline"
                        title="点击复制"
                      >
                        {contact.fullValue}
                      </span>
                    ) : (
                      // 隐藏的号码
                      <span
                        onClick={() => setShowPhone(true)}
                        className="cursor-pointer hover:text-primary transition-colors flex items-center gap-2"
                        title="点击查看完整号码"
                      >
                        {contact.maskedValue}
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </span>
                    )}
                  </div>

                  {/* 提示文字 */}
                  {!showPhone && (
                    <div className="text-xs text-muted-foreground">
                      点击查看完整号码
                    </div>
                  )}

                  {showPhone && (
                    <button
                      onClick={() => {
                        if (contact.fullValue) {
                          navigator.clipboard.writeText(contact.fullValue);
                          alert('已复制到剪贴板');
                        }
                      }}
                      className="text-xs text-primary hover:underline mt-1"
                    >
                      点击复制号码
                    </button>
                  )}
                </div>
              );
            }

            // 普通联系卡片（邮箱）
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
                  {'value' in contact ? contact.value : ''}
                </div>
              </a>
            );
          })}
        </div>

        {/* 防爬虫说明 */}
        <div className="text-center text-xs text-muted-foreground mt-8">
          <p>🔒 为保护隐私，电话号码已做防爬虫处理</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
