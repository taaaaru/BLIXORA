import React from 'react';
export default function Home(){
  return (
    <div className="max-w-3xl mx-auto">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold">Blixora Labs</h1>
        <p className="mt-4 text-lg">Simulate. Solve. Succeed. Interactive learning simulations for tech students.</p>
        <div className="mt-6">
          <a href="/simulations" className="px-4 py-2 bg-indigo-600 text-white rounded">Browse Simulations</a>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <ol className="mt-4 list-decimal ml-6">
          <li>Register or login</li>
          <li>Browse simulations</li>
          <li>Enroll and track progress on your dashboard</li>
        </ol>
      </section>
    </div>
  )
}
