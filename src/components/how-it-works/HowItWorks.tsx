const steps = [
    "Tell Us Your Situation",
    "AI Finds Relevant Schemes",
    "Upload Documents",
    "Apply & Track",
  ];
  
  export default function HowItWorks() {
    return (
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
  
          <h2 className="mb-16 text-center text-4xl font-bold">
            How Sarkar Saathi Works
          </h2>
  
          <div className="grid gap-6 md:grid-cols-4">
  
            {steps.map((step, index) => (
              <div
                key={step}
                className="rounded-3xl border bg-white p-8 text-center"
              >
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                  {index + 1}
                </div>
  
                <h3 className="font-semibold">
                  {step}
                </h3>
              </div>
            ))}
  
          </div>
  
        </div>
      </section>
    );
  }