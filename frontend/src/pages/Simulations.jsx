import React, { useEffect, useState } from 'react'
import API from '../api/axios'
import SimCard from '../components/SimCard'

export default function Simulations(){
  const [sims, setSims] = useState([])
  const [q, setQ] = useState('')

  const fetch = async () => {
    const res = await API.get('/simulations', { params: { q } })
    setSims(res.data)
  }
  useEffect(()=>{ fetch() }, [])

  const handleEnroll = async (simId) => {
    try{
      await API.post('/enrollments/enroll', { simulationId: simId })
      alert('Enrolled! Check Dashboard')
    } catch(err){
      alert(err.response?.data?.message || 'Error')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex gap-2 mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search simulations" className="border p-2 rounded flex-1" />
        <button onClick={fetch} className="px-3 bg-indigo-600 text-white rounded">Search</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sims.map(s => <SimCard key={s._id} sim={s} onEnroll={handleEnroll} />)}
      </div>
    </div>
  )
}
