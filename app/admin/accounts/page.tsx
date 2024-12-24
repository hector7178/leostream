"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const getAccounts=async()=>{
  const accounts=await fetch("/api/accounts/get",{method:"GET"})
  const res = await accounts.json()
  return res.accounts
}
export default function Page() {
  const [data,setData]=useState([])

  useEffect(()=>{
    getAccounts().then((r)=>{
      setData(r)
    })
  },[])
  return (
    <section className="flex flex-col items-center relative w-[100vw]  md:w-[80vw] h-[70vh] p-10">
      <div className="bg-white opacity-30 rounded-xl w-full h-[75vh] absolute"></div>
      <div className="flex flex-row items-center justify-between w-full h-fit p-5 relative z-10">
     
        <Link href={"/admin/accounts/new"} className="text-neutral-800 bg-neutral-200 rounded-lg p-2 w-fit h-fit font-bold"> Agregar nueva cuenta</Link>
      </div>
      <div className="relative z-10 bg-gray-950 rounded-lg shadow-lg shadow-red-700 w-full p-4  h-[75vh] overflow-scroll">
       {data.map((items:{_id:string,username:string,password:string,email:string },index)=>{
        return <div key={index} className="flex flex-row gap-4 w-fit bg-neutral-200 rounded-lg p-2">
          <span className="text-lg text-gray-950 w-[300px]">{items?._id}</span>
          <span className="text-lg text-gray-950 w-[300px]">{items?.username}</span>
          <span className="text-lg text-gray-950 w-[300px]">{items?.email}</span>
          
          </div>
       })}
      </div>
      
    </section>
  );
}
