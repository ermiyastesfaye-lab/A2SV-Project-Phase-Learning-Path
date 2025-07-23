import { job_postings } from "../../_data/jobs";
import React from "react";

export default function JobDescriptionPage({
  params,
}: {
  params: { id: string };
}) {
  let id = params.id;
  if (Array.isArray(id)) id = id[0];

  let job: (typeof job_postings)[number] | undefined = job_postings[Number(id)];
  if (!job && typeof id === "string") {
    job = job_postings.find(
      (j) => j.title.replace(/\s+/g, "-").toLowerCase() === id
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-5xl mx-auto bg-white border border-dashed border-blue-300 p-8 rounded-lg shadow-sm text-center text-red-600">
          Job not found.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-2 py-4 sm:px-4 md:px-8">
      <div className="max-w-5xl mx-auto bg-white border border-dashed border-blue-300 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm flex flex-col md:flex-row gap-8">
        {/* Left: Main Description */}
        <div className="flex-1">
          {job.image && (
            <img
              src={job.image}
              alt={job.title + " avatar"}
              className="w-16 h-16 rounded-full mb-4 object-cover border border-gray-200"
            />
          )}
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
            Description
          </h2>
          <p className="text-gray-700 mb-6">{job.description}</p>

          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
            Responsibilities
          </h3>
          <ul className="mb-6 list-none space-y-2">
            {job.responsibilities?.map((resp, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span>
                {resp}
              </li>
            ))}
          </ul>

          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
            Ideal Candidate we want
          </h3>
          <ul className="mb-6 list-none space-y-2">
            <li className="font-bold text-blue-800">
              Young({job.ideal_candidate?.age}) {job.ideal_candidate?.gender}{" "}
              {job.title}
            </li>
            {job.ideal_candidate?.traits?.map((trait, i) => (
              <li key={i} className="text-gray-700">
                <span className="font-semibold">• </span>
                {trait}
              </li>
            ))}
          </ul>

          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
            When & Where
          </h3>
          <div className="flex items-center gap-2 text-gray-700">
            <span className="text-blue-500">📍</span>
            {job.when_where}
          </div>
        </div>

        {/* Right: Sidebar */}
        <aside className="w-full md:w-80 flex-shrink-0 mt-8 md:mt-0">
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">About</h4>
            <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
              <li>
                <span className="font-medium text-gray-500">Posted On</span>{" "}
                <span className="ml-2">{job.about?.posted_on}</span>
              </li>
              <li>
                <span className="font-medium text-gray-500">Deadline</span>{" "}
                <span className="ml-2">{job.about?.deadline}</span>
              </li>
              <li>
                <span className="font-medium text-gray-500">Location</span>{" "}
                <span className="ml-2">{job.about?.location}</span>
              </li>
              <li>
                <span className="font-medium text-gray-500">Start Date</span>{" "}
                <span className="ml-2">{job.about?.start_date}</span>
              </li>
              <li>
                <span className="font-medium text-gray-500">End Date</span>{" "}
                <span className="ml-2">{job.about?.end_date}</span>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">Categories</h4>
            <div className="flex gap-2 flex-wrap">
              {job.about?.categories?.map((cat, i) => (
                <span
                  key={i}
                  className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Required Skills
            </h4>
            <div className="flex gap-2 flex-wrap">
              {job.about?.required_skills?.map((skill, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
