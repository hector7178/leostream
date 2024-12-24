"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useGoogleLogin } from '@react-oauth/google'



function UserForm() {

    const {push}=useRouter()
 
    const login = useGoogleLogin({
        onSuccess:async (codeResponse) =>  {
            
      
            const fetchdata = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${codeResponse.access_token}`,
                            Accept: 'application/json'
                        }}
            )
            const datauser=await fetchdata.json()

            const newAccount = await fetch(`/api/accounts/create`, {
                method:"POST",
                body:JSON.stringify({
                    token:codeResponse?.access_token,
                    id:datauser.id,
                    email:datauser.email
                })
               }
            )
            if(newAccount.status== 200){
                push("/admin/accounts")
            }

            
        },
        onError: (error) => console.log('Login Failed:', error),
        scope:"https://www.googleapis.com/auth/gmail.readonly"     
    });


  return (
    <>
    <section  className='flex flex-col items-center w-full h-[60vh]  gap-6'>
        <span className='text-white font-bold text-xl'>Agregar cuenta</span>
        
        <button onClick={()=>login() } className='bg-neutral-200 rounded-lg p-4 w-fit h-fit font-bold text-neutral-900 hover:scale-105'>Registrar cuenta con google</button>
    </section>
    </>
    
  )
}

export default UserForm