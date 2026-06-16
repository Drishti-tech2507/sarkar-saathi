"use client";

import { useState, useEffect } from "react";
import { sendProfileEmail } from "@/lib/email";

export default function ProfilePage() {
  const [step, setStep] = useState(1);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      // Personal

      name: "",
      age: "",
      gender: "",

      state: "",
      district: "",
      mobile: "",

      // Financial

      categories: [] as string[],

      income: "",

      bpl: "No",

      rationCard: "No",

      // Occupation

      occupation: "",

      course: "",
      college: "",
      year: "",

      landOwned: "",
      cropType: "",

      disabilityPercent: "",

      pregnancyMonth: "",

      // Benefits

      benefitsInterested:
        [] as string[],
    });
    useEffect(() => {
      const savedName =
        localStorage.getItem("name");
    
      const savedMobile =
        localStorage.getItem("mobile");
    
      if (savedName) {
        setFormData((prev) => ({
          ...prev,
          name: savedName,
        }));
      }
    
      if (savedMobile) {
        setFormData((prev) => ({
          ...prev,
          mobile: savedMobile,
        }));
      }
    }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const toggleBenefit = (
    benefit: string
  ) => {
    setFormData((prev) => ({
      ...prev,

      benefitsInterested:
        prev.benefitsInterested.includes(
          benefit
        )
          ? prev.benefitsInterested.filter(
              (b) =>
                b !== benefit
            )
          : [
              ...prev.benefitsInterested,
              benefit,
            ],
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const uid =
        localStorage.getItem(
          "uid"
        );

      const response =
        await fetch(
          "/api/profile",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              uid,

              ...formData,

              age: Number(
                formData.age
              ),

              income: Number(
                formData.income
              ),

              disabilityPercent:
                Number(
                  formData.disabilityPercent
                ) || 0,

              pregnancyMonth:
                Number(
                  formData.pregnancyMonth
                ) || 0,

              profileCompleted: true,

              profileCompletion:
                100,
            }),
          }
        );

      const data =
        await response.json();

        if (data.success) {
          const uid =
  localStorage.getItem(
    "uid"
  );

await fetch(
  "/api/notifications/create",
  {
    method: "POST",

    headers: {
      "Content-Type":
        "application/json",
    },

    body: JSON.stringify({
      uid,

      title:
        "Profile Completed",

      message:
        "Your profile has been completed successfully.",
    }),
  }
);

          localStorage.setItem(
            "profileId",
            data.profile._id
          );
        
          const email =
            localStorage.getItem(
              "email"
            );
        
          if (email) {
        
            const sent =
              await sendProfileEmail(
                formData.name,
                email,
                formData.occupation
              );
        
            console.log(
              "PROFILE MAIL STATUS:",
              sent
            );
        
            if (sent) {
        
              await fetch(
                "/api/users/update-mail-status",
                {
                  method: "POST",
                  headers: {
                    "Content-Type":
                      "application/json",
                  },
                  body: JSON.stringify({
                    uid,
                    type: "profile",
                  }),
                }
              );
        
            }
          }
        
          window.location.href =
            "/benefits";
        }

 else {
        alert(
          "Failed to save profile"
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const progress =
    (step / 4) * 100;

  return (
    <main className="min-h-screen bg-[#fafafa] py-20">
      <div className="mx-auto max-w-5xl px-6">

        <div className="rounded-[32px] bg-white p-10 shadow-xl">

          <h1 className="text-4xl font-bold">
            Eligibility Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Complete your profile
            to discover government
            benefits and schemes.
          </p>

          {/* Progress */}

          <div className="mt-8">

            <div className="flex justify-between text-sm">

              <span>
                Step {step} of 4
              </span>

              <span>
                {progress}%
              </span>

            </div>

            <div className="mt-2 h-3 rounded-full bg-gray-200">

              <div
                className="h-3 rounded-full bg-orange-500 transition-all"
                style={{
                  width:
                    `${progress}%`,
                }}
              />

            </div>

          </div>
          <div
  className="
  mb-8
  rounded-3xl
  bg-orange-50
  p-6
  border
  border-orange-100
  "
>
  <h2 className="text-xl font-bold">
    Welcome 👋
  </h2>

  <p className="mt-2 text-gray-600">
    Complete your profile to unlock
    personalized government schemes,
    scholarships, pensions and benefits.
  </p>
</div>

          <form
            onSubmit={
              handleSubmit
            }
            className="mt-10"
          >

            {/* STEP 1 */}

            {step === 1 && (
              <div className="grid gap-5 md:grid-cols-2">

                <input
                  name="name"
                  placeholder="Full Name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  className="rounded-xl border p-3"
                  required
                />

                <input
                  name="age"
                  type="number"
                  placeholder="Age"
                  value={
                    formData.age
                  }
                  onChange={
                    handleChange
                  }
                  className="rounded-xl border p-3"
                  required
                />

                <select
                  name="gender"
                  value={
                    formData.gender
                  }
                  onChange={
                    handleChange
                  }
                  className="rounded-xl border p-3"
                  required
                >
                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

                <input
                  name="state"
                  placeholder="State"
                  value={
                    formData.state
                  }
                  onChange={
                    handleChange
                  }
                  className="rounded-xl border p-3"
                />

                <input
                  name="district"
                  placeholder="District"
                  value={
                    formData.district
                  }
                  onChange={
                    handleChange
                  }
                  className="rounded-xl border p-3"
                />

                <input
                  name="mobile"
                  placeholder="Mobile Number"
                  value={
                    formData.mobile
                  }
                  onChange={
                    handleChange
                  }
                  className="rounded-xl border p-3"
                />

              </div>
            )}

            {/* STEP 2 */}

            {step === 2 && (
              <div className="grid gap-5 md:grid-cols-2">

                <select
                  name="categories"
                  onChange={(e) =>
                    setFormData({
                      ...formData,

                      categories: [
                        e.target.value,
                      ],
                    })
                  }
                  className="rounded-xl border p-3"
                >
                  <option value="">
                    Select Category
                  </option>

                  <option value="General">
                    General
                  </option>

                  <option value="OBC">
                    OBC
                  </option>

                  <option value="SC">
                    SC
                  </option>

                  <option value="ST">
                    ST
                  </option>

                  <option value="EWS">
                    EWS
                  </option>

                </select>

                <input
                  name="income"
                  type="number"
                  placeholder="Annual Income"
                  value={
                    formData.income
                  }
                  onChange={
                    handleChange
                  }
                  className="rounded-xl border p-3"
                />

                <select
                  name="bpl"
                  value={
                    formData.bpl
                  }
                  onChange={
                    handleChange
                  }
                  className="rounded-xl border p-3"
                >
                  <option value="No">
                    BPL - No
                  </option>

                  <option value="Yes">
                    BPL - Yes
                  </option>

                </select>

                <select
                  name="rationCard"
                  value={
                    formData.rationCard
                  }
                  onChange={
                    handleChange
                  }
                  className="rounded-xl border p-3"
                >
                  <option value="No">
                    Ration Card - No
                  </option>

                  <option value="Yes">
                    Ration Card - Yes
                  </option>

                </select>

              </div>
            )}

            {/* STEP 3 STARTS IN PART 2 */}
                        {/* STEP 3 */}

                        {step === 3 && (
              <div className="space-y-5">

                <select
                  name="occupation"
                  value={
                    formData.occupation
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-xl border p-3"
                >
                  <option value="">
                    Select Occupation
                  </option>

                  <option>
                    Student
                  </option>

                  <option>
                    Farmer
                  </option>

                  <option>
                    Private Employee
                  </option>

                  <option>
                    Government Employee
                  </option>

                  <option>
                    Entrepreneur
                  </option>

                  <option>
                    Disabled
                  </option>

                  <option>
                    Widow
                  </option>

                  <option>
                    Pregnant Woman
                  </option>

                  <option>
                    Senior Citizen
                  </option>

                  <option>
                    Unemployed
                  </option>

                </select>

                {formData.occupation ===
                  "Student" && (
                  <div className="grid gap-4 md:grid-cols-2">

                    <input
                      name="course"
                      placeholder="Course"
                      onChange={
                        handleChange
                      }
                      className="rounded-xl border p-3"
                    />

                    <input
                      name="college"
                      placeholder="College"
                      onChange={
                        handleChange
                      }
                      className="rounded-xl border p-3"
                    />

                  </div>
                )}

                {formData.occupation ===
                  "Farmer" && (
                  <div className="grid gap-4 md:grid-cols-2">

                    <input
                      name="landOwned"
                      placeholder="Land Owned (Acres)"
                      onChange={
                        handleChange
                      }
                      className="rounded-xl border p-3"
                    />

                    <input
                      name="cropType"
                      placeholder="Crop Type"
                      onChange={
                        handleChange
                      }
                      className="rounded-xl border p-3"
                    />

                  </div>
                )}

                {formData.occupation ===
                  "Disabled" && (
                  <input
                    name="disabilityPercent"
                    placeholder="Disability Percentage"
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border p-3"
                  />
                )}

                {formData.occupation ===
                  "Pregnant Woman" && (
                  <input
                    name="pregnancyMonth"
                    placeholder="Pregnancy Month"
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border p-3"
                  />
                )}

              </div>
            )}

            {/* STEP 4 */}

            {step === 4 && (
              <div>

                <h3 className="mb-5 text-xl font-semibold">
                  Select Benefits You Need
                </h3>

                <div className="grid gap-4 md:grid-cols-2">

                  {[
                    "Scholarship",
                    "Hostel",
                    "Laptop",
                    "Internship",
                    "Healthcare",
                    "Pension",
                    "Housing",
                    "Skill Development",
                    "Self Employment",
                    "Farmer Subsidy",
                    "Crop Insurance",
                    "Women Welfare",
                  ].map((benefit) => (
                    <button
                      key={benefit}
                      type="button"
                      onClick={() =>
                        toggleBenefit(
                          benefit
                        )
                      }
                      className={`
                        rounded-xl
                        border
                        p-4
                        text-left
                        transition

                        ${
                          formData.benefitsInterested.includes(
                            benefit
                          )
                            ? "border-orange-500 bg-orange-50 text-orange-600"
                            : "border-gray-200"
                        }
                      `}
                    >
                      {benefit}
                    </button>
                  ))}

                </div>

              </div>
            )}

            {/* Buttons */}

            <div className="mt-10 flex justify-between">

              {step > 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    setStep(
                      step - 1
                    )
                  }
                  className="
                  rounded-xl
                  bg-gray-200
                  px-6
                  py-3
                  "
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() =>
                    setStep(
                      step + 1
                    )
                  }
                  className="
                  rounded-xl
                  bg-orange-500
                  px-6
                  py-3
                  text-white
                  hover:bg-orange-600
                  "
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="
                  rounded-xl
                  bg-orange-500
                  px-8
                  py-3
                  text-white
                  hover:bg-orange-600
                  "
                >
                  {loading
                    ? "Saving..."
                    : "Find Schemes"}
                </button>
              )}

            </div>

          </form>

        </div>

      </div>

    </main>
  );
}