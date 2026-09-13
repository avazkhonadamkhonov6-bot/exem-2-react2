import  { lazy } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router'
import Loyout from './Loyout/Loyout'

    const Home= lazy(()=>import('./pages/Home')) 
    const Info=lazy(()=>import('./pages/Info'))

export default function App() {

   const router = createBrowserRouter([
    {
      path:'/',
      element:<Loyout/>,
      children:[
        {index:true,element:<Home/>},
        {path:'/Info/:id',element:<Info/>},
      ]
    }
  ])
  return <RouterProvider router={router} />;
}
