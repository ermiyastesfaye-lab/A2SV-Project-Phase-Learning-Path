// components/JobCard.tsx

import { Job } from "../types/job";

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl mx-auto">
      <div className="flex items-start gap-4">
        {/* Avatar or Logo */}
        {job.logoUrl ? (
          <img
            src={job.logoUrl}
            alt={job.orgName + " logo"}
            className="rounded-full w-16 h-16 object-cover border border-gray-200"
          />
        ) : (
          <div className="flex items-center justify-center rounded-full w-12 h-12 text-white text-xl font-bold bg-blue-500">
            {job.orgName ? job.orgName[0] : "?"}
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-md font-semibold text-gray-800">{job.title}</h3>
          <p className="text-sm text-gray-500 mb-2">
            {job.orgName} •{" "}
            {job.location && Array.isArray(job.location)
              ? job.location.join(", ")
              : "Unknown"}
          </p>

          <p className="text-sm text-gray-700 mb-3">{job.description}</p>

          {Array.isArray(job.requiredSkills) &&
            job.requiredSkills.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {job.requiredSkills.map((skill, i) => {
                  // Simple color coding based on skill name
                  let colorClass = "bg-blue-100 text-blue-800";
                  if (skill.toLowerCase().includes("python"))
                    colorClass = "bg-yellow-100 text-yellow-800";
                  else if (skill.toLowerCase().includes("react"))
                    colorClass = "bg-cyan-100 text-cyan-800";
                  else if (skill.toLowerCase().includes("css"))
                    colorClass = "bg-pink-100 text-pink-800";
                  else if (skill.toLowerCase().includes("typescript"))
                    colorClass = "bg-purple-100 text-purple-800";
                  else if (skill.toLowerCase().includes("node"))
                    colorClass = "bg-green-100 text-green-800";
                  else if (skill.toLowerCase().includes("java"))
                    colorClass = "bg-orange-100 text-orange-800";
                  else if (skill.toLowerCase().includes("sql"))
                    colorClass = "bg-red-100 text-red-800";
                  return (
                    <span
                      key={"skill-" + i}
                      className={`text-xs px-3 py-1 rounded-full font-medium border ${colorClass}`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
