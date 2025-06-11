"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { forgotPasswordAction } from "../../authActions";
import { toast } from "sonner";


export default function ForgotPassword() {

  const handleForgotPassword = async (formData: FormData) => {
    try {
      await forgotPasswordAction(formData);
      toast.success("Check your email for a link to reset your password.")
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <>
      <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
        <div>
          <h1 className="text-2xl font-medium">Reset Password</h1>
          <p className="text-sm text-secondary-foreground">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Button formAction={handleForgotPassword}>
            Reset Password
          </Button>
        </div>
      </form>
    </>
  );
}
