export default function AccessibilitySection() {
    return (
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-5xl font-bold">
            Accessibility Features
          </h2>
  
          <div className="grid gap-6 md:grid-cols-3">
  
            <div className="rounded-3xl border p-8">
              🌐 Multi Language Support
            </div>
  
            <div className="rounded-3xl border p-8">
              🎤 Voice Navigation
            </div>
  
            <div className="rounded-3xl border p-8">
              ♿ Accessibility Tools
            </div>
  
          </div>
        </div>
      </section>
    );
  }