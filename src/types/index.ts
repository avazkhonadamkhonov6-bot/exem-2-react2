export interface ReduxUser {
  id: number
  surename: string
  phone: number
  pazishen: string
}

export interface ZustandUser {
  id: number
  name: string
  age: number
  status: boolean
}

export type MergedUser = Partial<ReduxUser> & Partial<ZustandUser>

export interface UsersState {
  data: ReduxUser[]
}

export interface RootState {
  Users: UsersState
}

export interface AddUserProps {
  open: boolean
  setOpen: (value: boolean) => void
}

export interface EditUserProps {
  open: boolean
  setOpen: (value: boolean) => void
  name: string
  setName: (value: string) => void
  age: string
  setAge: (value: string) => void
  pz: string
  setPz: (value: string) => void
  phone: string | null
  setPhone: (value: string | null) => void
  sname: string
  setSname: (value: string) => void
  id: number | null
}

export interface InfoRowProps {
  label: string
  value: string | number | undefined
}
