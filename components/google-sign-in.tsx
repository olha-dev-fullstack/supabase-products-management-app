"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Icons } from "./icon";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";

const GoogleSignInButton = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const supabase = createClient();

  const searchParams = useSearchParams();

  const next = searchParams.get("next");

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback${
            next ? `?next=${encodeURIComponent(next)}` : ""
          }`,
        },
      });

      if (error) {
      toast.error(error.message);
      }
      setIsGoogleLoading(false);
    }
  
  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleSignIn}
      disabled={isGoogleLoading}
    >
      {isGoogleLoading ? (
        <Icons.loaderCircle className="mr-2 size-4 animate-spin" />
      ) : (
        <Icons.google className="mr-2 size-6" />
      )}{" "}
      Sign in with Google
    </Button>
  );
};

export default GoogleSignInButton;
