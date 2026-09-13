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

export function AddUser({ open, setOpen }) {
  const { addUSerz } = UsersZ((state) => state)
  const dispatch = useDispatch()

  const handelSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      id: Date.now(),
      name: e.target.name.value,
      pazishen: e.target.pazishen.value,
      surename: e.target.surename.value,
      age: e.target.age.value,
      phone: e.target.phone.value,
      status: e.target.status.value === "true", 
    }
    dispatch(addUser(newUser))
    addUSerz(newUser)    
    e.target.reset()
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