"use client";

import { useGetJobByIdQuery } from "@/app/services/api/jobApi";
import React from "react";
import { Job } from "../../types/job";
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";

export default function JobDescriptionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const { data, isError, isLoading, error } = useGetJobByIdQuery(id);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <FaSpinner className="animate-spin text-blue-500 text-4xl" />
          <span className="text-lg text-gray-700 font-medium">
            Loading opportunity...
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

  if (!data.data) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center px-2 py-4 sm:px-4 md:px-8">
        <div className="max-w-5xl w-full bg-white border border-dashed border-blue-300 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm text-center text-red-600">
          Job not found.
        </div>
      </main>
    );
  }

  const job: Job = data.data;
  return (
    <main className="min-h-screen bg-gray-100 px-2 py-4 sm:px-4 md:px-8">
      <div className="max-w-5xl mx-auto bg-white border border-dashed border-blue-300 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm flex flex-col md:flex-row gap-8">
        {/* Left: Main Description */}
        <div className="flex-1">
          {job.logoUrl && (
            <img
              src={job.logoUrl}
              alt={job.orgName + " logo"}
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
            {job.responsibilities &&
              job.responsibilities.split("\n").map((resp, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-500">✓</span>
                  {resp}
                </li>
              ))}
          </ul>

          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
            Ideal Candidate
          </h3>
          <p className="mb-6 text-gray-700">{job.idealCandidate}</p>

          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
            When & Where
          </h3>
          <div className="flex items-center gap-2 text-gray-700">
            <span className="text-blue-500">📍</span>
            {job.whenAndWhere}
          </div>
        </div>

        {/* Right: Sidebar */}
        <aside className="w-full md:w-80 flex-shrink-0 mt-8 md:mt-0">
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">About</h4>
            <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
              <li>
                <span className="font-medium text-gray-500">Posted On</span>{" "}
                <span className="ml-2">
                  {job.datePosted &&
                    new Date(job.datePosted).toLocaleDateString()}
                </span>
              </li>
              <li>
                <span className="font-medium text-gray-500">Deadline</span>{" "}
                <span className="ml-2">
                  {job.deadline && new Date(job.deadline).toLocaleDateString()}
                </span>
              </li>
              <li>
                <span className="font-medium text-gray-500">Location</span>{" "}
                <span className="ml-2">
                  {job.location && Array.isArray(job.location)
                    ? job.location.join(", ")
                    : "Unknown"}
                </span>
              </li>
              <li>
                <span className="font-medium text-gray-500">Start Date</span>{" "}
                <span className="ml-2">
                  {job.startDate &&
                    new Date(job.startDate).toLocaleDateString()}
                </span>
              </li>
              <li>
                <span className="font-medium text-gray-500">End Date</span>{" "}
                <span className="ml-2">
                  {job.endDate && new Date(job.endDate).toLocaleDateString()}
                </span>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">Categories</h4>
            <div className="flex gap-2 flex-wrap">
              {job.categories?.map((cat, i) => (
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
              {job.requiredSkills?.map((skill, i) => (
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
