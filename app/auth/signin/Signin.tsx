"use client"
import React from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type FormValues = {
  username: string
  password: string
}

function Signin() {
  const router = useRouter()


    const schema = yup.object({
          password: yup.string().min(7, 'min 7 caracteres').max(12, 'max 12 caracteres').required('Contraseña es requerida'),
          username: yup.string().min(7, 'min  caracteres').max(30, 'max 30 caracteres').required('Usuario es requerido'),
           
        })
      const { register, handleSubmit, formState:{errors}} = useForm<FormValues>({
          resolver: yupResolver(schema), 
      })
      const onSubmit: SubmitHandler<FormValues> =async (data) => {
        
        const register=await fetch("/api/auth/signin",{method:"POST",body:JSON.stringify({
            username:data.username,
            password:data.password
        })})
        if(register.status==200){
            toast.success("registrado correctamente")
            router.push("/admin/accounts")
        }else{
             toast.error("no iniciado")
        }
       
      }
  
  
  return (
    <div className='flex w-full h-full items-center justify-center'>
      <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-4  items-center p-10 rounded-lg bg-gray-950 w-3/4 h-3/4 max-h-[450px] max-w-[600px] shadow-red-800 shadow-lg'>
        <span className='text-3xl font-bold text-white h-fit'>Iniciar sesión</span>
        
        <div className='flex flex-col  w-full h-3/4 gap-6'>
          <div className='w-full h-fit flex flex-col gap-2'>
            <label className='text-white text-md font-bold'>Usuario<span>{errors?.username?.message}</span></label>
            <input {...register("username")} type=' w-full  p-2 text-lg  rounded-lg' style={{height:"45px", borderRadius:"10px"}} />
          </div>
          <div className='w-full h-fit flex flex-col gap-2'>
            <label className='text-white text-md font-bold'>Contraseña<span>{errors?.password?.message}</span></label>
            <input {...register("password")} type=' w-full text-lg  rounded-lg ' style={{height:"45px", borderRadius:"10px"}} />
          </div>

        </div>
        <button className='bg-gray-800 rounded-lg w-fit h-fit p-2 hover:scale-105 text-white font-bold'>Iniciar sesión</button>
          
      </form>

    </div>
  )
}

export default Signin