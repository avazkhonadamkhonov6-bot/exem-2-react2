import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ReduxUser } from '../types'

interface UsersSliceState {
  data: ReduxUser[]
}

const initialState: UsersSliceState = {
  data:[
    {id:1,surename:'Bilolzoda',phone:+99291882181,pazishen:'Admin'},
    {id:2,surename:'Niwonov',phone:+992918821123,pazishen:'Derektor'},
    {id:3,surename:'Ahmadov',phone:+992918821124,pazishen:'Malim'},
    {id:4,surename:'Murodov',phone:+99291882644,pazishen:'Zavuch'},
    {id:5,surename:'Adlarekzoda',phone:+99291882467,pazishen:'Zamhost'},
    {id:6,surename:'Ibragimov',phone:+99291882122,pazishen:'Dekan'},
    {id:7,surename:'Nazirov',phone:+9929188218265,pazishen:'Zamdekan'},
    {id:8,surename:'Rajabov',phone:+99291882214,pazishen:'Admin'},
    {id:9,surename:'Tolibov',phone:+9929188218235,pazishen:'Direktor'},
    {id:10,surename:'Mahmudiv',phone:+992918821235,pazishen:'Malima'},
  ]
}

export const UsersSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    deleteUser: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((e) => e.id !== action.payload);
    },
    addUser:(state, action: PayloadAction<ReduxUser>)=>{
    state.data.push(action.payload)
    },
    editUser: (state, { payload }: PayloadAction<Partial<ReduxUser> & { id: number }>) => {
      state.data = state.data.map((e) =>e.id === payload.id? { ...e, ...payload }: e)}
  }
})

export const {deleteUser,addUser,editUser} = UsersSlice.actions

export default UsersSlice.reducer
