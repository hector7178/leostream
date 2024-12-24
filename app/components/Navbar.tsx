
import Link from 'next/link'
import React from 'react'
import { validateRequest } from '../../lib/auth';
import Logout from './Logout';
import XsnavBard from './XsnavBard';
export const dynamic = 'force-dynamic';
async function Navbar() {
const { user } = await validateRequest();

    
  return (
    <header className=' flex flex-row justify-between items-center w-[100vw] overflow-hidden h-fit p-6 '>
        <div className='text-2xl md:text-5xl text-red-700 font-bold font-sans saturate-200'>LEOSTREAM</div>
        <ul className='hidden md:flex flex-row gap-2 md:gap-6'>
            <li className='text-white font-bold text-md hover:scale-105 cursor-pointer'><Link href={"/"}>Verificación</Link></li>
             { user?<> 
             <li className=' hidden md:flex text-white font-bold text-md hover:scale-105 cursor-pointer'><Link href={"/admin/dashboard"}>Dashboard</Link></li>
              <li className='hidden md:flex text-white font-bold text-md hover:scale-105 cursor-pointer'><Link href={"/admin/accounts"}>Cuentas</Link></li>
              <li><Logout/></li>
           </>
           :<li className='text-white font-bold text-md hover:scale-105 cursor-pointer'><Link href={"/auth/signin"}>Iniciar Sesión</Link></li>
          }
       
        </ul>
        <ul className=' flex md:hidden items-center flex-row gap-2 md:gap-6'>
        {user?<li><Logout/></li>:null}
        <li><XsnavBard/></li>
        </ul>

       
    </header>
  )
}

export default Navbar