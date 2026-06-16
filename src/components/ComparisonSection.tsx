export default function ComparisonSection() {
    return (
      <section className="bg-gray-950 py-24 text-white">
  
        <div className="mx-auto max-w-7xl px-6">
  
          <h2 className="mb-16 text-center text-5xl font-bold">
            Why Sarkar Saathi?
          </h2>
  
          <div className="overflow-hidden rounded-3xl">
  
            <table className="w-full">
  
              <thead className="bg-orange-500">
                <tr>
                  <th className="p-6 text-left">
                    Feature
                  </th>
  
                  <th className="p-6">
                    MyScheme
                  </th>
  
                  <th className="p-6">
                    Sarkar Saathi
                  </th>
                </tr>
              </thead>
  
              <tbody>
  
                <tr>
                  <td className="p-6">
                    AI Eligibility Engine
                  </td>
  
                  <td className="text-center">
                    ❌
                  </td>
  
                  <td className="text-center">
                    ✅
                  </td>
                </tr>
  
                <tr>
                  <td className="p-6">
                    Benefit Value Calculator
                  </td>
  
                  <td className="text-center">
                    ❌
                  </td>
  
                  <td className="text-center">
                    ✅
                  </td>
                </tr>
  
                <tr>
                  <td className="p-6">
                    Personalized Dashboard
                  </td>
  
                  <td className="text-center">
                    ❌
                  </td>
  
                  <td className="text-center">
                    ✅
                  </td>
                </tr>
  
              </tbody>
  
            </table>
  
          </div>
  
        </div>
  
      </section>
    );
  }