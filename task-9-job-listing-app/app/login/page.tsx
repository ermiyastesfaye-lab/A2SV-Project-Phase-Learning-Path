"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaExclamationTriangle, FaSpinner } from "react-icons/fa";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const user = {
      email: form.email,
      password: form.password,
      redirect: false,
      callbackUrl: "/",
    };
    try {
      const result = await signIn("credentials", user);
      if (result?.error) {
        setError(result.error);
      } else if (result?.ok || result?.url) {
        window.location.href = result.url || "/";
      }
    } catch (err: any) {
      setError(err?.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <FaSpinner className="animate-spin text-blue-500 text-4xl" />
          <span className="text-lg text-gray-700 font-medium">
            Logging In...
          </span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <FaExclamationTriangle className="text-red-500 text-4xl" />
          <span className="text-lg text-red-700 font-medium">
            Failed to login. Please try again later.
          </span>
          <span className="text-sm text-red-500 font-mono break-all max-w-xs text-center">
            {error}
          </span>
          <button
            className="mt-2 px-4 py-2 bg-indigo-700 text-white rounded-lg font-semibold hover:bg-indigo-800 transition"
            onClick={() => setError(null)}
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back,
        </h2>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center justify-center w-full py-2 mb-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
            <g>
              <path
                fill="#4285F4"
                d="M24 9.5c3.54 0 6.73 1.22 9.24 3.22l6.9-6.9C36.13 2.36 30.4 0 24 0 14.61 0 6.27 5.48 2.13 13.44l8.06 6.27C12.6 13.13 17.87 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.14 24.55c0-1.54-.14-3.02-.39-4.45H24v8.43h12.44c-.54 2.77-2.18 5.12-4.64 6.7l7.18 5.59C43.73 36.61 46.14 30.98 46.14 24.55z"
              />
              <path
                fill="#FBBC05"
                d="M10.19 28.71c-1.13-3.36-1.13-6.97 0-10.33l-8.06-6.27C.41 16.09 0 20.01 0 24c0 3.99.41 7.91 2.13 11.89l8.06-6.27z"
              />
              <path
                fill="#EA4335"
                d="M24 44c6.4 0 12.13-2.36 16.14-6.45l-7.18-5.59c-2.01 1.35-4.59 2.14-7.46 2.14-6.13 0-11.4-3.63-13.81-8.94l-8.06 6.27C6.27 42.52 14.61 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </g>
          </svg>
          <span className="font-medium text-gray-700">Login with Google</span>
        </button>
        <button
          type="button"
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="flex items-center justify-center w-full py-2 mb-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 mr-2 text-gray-700"
          >
            <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.653 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.381.202 2.399.099 2.653.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.481C19.138 20.19 22 16.436 22 12.012 22 6.484 17.523 2 12 2z" />
          </svg>
          <span className="font-medium text-gray-700">Login with GitHub</span>
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={form.email}
              onChange={handleChange}
              required
              className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
              className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-700 text-white rounded-lg font-semibold hover:bg-indigo-800 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-indigo-700 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
