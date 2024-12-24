

import { NextResponse } from "next/server";
import { lucia, validateRequest } from "../../../../lib/auth";
import { cookies } from "next/headers";

export async function GET() {

const { session } = await validateRequest();
if (!session) {
  return {
    error: 'Unauthorized',
  };
}

await lucia.invalidateSession(session.id);

const sessionCookie = lucia.createBlankSessionCookie();
(await cookies()).set(
  sessionCookie.name,
  sessionCookie.value,
  sessionCookie.attributes
);

return NextResponse.json({response:"sesion cerrada"},{status:200})
}
