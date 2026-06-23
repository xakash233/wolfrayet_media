import { apiUrl } from "@/lib/api/config";

export async function subscribeNewsletter(
  email: string
): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch(apiUrl("/api/newsletter"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      return {
        ok: false,
        message: data.error ?? "Subscription failed. Please try again.",
      };
    }

    return { ok: true, message: "Thanks for subscribing!" };
  } catch {
    return { ok: false, message: "Network error. Please try again." };
  }
}
