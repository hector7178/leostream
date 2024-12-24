"use client"
import Link from 'next/link'
import React, { useState } from 'react'

function XsnavBard() {
    const [open,setOpen]=useState(true)
  return <>
 
  <section className='flex md:hidden flex-col w-fit h-fit gap-2 md:gap-6 relative z-20' >
   <button className='w-fit h-fit p-2 '  onClick={()=>setOpen(false)}>
    
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white size-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
    </svg>
    </button>
    </section>
  <ul className={`${!open?"flex ": " hidden "}  transition delay-150 duration-300 ease-in-out flex md:hidden flex-col gap-2  absolute top-0 right-0 bg-neutral-900 shadow-lg shadow-red-700 z-20 w-3/4 h-1/2 gap-10 p-6`}>
    <li className='w-full h-fit flex items-end justify-end'>
        <button className='w-fit h-fit hover:scale-105 bg-neutral-500' onClick={()=>setOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>

        </button>
    </li>
        <li className='text-white font-bold text-md hover:scale-105 cursor-pointer'><Link href={"/"}>Verificación</Link></li> 
        <li className=' text-white font-bold text-md hover:scale-105 cursor-pointer'><Link href={"/admin/dashboard"}>Dashboard</Link></li>
        <li className='text-white font-bold text-md hover:scale-105 cursor-pointer'><Link href={"/admin/accounts"}>Cuentas</Link></li>
        <li className='text-white font-bold text-md hover:scale-105 cursor-pointer'><Link href={"/auth/signin"}>Iniciar Sesión</Link></li>
    </ul>
  
  
  </>  

}

export default XsnavBard