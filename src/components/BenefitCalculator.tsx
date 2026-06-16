export default function BenefitCalculator() {
    return (
      <section className="bg-orange-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-5xl font-bold">
            Benefit Value Calculator
          </h2>
  
          <div className="rounded-3xl bg-white p-10 shadow-xl">
            <h3 className="text-3xl font-bold">
              Potential Benefits
            </h3>
  
            <ul className="mt-6 space-y-3">
              <li>₹50,000 Scholarship</li>
              <li>₹5,00,000 Health Coverage</li>
              <li>₹10,000 Skill Development Grant</li>
            </ul>
  
            <h2 className="mt-8 text-4xl font-bold text-green-600">
              Total Value: ₹5.6 Lakhs
            </h2>
          </div>
        </div>
      </section>
    );
  }