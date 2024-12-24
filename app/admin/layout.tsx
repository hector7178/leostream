import { redirect } from "next/navigation";
import { validateRequest } from "../../lib/auth";

export default async function BlogLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const { user } = await validateRequest();
    if (!user) {
      return redirect("/login");
    }
    return <>
        {children}</>
  }