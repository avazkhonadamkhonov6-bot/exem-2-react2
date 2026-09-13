import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
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
import { editUser } from "../store/UsersSlice"

export function EditUser(props) {
  let {open,setOpen,name,setName,age,setAge,pz,setPz,phone,setPhone,sname,setSname,id,}=props
  const { editUserz } = UsersZ((state) => state)
  const dispatch = useDispatch()

  const handelSubmit = (e) => {
    e.preventDefault()
    dispatch(editUser({id:id,surename:sname,pazishen:pz,phone:phone}))
    editUserz({id:id,name:name,age:age})    
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
              <Input id="name-1" name="name" value={name} onChange={((e)=>setName(e.target.value))} />
            </Field>
            <Field>
              <Label htmlFor="surename-1">Surname</Label>
              <Input id="surename-1" name="surename" value={sname} onChange={((e)=>setSname(e.target.value))} />
            </Field>
            <Field>
              <Label htmlFor="age-1">Age</Label>
              <Input id="age-1" name="age" type="number" value={age} onChange={((e)=>setAge(e.target.value))} />
            </Field>
            <Field>
              <Label htmlFor="phone-1">Phone</Label>
              <Input id="phone-1" name="phone" value={phone} onChange={((e)=>setPhone(e.target.value))} />
            </Field>
            <Field>
              <Label htmlFor="pazishen-1">Position</Label>
              <Input id="pazishen-1" name="pazishen" value={pz} onChange={((e)=>setPz(e.target.value))} />
            </Field>
          </FieldGroup>
          <DialogFooter>
              <Button type="button" >
                Cancel
              </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog>
  )
}