"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Try again.");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  };

  return (
    <section id="newsletter" className="py-20 md:py-28 bg-sand">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center reveal">
          <span className="text-xs uppercase tracking-[0.22em] text-stone">
            First in line
          </span>
          <h2 className="font-display mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            Get the drop before it&rsquo;s gone
          </h2>
          <p className="mt-4 text-lg text-stone">
            Drops sell out fast. Join the list for early access, mood guides, and
            the occasional note — never spam.
          </p>

          {status === "done" ? (
            <p className="mt-8 font-display text-xl text-ember">
              You&rsquo;re on the list. See you Sunday. ✦
            </p>
          ) : (
            <form
              onSubmit={submit}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                aria-label="Email address"
                disabled={status === "loading"}
                className="flex-1 rounded-full border border-ink/20 bg-bone px-5 py-3.5 outline-none focus:border-ink transition-colors disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-full bg-ink px-7 py-3.5 text-cream hover:bg-ember transition-colors disabled:opacity-70"
              >
                {status === "loading" ? "Joining…" : "Join"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-4 text-sm text-ember" role="alert">
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
