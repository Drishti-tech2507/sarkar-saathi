"use client";

export default function ProfileCompletion({
  profile,
}: any) {

  const completion = 85;

  return (
    <div className="rounded-[30px] bg-white p-6 shadow-lg">

      <h2 className="text-xl font-bold">
        Profile Completion
      </h2>

      <div className="mt-6 flex justify-center">

        <div
          className="
          flex
          h-40
          w-40
          items-center
          justify-center
          rounded-full
          border-[12px]
          border-orange-500
          "
        >
          <div>
            <h2 className="text-4xl font-bold text-orange-600">
              {completion}%
            </h2>

            <p className="text-sm text-center text-gray-500">
              Complete
            </p>
          </div>
        </div>

      </div>

      <p className="mt-4 text-center text-gray-500">
        Add more details to unlock additional schemes.
      </p>

    </div>
  );
}