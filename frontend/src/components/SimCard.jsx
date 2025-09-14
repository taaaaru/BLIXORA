import React from 'react'
export default function SimCard({ sim, onEnroll }){
  return (
    <div className="border p-4 rounded">
      <h3 className="font-semibold">{sim.title}</h3>
      <p className="text-sm">{sim.description}</p>
      <div className="mt-2 flex justify-between items-center">
        <div className="text-xs">{sim.category} • {sim.level} • {sim.duration || '—'}</div>
        <button onClick={() => onEnroll(sim._id)} className="px-2 py-1 bg-green-600 text-white rounded text-sm">Enroll</button>
      </div>
    </div>
  )
}
