"use client";

import { useEffect, useState } from "react";
import { BriefcaseBusiness, ChevronLeft, ChevronRight, Search } from "lucide-react";
import JobCard from "../../components/jobCard";
import Navbar from "../../components/common/navbar";
import Spinner from "../../components/ui/spinner";
import { getJobsList } from "../../services/jobService";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchJobs = async () => {
      setLoader(true);
      try {
        const response = await getJobsList(page);
        if (mounted) setJobs(Array.isArray(response) ? response : []);
      } finally {
        if (mounted) setLoader(false);
      }
    };

    fetchJobs();
    return () => {
      mounted = false;
    };
  }, [page]);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleJobs = jobs.filter((job) => {
    if (!normalizedQuery) return true;
    return [job.title, job.company, job.location].some((value) =>
      value?.toLowerCase().includes(normalizedQuery),
    );
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 pb-32 lg:pb-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-48 h-[520px] w-[520px] rounded-full bg-emerald-200/35 blur-3xl" />
        <div className="absolute -right-48 top-24 h-[480px] w-[480px] rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#0f172a_1px,transparent_1px),linear-gradient(90deg,#0f172a_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <Navbar />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
              <BriefcaseBusiness size={14} /> Curated opportunities
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Find work that moves you forward.
            </h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
              Explore fresh roles and use HireFlow to apply, personalize outreach, and track every opportunity.
            </p>
          </div>

          <label className="flex h-12 w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-4 shadow-sm transition focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-100 md:w-72">
            <Search size={18} className="shrink-0 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search these jobs"
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </label>
        </header>

        {loader && jobs.length === 0 ? (
          <div className="grid min-h-80 place-items-center rounded-3xl border border-slate-200 bg-white/70">
            <div className="text-center">
              <Spinner className="mx-auto h-10 w-10 text-emerald-600" />
              <p className="mt-3 text-sm text-slate-500">Finding the latest roles…</p>
            </div>
          </div>
        ) : visibleJobs.length > 0 ? (
          <div className={`grid gap-5 md:grid-cols-2 xl:grid-cols-3 ${loader ? "opacity-60" : "opacity-100"}`}>
            {visibleJobs.map((job) => (
              <JobCard key={job.id || `${job.company}-${job.title}`} job={job} />
            ))}
          </div>
        ) : (
          <div className="grid min-h-80 place-items-center rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 text-center">
            <div>
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-500">
                <Search size={23} />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">
                {query ? "No matching roles" : "No jobs available right now"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {query ? "Try a company, title, or location." : "Check back soon for new opportunities."}
              </p>
            </div>
          </div>
        )}

        {jobs.length > 0 && !query && (
          <div className="mt-9 flex items-center justify-center gap-3">
            <button
              type="button"
              disabled={page === 1 || loader}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              aria-label="Previous page"
              className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={19} />
            </button>
            <span className="min-w-20 text-center text-sm font-medium text-slate-600">
              {loader ? "Loading…" : `Page ${page}`}
            </span>
            <button
              type="button"
              disabled={loader || jobs.length === 0}
              onClick={() => setPage((current) => current + 1)}
              aria-label="Next page"
              className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
