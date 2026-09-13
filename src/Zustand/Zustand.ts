import { create } from 'zustand'

export const UsersZ = create((set) => ({
 dataZ:[
    {id:1,name:"Hasan",age:16,status:false},
    {id:2,name:"Husan",age:17,status:true},
    {id:3,name:"Maga",age:18,status:false},
    {id:4,name:"Ulhom",age:19,status:true},
    {id:5,name:"Murod",age:20,status:false},
    {id:6,name:"Sunnatullo",age:21,status:true},
    {id:7,name:"Bilol",age:22,status:false},
    {id:8,name:"Ahmad",age:23,status:true},
    {id:9,name:"Ibrohim",age:24,status:false},
    {id:10,name:"Abubakr",age:25,status:true},
 ],
  addUSerz: (newUser) =>set((state) => ({ dataZ: [...state.dataZ, newUser] })),
  deleteUserz: (id) =>set((state) => ({ dataZ: state.dataZ.filter((e) => e.id !== id) })),
  editUserz: (upUser) =>set((state) =>({dataZ: state.dataZ.map((e) =>e.id == upUser.id? { ...e, ...upUser }: e ),
})),

}))