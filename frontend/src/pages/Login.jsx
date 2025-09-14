import React, { useState } from 'react'
import API from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [form, setForm] = useState({ email: '', password: '' })
  const nav = useNavigate()
  const submit = async (e) => {
    e.preventDefault()
    try{
      const res = await API.post('/auth/login', form)
      localStorage.setItem('token', res.data.token)
      const payload = JSON.parse(atob(res.data.token.split('.')[1]));
      localStorage.setItem('role', payload.role)
      alert('Logged in')
      nav('/dashboard')
    } catch(err){ alert(err.response?.data?.message || 'Error') }
  }
  return (
    <form onSubmit={submit} className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <input required placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full p-2 border mb-2" />
      <input required type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} className="w-full p-2 border mb-2" />
      <button className="px-4 py-2 bg-indigo-600 text-white rounded">Login</button>
    </form>
  )
}
