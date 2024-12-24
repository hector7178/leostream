import React from 'react'
import Signin from './Signin'
import { validateRequest } from '../../../lib/auth';
import { redirect } from 'next/navigation';

async function Page() {
    const { user } = await validateRequest();
    if (user) {
      return redirect("/");
    }
    
  return (
    <>
    <Signin/>
    </>
  )
}

export default Page