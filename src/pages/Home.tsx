import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UsersZ } from '../Zustand/Zustand'
import { Button } from '../components/ui/button'
import { deleteUser } from '../store/UsersSlice'
import { AddUser } from '../components/AddUser'
import { EditUser } from '../components/EditUser'
import { NavLink } from 'react-router'
import type { RootState, AppDispatch } from '../store/store'
import type { MergedUser } from '../types'

export default function Homee() {
  const data = useSelector((state: RootState) => state.Users.data)
  const { dataZ, deleteUserz } = UsersZ((state) => state)
  const dispatch = useDispatch<AppDispatch>()
  const [open, setOpen] = useState(false)
  const [openE, setOpenE] = useState(false)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [pz, setPz] = useState('')
  const [phone, setPhone] = useState<string | null>(null)
  const [sname, setSname] = useState('')
  const [idx, setIdx] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const dataM: MergedUser[] = data.map((e) => {
    const elr = dataZ.find((el) => el.id === e.id)
    return {
      ...elr,
      ...e,
    }
  })
  const handelDelete = (id: number) => {
    dispatch(deleteUser(id))
    deleteUserz(id)
  }
  const handelEdit = (e: MergedUser) => {
    setName(e.name ?? '')
    setAge(e.age?.toString() ?? '')
    setSname(e.surename ?? '')
    setPhone(e.phone?.toString() ?? null)
    setPz(e.pazishen ?? '')
    setIdx(e.id ?? null)
    setOpenE(true)
  }
  const filteredData = dataM.filter((user) =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.surename?.toLowerCase().includes(searchQuery.toLowerCase())
  )
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            User Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Total users: <span className="font-semibold text-slate-700">{dataM.length}</span>
          </p>
        </div>
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />

        <Button 
          onClick={() => setOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all rounded-xl px-5 py-2.5"
        >
          + Add User
        </Button>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((e) => (
          <div 
            key={e.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 p-6 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
                  {e.name ? e.name[0].toUpperCase() : 'U'}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800 leading-snug">
                    {e.name} {e.surename}
                  </h2>
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    {e.pazishen || 'No Position'}
                  </span>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                e.status 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${e.status ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                {e.status ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="space-y-2 my-4 text-sm text-slate-600 border-t border-b border-slate-50 py-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Age:</span>
                <span className="font-medium text-slate-700">{e.age || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="font-medium text-slate-700">{e.phone || 'N/A'}</span>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-2 pt-2">
              <Button onClick={() => handelEdit(e)} variant="outline"
                className="text-slate-600 border-slate-200 hover:bg-slate-50 rounded-lg px-3 py-1.5 text-xs font-semibold"
              >Edit</Button>
              <Button onClick={() => handelDelete(e.id!)}
                className="bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 border border-rose-100 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-none"
              >Delete</Button>
              <Button className="text-white bg-blue-500" ><NavLink to={`/Info/${e.id}`}>Info</NavLink></Button>
            </div>
          </div>
        ))}
      </div>
      <AddUser open={open} setOpen={setOpen} />
      <EditUser 
        name={name}
        setName={setName}
        open={openE}
        setOpen={setOpenE}
        setAge={setAge}
        age={age}
        pz={pz}
        setPz={setPz}
        phone={phone}
        setPhone={setPhone}
        sname={sname}
        setSname={setSname}
        id={idx}
      />
    </div>
  )
}
