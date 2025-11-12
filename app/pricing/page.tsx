import React from 'react';

export const metadata = {
  title: 'Pricing — useresignr',
  description: 'Pricing for Mental Reboot human guidance sessions and expert consultation.',
};

const CHECKOUT_URL = 'https://checkout.dodopayments.com/buy/pdt_LRMNSgMZUEECCuJ73oqea?quantity=1';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold mb-4">Mental Reboot — Human Guidance</h1>
          <p className="text-lg text-gray-700">Let's change your mental state — resignr team</p>
        </header>

        <section className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-4">About the product</h2>
            <p className="mb-4 text-gray-700">
              Mental Reboot is a human-guided support product from useresignr. We combine our simple analysis tool — designed to help you consider whether to quit your job based on various factors — with one-on-one expert guidance. Because this is a sensitive and life-changing decision, our certified mental health and career counselors deliver clarity, empathy, and practical advice.
            </p>

            <h3 className="text-xl font-semibold mb-2">What our counselors help with</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Identify your trigger points</li>
              <li>Rebuild confidence and self-esteem</li>
              <li>Receive tailored career guidance</li>
              <li>Create an action plan that fits your life</li>
            </ul>

            <blockquote className="p-4 bg-white border-l-4 border-indigo-600 rounded-md text-gray-800">
              "We understand your situation. Our certified mental health + career counselor will deliver clarity and support so you can make informed choices." — resignr team
            </blockquote>

            <p className="mt-6 text-sm text-gray-600">
              Note: Mental Reboot is not a replacement for emergency mental health services. If you are in crisis or feel unsafe, please contact local emergency services or a crisis hotline immediately.
            </p>
          </div>

          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Consultation — Mental Reboot</h3>
              <p className="text-gray-700 mb-4">One session with a certified mental health + career counselor to review your situation and create a plan.</p>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-sm text-gray-500 line-through">$51</span>
                <span className="text-3xl font-extrabold">$35.70</span>
                <span className="text-sm text-gray-500">per session (discounted)</span>
              </div>

              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md"
              >
                Consult now
              </a>

              <p className="mt-4 text-xs text-gray-500">Secure checkout powered by DodoPayments.</p>

              <p className="mt-3 text-sm text-gray-700">
                After payment, you will receive further instructions from us via email within 24 hours. We will schedule a meeting with a consultant and share the meeting details by email.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold mb-2">Why get human guidance?</h4>
              <p className="text-gray-700 mb-4">Automated tools can provide insights, but human counselors understand nuance, emotions, and context. A short session can offer perspective, safety, and concrete next steps.</p>

              <ul className="text-sm text-gray-700 list-disc list-inside space-y-2">
                <li>Confidential and empathetic support</li>
                <li>Actionable career and mental-health aligned advice</li>
                <li>Flexible scheduling and follow-up recommendations</li>
              </ul>
            </div>
          </aside>
        </section>

        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>Questions about bookings or refunds? Contact support at <a href="mailto:support@useresignr.app" className="text-indigo-600">support@useresignr.app</a></p>
        </footer>
      </div>
    </main>
  );
}