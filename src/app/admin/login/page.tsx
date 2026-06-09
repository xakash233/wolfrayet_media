"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="mt-6 w-full" disabled={pending}>
      {pending ? "Signing in…" : "Sign in"}
    </Button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-lg"
      >
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Wolfrayet Media content panel
        </p>
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              name="userId"
              type="text"
              required
              autoComplete="username"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
        </div>
        {state.error && (
          <p className="mt-3 text-sm text-destructive">{state.error}</p>
        )}
        <SubmitButton />
      </form>
    </div>
  );
}
