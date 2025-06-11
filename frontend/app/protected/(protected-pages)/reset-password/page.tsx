"use client";
import { resetPasswordAction } from "@/app/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ResetPassword() {

  const handleResetPassword = async (formData: FormData) => {
    try {
      await resetPasswordAction(formData);
      toast.success("Password updated");
    }
    catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
      <Label htmlFor="password">New password</Label>
      <Input
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      <Label htmlFor="confirmPassword">Confirm password</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      <Button formAction={handleResetPassword}>
        Reset password
      </Button>
    </form>
  );
}