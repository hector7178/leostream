"use client"
import React from 'react'

function ResCode({code,setCodigo, setLoading}:{code:string,setCodigo: React.Dispatch<React.SetStateAction<string>>,setLoading: React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <div className='w-full h-[55vh]  flex flex-col gap-6 p-8'>
        <span className='text-white text-2xl h-1/4 font-bold'>Codigo de verificación</span>

        <div className='h-3/4 w-full flex flex-col gap-6  items-center justify-center '>
            <span className='text-5xl text-red-700 py-8 p-4 bg-white rounded-lg w-full'>
            <button className="Container" dangerouslySetInnerHTML={{__html: code}}></button>
            </span>
            <button className='p-2 rounded-lg bg-neutral-200 text-neutral-900 w-fit h-fit hover:scale-105 font-bold' onClick={()=>{
                setCodigo("")
                setLoading(false)
                }}>Volver al inicio</button>
        </div>
    </div>
  )
}

export default ResCode