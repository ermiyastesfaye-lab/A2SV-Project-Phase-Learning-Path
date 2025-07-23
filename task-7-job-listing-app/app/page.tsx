"use client";
import JobCard from "./_components/JobCard";
import Link from "next/link";
import { useGetAllJobsQuery } from "./services/api/jobApi";
import { Job } from "./types/job";
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";

export default function Home() {
  const { data, isError, isLoading } = useGetAllJobsQuery();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <FaSpinner className="animate-spin text-blue-500 text-4xl" />
          <span className="text-lg text-gray-700 font-medium">
            Loading opportunities...
          </span>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <FaExclamationTriangle className="text-red-500 text-4xl" />
          <span className="text-lg text-red-700 font-medium">
            Failed to load opportunities. Please try again later.
          </span>
        </div>
      </main>
    );
  }

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
          {data.data.map((job: Job, idx: number) => (
            <Link key={job.id || idx} href={`/job/${job.id}`} className="block">
              <JobCard job={job} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
