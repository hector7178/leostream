import { lucia, validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
 
export default async function Logout() {
  return (
    <form action={logout}>
      <button className='text-white font-bold text-md'>Sign out</button>
    </form>
  );
}
 
async function logout(): Promise<void> {
  'use server';
  const { session } = await validateRequest();
  if (!session) {
    return redirect("/auth/signin")
  }
 
  await lucia.invalidateSession(session.id);
 
  const sessionCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect('/');
}