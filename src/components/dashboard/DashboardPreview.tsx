export default function DashboardPreview() {
    const stats = [
      {
        title: "Eligible Benefits",
        value: "12",
      },
      {
        title: "Applications",
        value: "3",
      },
      {
        title: "Documents",
        value: "8",
      },
      {
        title: "Benefits Received",
        value: "₹45,000",
      },
    ];
  
    return (
      <section className="py-24 bg-orange-50">
        <div className="mx-auto max-w-7xl px-6">
  
          <h2 className="mb-12 text-center text-4xl font-bold">
            Your Dashboard
          </h2>
  
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  
            {stats.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white p-8 shadow-md"
              >
                <p className="text-gray-500">
                  {item.title}
                </p>
  
                <h3 className="mt-3 text-4xl font-bold text-orange-600">
                  {item.value}
                </h3>
              </div>
            ))}
  
          </div>
  
        </div>
      </section>
    );
  }