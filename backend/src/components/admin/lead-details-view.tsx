"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  Tag,
} from "lucide-react";
import type { CmsEnquiry } from "@/lib/cms/types";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function DetailRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex gap-3 border-b border-neutral-100 py-4 last:border-b-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-neutral-500">{label}</p>
        {href ? (
          <a
            href={href}
            className="mt-0.5 block break-all text-sm font-medium text-neutral-900 hover:text-primary hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="mt-0.5 break-words text-sm font-medium text-neutral-900">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

export function LeadDetailsView({ enquiry }: { enquiry: CmsEnquiry }) {
  const phone = enquiry.phone?.trim() || null;
  const telHref = phone ? `tel:${phone.replace(/\s/g, "")}` : undefined;
  const mailHref = `mailto:${enquiry.email}`;
  const whatsappHref = phone
    ? `https://wa.me/${phone.replace(/\D/g, "")}`
    : undefined;

  return (
    <div className="font-jakarta mx-auto w-full max-w-3xl p-4 sm:p-6">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin/enquiries"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-600 transition hover:bg-neutral-50"
          aria-label="Back to enquiries"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-lg font-semibold text-neutral-900">Lead Details</h1>
          <p className="text-xs text-neutral-500">Contact form submission</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-100 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
              {initials(enquiry.name)}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-neutral-900">
                {enquiry.name}
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                  <Calendar className="h-3 w-3" />
                  {formatDate(enquiry.createdAt)}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Website
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={mailHref}
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-100"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
            {telHref && (
              <a
                href={telHref}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
            )}
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <DetailRow icon={Mail} label="Email" value={enquiry.email} href={mailHref} />
          <DetailRow
            icon={Phone}
            label="Phone"
            value={phone ?? "Not provided"}
            href={telHref}
          />
          <DetailRow icon={Tag} label="Subject / Services" value={enquiry.subject} />
          <DetailRow
            icon={Clock}
            label="Submitted"
            value={formatDate(enquiry.createdAt)}
          />
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-100 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <h3 className="text-base font-semibold text-neutral-900">Message</h3>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-700">
            {enquiry.message}
          </p>
        </div>
      </div>
    </div>
  );
}
