"use client";

import { useState } from "react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="mx-auto max-w-3xl px-6 py-20">

        <div className="mb-8 text-center">
          <span className="rounded-full bg-orange-100 px-4 py-2 text-orange-600">
            Step {step} of 5
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Benefit Discovery Assessment
          </h1>

          <p className="mt-4 text-gray-600">
            Find every scheme you may qualify for.
          </p>
        </div>

        <div className="mb-10">
          <div className="h-3 rounded-full bg-gray-200">
            <div
              className="h-3 rounded-full bg-orange-500 transition-all"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        <div className="rounded-3xl bg-white p-10 shadow-lg">

          {step === 1 && (
            <div className="grid gap-6 md:grid-cols-2">
              <input
                className="rounded-xl border p-4"
                placeholder="Full Name"
              />

              <input
                className="rounded-xl border p-4"
                placeholder="Age"
              />

              <select className="rounded-xl border p-4">
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>

              <input
                className="rounded-xl border p-4"
                placeholder="State"
              />
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-6">
              <select className="rounded-xl border p-4">
                <option>Marital Status</option>
                <option>Single</option>
                <option>Married</option>
                <option>Widow</option>
              </select>

              <input
                className="rounded-xl border p-4"
                placeholder="Number of Children"
              />

              <input
                className="rounded-xl border p-4"
                placeholder="Dependents"
              />
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-6">
              <select className="rounded-xl border p-4">
                <option>Occupation</option>
                <option>Student</option>
                <option>Farmer</option>
                <option>Worker</option>
                <option>Business Owner</option>
                <option>Unemployed</option>
              </select>
            </div>
          )}

          {step === 4 && (
            <div className="grid gap-6">
              <input
                className="rounded-xl border p-4"
                placeholder="Annual Income"
              />

              <select className="rounded-xl border p-4">
                <option>BPL Card</option>
                <option>Yes</option>
                <option>No</option>
              </select>

              <select className="rounded-xl border p-4">
                <option>Ration Card Type</option>
                <option>APL</option>
                <option>BPL</option>
              </select>
            </div>
          )}

          {step === 5 && (
            <div className="grid gap-6">
              <label>
                <input type="checkbox" /> Widow
              </label>

              <label>
                <input type="checkbox" /> Disability
              </label>

              <label>
                <input type="checkbox" /> Pregnant
              </label>

              <label>
                <input type="checkbox" /> Senior Citizen
              </label>
            </div>
          )}

          <div className="mt-10 flex justify-between">
            <button
              onClick={prevStep}
              className="rounded-xl border px-6 py-3"
            >
              Back
            </button>

            {step < 5 ? (
              <button
                onClick={nextStep}
                className="rounded-xl bg-orange-500 px-6 py-3 text-white"
              >
                Next →
              </button>
            ) : (
              <button
                className="rounded-xl bg-green-600 px-6 py-3 text-white"
              >
                Analyze My Benefits
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}