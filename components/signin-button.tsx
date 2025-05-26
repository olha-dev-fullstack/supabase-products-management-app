"use client"
 
import Link from "next/link"
import { usePathname } from "next/navigation"
 
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icon"
 
export function SignInButton() {
  const pathname = usePathname()
 
  return pathname !== "/sign-in" ? (
    <Link
      href="/sign-in"
      className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
    >
      <Icons.logIn className="mr-2 size-3.5" />
      Sign in
    </Link>
  ) : null
}