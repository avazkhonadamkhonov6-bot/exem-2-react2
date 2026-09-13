import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Field, FieldGroup } from "./ui/field"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { UsersZ } from "../Zustand/Zustand"
import { useDispatch } from "react-redux"
import { addUser } from "../store/UsersSlice"
import type { AddUserProps, ReduxUser } from "../types"
import type { AppDispatch } from "../store/store"
import type { FormEvent } from "react"

export function AddUser({ open, setOpen }: AddUserProps) {
  const { addUSerz } = UsersZ((state) => state)
  const dispatch = useDispatch<AppDispatch>()

  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const getVal = (name: string): string => {
      const el = form.elements.namedItem(name)
      if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement) return el.value
      return ''
    }
    const id = Date.now()
    const nameVal = getVal('name')
    const surenameVal = getVal('surename')
    const ageVal = getVal('age')
    const phoneVal = getVal('phone')
    const pazishenVal = getVal('pazishen')
    const statusVal = getVal('status') === "true"

    const newUser: ReduxUser = {
      id,
      surename: surenameVal,
      phone: Number(phoneVal),
      pazishen: pazishenVal,
    }
    dispatch(addUser(newUser))
    addUSerz({ id, name: nameVal, age: Number(ageVal), status: statusVal })
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
      <form onSubmit={handelSubmit}>
          <DialogHeader>
            <DialogTitle>New User</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" required />
            </Field>
            <Field>
              <Label htmlFor="surename-1">Surname</Label>
              <Input id="surename-1" name="surename" />
            </Field>
            <Field>
              <Label htmlFor="age-1">Age</Label>
              <Input id="age-1" name="age" type="number" />
            </Field>
            <Field>
              <Label htmlFor="phone-1">Phone</Label>
              <Input id="phone-1" name="phone" />
            </Field>
            <Field>
              <Label htmlFor="pazishen-1">Position</Label>
              <Input id="pazishen-1" name="pazishen" />
            </Field>
            <Field>
              <Label htmlFor="status-select">Status</Label>
              <select
                id="status-select"
                name="status"
                className="w-full p-2 border rounded-md"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </Field>
          </FieldGroup>
          <DialogFooter>
              <Button type="button" onClick={()=>setOpen(false)} >
                Cancel
              </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog>
  )
}
