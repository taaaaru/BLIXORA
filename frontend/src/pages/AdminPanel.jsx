import React, { useEffect, useState } from 'react'
import API from '../api/axios'

export default function AdminPanel(){
  const [sims, setSims] = useState([])
  const [form, setForm] = useState({ title:'', category:'', level:'Beginner', duration:'', description:'' })
  const fetch = async ()=>{ const res = await API.get('/simulations'); setSims(res.data) }
  useEffect(()=>{ fetch() }, [])

  const create = async (e)=>{
    e.preventDefault()
    await API.post('/simulations', form); setForm({ title:'', category:'', level:'Beginner', duration:'', description:'' }); fetch()
  }
  const remove = async (id)=>{ if(!confirm('Delete?')) return; await API.delete(`/simulations/${id}`); fetch() }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl mb-4">Admin — Manage Simulations</h2>
      <form onSubmit={create} className="grid gap-2 grid-cols-1 md:grid-cols-2 mb-6">
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="p-2 border" required />
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} className="p-2 border" required />
        <select value={form.level} onChange={e=>setForm({...form, level:e.target.value})} className="p-2 border">
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <input placeholder="Duration" value={form.duration} onChange={e=>setForm({...form, duration:e.target.value})} className="p-2 border" />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} className="p-2 border col-span-1 md:col-span-2" />
        <button className="px-3 py-2 bg-green-600 text-white rounded">Create</button>
      </form>

      <div className="grid gap-3">
        {sims.map(s=> (
          <div key={s._id} className="border p-3 rounded flex justify-between">
            <div>
              <div className="font-semibold">{s.title}</div>
              <div className="text-sm">{s.category} • {s.level}</div>
            </div>
            <div>
              <button onClick={()=>remove(s._id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
