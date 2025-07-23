import Image from "next/image";
import JobCard from "./_components/JobCard";
import { job_postings } from "./_data/jobs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 px-2 py-4 sm:px-4 md:px-8">
      <div className="max-w-5xl mx-auto bg-white border border-dashed border-blue-300 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-black">
              Opportunities
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Showing 7 results
            </p>
          </div>

          <div className="w-full sm:w-auto flex justify-end">
            <label htmlFor="sort" className="sr-only">
              Sort by
            </label>
            <select
              id="sort"
              className="w-full sm:w-auto text-sm border border-gray-300 rounded px-3 py-1 text-gray-700"
              defaultValue="relevant"
            >
              <option value="relevant">Most relevant</option>
              <option value="recent">Most recent</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {Array.isArray(job_postings)
            ? job_postings.map((job, idx) => (
                <Link key={idx} href={`/job/${idx}`} className="block">
                  <JobCard
                    title={job.title}
                    description={job.description}
                    company={job.company}
                    location={job.about?.location || "Unknown"}
                    logoText={job.company ? job.company[0] : "?"}
                    logoBg={"bg-blue-500"}
                    tags={job.about.required_skills}
                    id={String(idx)}
                    imageUrl={job.image}
                  />
                </Link>
              ))
            : null}
        </div>
      </div>
    </main>
  );
}
