"use client";
import JobCard from "../_components/JobCard";
import Link from "next/link";
import { useGetBookmarksQuery } from "../services/api/bookmarkApi";
import { Job } from "../types/job";
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";

const BookmarksPage = () => {
  const { data: bookmarks, isError, isLoading } = useGetBookmarksQuery();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <FaSpinner className="animate-spin text-blue-500 text-4xl" />
          <span className="text-lg text-gray-700 font-medium">
            Logging In.....
          </span>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <FaExclamationTriangle className="text-red-500 text-4xl" />
          <span className="text-lg text-red-700 font-medium">
            You must be logged in to view bookmarks.
          </span>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <FaSpinner className="animate-spin text-blue-500 text-4xl" />
          <span className="text-lg text-gray-700 font-medium">
            Loading bookmarks...
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
            Failed to load bookmarks. Please try again later.
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-2 py-4 sm:px-4 md:px-8">
      <div className="max-w-5xl mx-auto bg-white border border-dashed border-blue-300 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm">
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4 border-b pb-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">
                {session?.user?.name}
              </span>
              <span className="text-sm text-gray-500">
                {session?.user?.email}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.history.back()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              type="button"
            >
              Go Back
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </header>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-black">
              Bookmarked Opportunities
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              {Array.isArray(bookmarks)
                ? `Showing ${bookmarks.length} results`
                : "No bookmarks found"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6" data-cy="bookmarked-jobs-list">
          {bookmarks &&
          Array.isArray(bookmarks.data) &&
          bookmarks.data.length > 0 ? (
            bookmarks.data.map((job: any, idx: number) => (
              <Link
                key={job.eventID || idx}
                href={`/job/${job.eventID}`}
                className="block"
              >
                <JobCard job={job} />
              </Link>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              No bookmarked jobs found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default BookmarksPage;
