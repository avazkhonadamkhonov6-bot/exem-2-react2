import { useSelector } from 'react-redux'
import { UsersZ } from '../Zustand/Zustand'
import { Button } from '../components/ui/button'
import { useNavigate, useParams } from 'react-router'
import { useState } from 'react'

export default function Info() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [datag,setData]=useState([])
  const data = useSelector((state) => state.Users.data)
  const { dataZ } = UsersZ((state) => state)

  const userRedux = data.find((e) => e.id === Number(id))
  const userZ = dataZ.find((e) => e.id === Number(id))
  const user = { ...userZ, ...userRedux }

  if (!userRedux && !userZ) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">?</p>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">User Not Found</h1>
          <p className="text-sm text-slate-500 mb-6">This user does not exist or has been deleted.</p>
          <Button onClick={() => navigate('/')} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 py-2.5">
            ← Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-lg mx-auto">

        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="mb-6 rounded-xl text-sm font-semibold"
        >
          ← Back
        </Button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

          <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 px-8 pt-10 pb-16 text-center relative">
            <div className="w-20 h-20 rounded-full bg-white text-indigo-600 flex items-center justify-center font-extrabold text-3xl mx-auto shadow-lg ring-4 ring-white/30">
              {user.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-4">
              {user.name} {user.surename}
            </h1>
            <p className="text-indigo-200 text-sm mt-1">{user.pazishen || 'No Position'}</p>
          </div>

          <div className="px-8 -mt-8">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
              user.status
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-slate-100 text-slate-500 border border-slate-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${user.status ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
              {user.status ? 'Active' : 'Inactive'}
            </div>
          </div>

          <div className="px-8 py-6 space-y-4">
            <InfoRow label="Full Name" value={`${user.name || '—'} ${user.surename || ''}`} />
            <InfoRow label="Age" value={user.age || 'N/A'} />
            <InfoRow label="Phone" value={user.phone || 'N/A'} />
            <InfoRow label="Position" value={user.pazishen || 'N/A'} />
            <InfoRow label="User ID" value={user.id} />
          </div>

        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
      <span className="text-sm text-slate-400 font-medium">{label}</span>
      <span className="text-sm font-semibold text-slate-800">{value}</span>
    </div>
  )
}
