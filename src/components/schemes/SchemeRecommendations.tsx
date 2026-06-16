export default function SchemeRecommendations() {
    const schemes = [
      {
        name: "Widow Pension Scheme",
        benefit: "₹1,000/month",
        description: "Financial assistance for widowed women",
      },
      {
        name: "Ayushman Bharat",
        benefit: "₹5 Lakh Coverage",
        description: "Health insurance for eligible families",
      },
      {
        name: "PM Ujjwala Yojana",
        benefit: "Free LPG Connection",
        description: "Support for women from low-income households",
      },
    ];
  
    return (
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
  
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-4xl font-bold">
              Schemes You May Qualify For
            </h2>
  
            <button className="text-orange-500 font-medium">
              View All →
            </button>
          </div>
  
          <div className="space-y-5">
            {schemes.map((scheme) => (
              <div
                key={scheme.name}
                className="rounded-3xl border bg-white p-6 shadow-sm hover:shadow-xl transition"
              >
                <div className="flex items-center justify-between">
  
                  <div>
                    <h3 className="text-xl font-semibold">
                      {scheme.name}
                    </h3>
  
                    <p className="mt-2 text-gray-600">
                      {scheme.description}
                    </p>
                  </div>
  
                  <div className="text-right">
                    <p className="font-bold text-orange-600">
                      {scheme.benefit}
                    </p>
  
                    <button className="mt-3 rounded-xl border px-4 py-2">
                      View Details
                    </button>
                  </div>
  
                </div>
              </div>
            ))}
          </div>
  
        </div>
      </section>
    );
  }