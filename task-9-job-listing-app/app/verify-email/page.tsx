"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useVerifyMutation } from "../services/api/jobApi";

export default function VerifyEmailPage() {
  const [verifyOTP, { data, isError, isLoading }] = useVerifyMutation();
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [resendEnabled, setResendEnabled] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  const handleChange = (idx: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[idx] = value;
      setCode(newCode);
      // Auto-focus next input
      if (value && idx < 3) {
        const next = document.getElementById(`code-${idx + 1}`);
        next?.focus();
      }
    }
  };

  const handleResend = () => {
    setTimer(30);
    setResendEnabled(false);
    // TODO: trigger resend code API
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = code.join("");

    const credentials = {
      email: email,
      OTP: otp,
    };

    try {
      const result = await verifyOTP(credentials).unwrap();
      if (result && result.success) {
        window.location.href = `/login`;
      } else {
        alert(result?.message || "Verification failed");
      }
    } catch (e: any) {
      alert(e?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Verify Email
        </h2>
        <p className="text-gray-500 text-center mb-6">
          We've sent a verification code to{" "}
          <span className="font-semibold text-indigo-700">{email}</span>. To
          complete the verification process, please enter the code here.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full"
        >
          <div className="flex gap-3 mb-4">
            {code.map((digit, idx) => (
              <input
                key={idx}
                id={`code-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="text-black w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            ))}
          </div>
          <div className="text-sm text-gray-400 mb-4">
            You can request to{" "}
            <button
              type="button"
              className="text-indigo-600 underline"
              disabled={!resendEnabled}
              onClick={handleResend}
            >
              Resend code
            </button>{" "}
            in {resendEnabled ? "" : `0:${timer.toString().padStart(2, "0")}`}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-300 text-white rounded-lg font-semibold hover:bg-indigo-400 transition"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
