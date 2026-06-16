"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BenefitDiscovery() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    state: "",
    district: "",

    maritalStatus: "",
    children: "",
    dependents: "",

    education: "",

    occupation: "",

    income: "",
    bpl: "",
    rationCard: "",

    categories: [] as string[],

aadhaar: "",
mobile: "",
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };
  const nextStep = () => {
    if (step === 1) {
      if (
        !formData.name ||
        !formData.age ||
        !formData.gender ||
        !formData.state ||
        !formData.district
      ) {
        alert("Please complete all personal details.");
        return;
      }
    }
  
    if (step === 3 && !formData.education) {
      alert("Please select education level.");
      return;
    }
  
    if (step === 4 && !formData.occupation) {
      alert("Please select occupation.");
      return;
    }
  
    if (step === 5 && !formData.income) {
      alert("Please enter annual income.");
      return;
    }
  
    setStep(step + 1);
  };

  const progress = (step / 6) * 100;

  return (
    <div className="min-h-screen bg-orange-50">

      <div className="mx-auto max-w-4xl px-6 py-20">

        <div className="text-center">

          <span className="rounded-full bg-orange-100 px-5 py-2 text-orange-600">
            Step {step} of 6
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Benefit Discovery Assessment
          </h1>

          <p className="mt-4 text-gray-600">
            Help AI Saathi discover all benefits you qualify for.
          </p>

        </div>

        <div className="mt-8 h-3 rounded-full bg-gray-200">
          <div
            className="h-3 rounded-full bg-orange-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-10 rounded-3xl bg-white p-10 shadow-xl">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="grid gap-6 md:grid-cols-2">

              <input
                placeholder="Full Name"
                className="rounded-xl border p-4"
                value={formData.name}
                onChange={(e) =>
                  updateField("name", e.target.value)
                }
              />

              <input
                placeholder="Age"
                className="rounded-xl border p-4"
                value={formData.age}
                onChange={(e) =>
                  updateField("age", e.target.value)
                }
              />

              <select
                className="rounded-xl border p-4"
                onChange={(e) =>
                  updateField("gender", e.target.value)
                }
              >
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <select
  className="rounded-xl border p-4"
  value={formData.state}
  onChange={(e) =>
    updateField("state", e.target.value)
  }
>
  <option value="">
    Select State
  </option>

  <option>Andhra Pradesh</option>
  <option>Arunachal Pradesh</option>
  <option>Assam</option>
  <option>Bihar</option>
  <option>Chhattisgarh</option>
  <option>Delhi</option>
  <option>Goa</option>
  <option>Gujarat</option>
  <option>Haryana</option>
  <option>Himachal Pradesh</option>
  <option>Jharkhand</option>
  <option>Karnataka</option>
  <option>Kerala</option>
  <option>Madhya Pradesh</option>
  <option>Maharashtra</option>
  <option>Odisha</option>
  <option>Punjab</option>
  <option>Rajasthan</option>
  <option>Tamil Nadu</option>
  <option>Telangana</option>
  <option>Uttar Pradesh</option>
  <option>Uttarakhand</option>
  <option>West Bengal</option>
</select>

              <input
                placeholder="District"
                className="rounded-xl border p-4 md:col-span-2"
                onChange={(e) =>
                  updateField("district", e.target.value)
                }
              />
              <input
  placeholder="Aadhaar Number"
  className="rounded-xl border p-4"
  onChange={(e) =>
    updateField(
      "aadhaar",
      e.target.value
    )
  }
/>

<input
  placeholder="Mobile Number"
  className="rounded-xl border p-4"
  onChange={(e) =>
    updateField(
      "mobile",
      e.target.value
    )
  }
/>

            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="grid gap-6">

              <select
                className="rounded-xl border p-4"
                onChange={(e) =>
                  updateField(
                    "maritalStatus",
                    e.target.value
                  )
                }
              >
                <option>Marital Status</option>
                <option>Single</option>
                <option>Married</option>
                <option>Widow</option>
              </select>

              <input
                placeholder="Number of Children"
                className="rounded-xl border p-4"
                onChange={(e) =>
                  updateField("children", e.target.value)
                }
              />

              <input
                placeholder="Dependents"
                className="rounded-xl border p-4"
                onChange={(e) =>
                  updateField("dependents", e.target.value)
                }
              />

            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <select
              className="w-full rounded-xl border p-4"
              onChange={(e) =>
                updateField("education", e.target.value)
              }
            >
             <option>10th Pass</option>
<option>12th Pass</option>
<option>Diploma</option>
<option>ITI</option>
<option>Undergraduate</option>
<option>Postgraduate</option>
<option>PhD</option>
<option>Not Studying</option>
            </select>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="grid gap-4">

              {[
  "Student",
  "Farmer",
  "Daily Wage Worker",
  "Government Employee",
  "Private Employee",
  "Self Employed",
  "Business Owner",
  "Homemaker",
  "Unemployed",
  "Retired",
].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    updateField("occupation", item)
                  }
                  className={`rounded-xl border p-4 text-left ${
                    formData.occupation === item
                      ? "border-orange-500 bg-orange-50"
                      : ""
                  }`}
                >
                  {item}
                </button>
              ))}

            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="grid gap-6">

              <input
                placeholder="Annual Family Income"
                className="rounded-xl border p-4"
                onChange={(e) =>
                  updateField("income", e.target.value)
                }
              />

              <select
                className="rounded-xl border p-4"
                onChange={(e) =>
                  updateField("bpl", e.target.value)
                }
              >
                <option>BPL Card</option>
                <option>Yes</option>
                <option>No</option>
              </select>

              <select
                className="rounded-xl border p-4"
                onChange={(e) =>
                  updateField(
                    "rationCard",
                    e.target.value
                  )
                }
              >
                <option>Ration Card</option>
                <option>APL</option>
                <option>BPL</option>
              </select>

            </div>
          )}

          {/* STEP 6 */}
          {step === 6 && (
            <div className="grid gap-4 md:grid-cols-2">

              {[
  "Widow",
  "Disability",
  "Pregnant",
  "Senior Citizen",
  "SC",
  "ST",
  "OBC",
  "General",
  "Minority",
  "Migrant Worker",
  "Single Parent",
  "First Generation Learner",
  "Student",
  "Teacher",
  "Govt. Employee",
  "Private Employee",
].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 rounded-xl border p-4"
                >
                  <input
                    type="checkbox"
                    onChange={() =>
                      toggleCategory(item)
                    }
                  />
                  {item}
                </label>
              ))}

            </div>
          )}

          <div className="mt-10 flex justify-between">

            <button
              onClick={() =>
                step > 1 && setStep(step - 1)
              }
              className="rounded-xl border px-6 py-3"
            >
              Back
            </button>

            {step < 6 ? (
              <button
              onClick={nextStep}
                className="rounded-xl bg-orange-500 px-6 py-3 text-white"
              >
                Next →
              </button>
            ) : (
                <button
                onClick={async () => {
                  try {
                    const response =
                      await fetch(
                        "/api/profile/save",
                        {
                          method: "POST",
              
                          headers: {
                            "Content-Type":
                              "application/json",
                          },
              
                          body: JSON.stringify(
                            formData
                          ),
                        }
                      );
              
                    const data =
                      await response.json();
              
                    if (data.success) {
                      localStorage.setItem(
                        "benefitProfile",
                        JSON.stringify(
                          formData
                        )
                      );
              
                      router.push(
                        "/analyzing"
                      );
                    } else {
                      alert(
                        "Failed to save profile"
                      );
                    }
                  } catch (error) {
                    console.error(
                      error
                    );
              
                    alert(
                      "Something went wrong"
                    );
                  }
                }}
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