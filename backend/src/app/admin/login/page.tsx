"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Lock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      className="mt-6 w-full shadow-lg shadow-primary/25"
      disabled={pending}
    >
      {pending ? "Signing in…" : "Sign in to Admin"}
    </Button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div
        className="pointer-events-none absolute inset-0 bg-[hsl(var(--admin-sidebar))]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(199 89% 48% / 0.35), transparent 60%)",
        }}
        aria-hidden
      />

      <form
        action={formAction}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-card p-8 shadow-2xl sm:p-10"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Shield className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Wolfrayet Admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage content, media, and enquiries
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              name="userId"
              type="text"
              required
              autoComplete="username"
              autoFocus
              placeholder="admin"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        {state.error && (
          <p className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.error}
          </p>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}
