"use client";

import GoogleSignInButton from "@/components/google-sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signInWithEmailAndPassword } from "../../authActions";

export default function SignInPage() {
  const router = useRouter();
  const handleSignIn = async (formData: FormData) => {
    try {
      await signInWithEmailAndPassword(formData);
      router.push("/protected/team");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex-1 flex flex-col min-w-64 gap-2">
      <form>
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-foreground">
          Don&apos;t have an account?{" "}
          <Link
            className="text-foreground font-medium underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <Button formAction={handleSignIn}>Sign in</Button>
        </div>
      </form>
      <GoogleSignInButton />
    </div>
  );
}
