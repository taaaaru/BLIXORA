import React, { useEffect, useState } from 'react'
import API from '../api/axios'

export default function Dashboard(){
  const [enrolls, setEnrolls] = useState([])
  const fetch = async ()=>{ 
    const res = await API.get('/enrollments/my')
    setEnrolls(res.data)
  }
  useEffect(()=>{ fetch() }, [])
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl mb-4">Your Dashboard</h2>
      <div>
        {enrolls.length===0 && <div>No enrollments yet. Browse simulations.</div>}
        <ul className="space-y-3">
          {enrolls.map(e=> (
            <li key={e._id} className="border p-3 rounded">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{e.simulationId.title}</div>
                  <div className="text-sm">{e.simulationId.description}</div>
                </div>
                <div className="text-sm">Status: {e.status}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
