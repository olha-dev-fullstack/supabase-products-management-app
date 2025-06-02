"use client";
import GoogleSignInButton from "@/components/google-sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { signUpWithEmailAndPassword } from "../authActions";
import { redirect } from "next/navigation";

export default function Signup() {
  const handleSignUp = async (formData: FormData) => {
    try {
      await signUpWithEmailAndPassword(formData);
      toast.success(
        "Successfully signed up! Check your email for verification link"
      );
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col gap-2 min-w-64 max-w-64 mx-auto">
      <form>
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
          <Button formAction={handleSignUp}>Sign up</Button>
        </div>
      </form>
      <GoogleSignInButton />
    </div>
  );
}
