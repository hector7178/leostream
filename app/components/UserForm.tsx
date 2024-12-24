"use client"
import React, { useState } from 'react'
import ResCode from './ResCode'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import toast from 'react-hot-toast'

type FormValues = {
    username?: string
    email: string
}
function UserForm() {
    const [loading,setLoading]=useState(false)
    const [codigo,setCodigo]=useState<string>("")
    const schema = yup.object({
         username: yup.string(),
        email: yup.string().min(7, 'min 7 caracteres').required('Correo es requerido'),
       
      })
    const { register, handleSubmit, formState:{errors}} = useForm<FormValues>({
        resolver: yupResolver(schema), 
    })
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true)
               
                const fecthuser= await fetch("/api/query",{method:"POST", body:JSON.stringify({
                email: data.email
               })})
               const res= await fecthuser.json()
        
               if(fecthuser.status == 200){
              
                    const text= res.data.split("<a").find((e:string)=>e.includes("href")).split("</a>").find((e:string)=>e.includes("href"))
                    setCodigo("<a"+text+"</a>")
                    console.log(text)
                    toast.success("Codigo recibido")
            
               }else{
                toast.error(res.response)
                setLoading(false)
               }
     
    }
    



  return (
    <>
    {!loading?
    
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-full h-[60vh]  gap-6'>
        <span className='text-white font-bold text-xl'>Consulta tu cuenta</span>
        
        <div className='h-fit w-full flex flex-col'>
            <label className='text-lg text-white font-bold'>Correo <span className='text-sm text-red-500'>{errors.email?.message}</span></label>
            <input {...register("email")} className='rounded-lg text-lg w-full h-[40px]'/>
        </div>
        
        <button disabled={loading} type='submit' className='p-2 bg-neutral-200 rounded-lg w-fit h-fit font-bold hover:scale-105'>Consultar</button>
    </form>
    :codigo !== ""?
        <ResCode code={codigo} setCodigo={setCodigo}  setLoading={setLoading}/>
    :
    <div className=' w-full h-[60vh] flex flex-col items-center justify-center'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12 animate-spin text-red-700 ">
            <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
        </svg>
    </div>
    }
    </>
    
  )
}

export default UserForm