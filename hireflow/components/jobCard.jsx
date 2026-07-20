"use client";

import { useState } from "react";
import { ArrowUpRight, Building2, Mail, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createApplication, getJobMail } from "../services/jobService";
import Spinner from "./ui/spinner";

export default function JobCard({ job }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const jobDetails = { title: job.title, companyName: job.company, location: job.location };

  const askIfApplied = () => {
    window.setTimeout(() => {
      toast("Did you apply for this job?", {
        duration: Infinity,
        action: {
          label: "Yes",
          onClick: async () =>
            await createApplication(jobDetails.companyName, jobDetails.title, job.description),
        },
        cancel: { label: "Not yet" },
      });
    }, 3000);
  };

  const applyViaEmail = async () => {
    setIsLoading(true);
    try {
      const result = await getJobMail(jobDetails);
      if (!result.success) {
        if (result.status === 403) {
          toast.error("You have reached your email generation limit. Please upgrade your plan.");
          router.push("/Subscription");
          return;
        }
        toast.error(result.message || "Failed to generate email");
        return;
      }

      const responseData = result.response?.data?.data || result.data;
      const validEmails = responseData?.validEmails;
      const generatedMail = responseData?.genrateMail;

      if (!Array.isArray(validEmails) || validEmails.length === 0) {
        toast.error("No valid email was found for this company");
        return;
      }
      if (!generatedMail) {
        toast.error("We could not generate an email body");
        return;
      }

      const body = generatedMail
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .join("\r\n\r\n");
      window.location.href = `mailto:${validEmails[0].email}?subject=${encodeURIComponent(
        `Application for ${job.title} role`,
      )}&body=${encodeURIComponent(body)}`;
      askIfApplied();
    } catch (error) {
      console.error("Error generating application email:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_12px_35px_-24px_rgba(15,23,42,0.55)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_22px_45px_-24px_rgba(15,23,42,0.5)]">
      {isLoading && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-white/80 backdrop-blur-sm">
          <Spinner className="h-10 w-10 text-emerald-600" />
        </div>
      )}

      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-100 text-slate-700 transition group-hover:bg-emerald-50 group-hover:text-emerald-700">
          <Building2 size={20} />
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Open role
        </span>
      </div>

      <h2 className="text-xl font-semibold leading-snug tracking-tight text-slate-950">{job.title}</h2>
      <p className="mt-1 font-medium text-slate-600">{job.company}</p>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
        <MapPin size={14} />
        {job.location || "Location not specified"}
      </p>
      <p className="mt-4 line-clamp-4 flex-1 text-sm leading-6 text-slate-600">{job.description}</p>

      <div className="mt-6 grid grid-cols-2 gap-2.5 border-t border-slate-100 pt-5">
        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={askIfApplied}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-950 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Apply now <ArrowUpRight size={15} />
        </a>
        <button
          type="button"
          onClick={applyViaEmail}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100"
        >
          <Mail size={15} /> Email
        </button>
      </div>
    </article>
  );
}
