"use client";

import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { profile } from "@/content/profile";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-[3px] border border-line-strong bg-transparent px-3.5 py-3 text-[15px] text-fg placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none";

/** Message form that posts to Formspree, which emails each submission to me. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = String(data.get("subject") || "").trim();
    data.set("_subject", `Portfolio: ${subject || "New message"}`);
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${profile.formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex h-full flex-col justify-center rounded-[6px] border border-line bg-raised p-8">
        <span className="grid h-10 w-10 place-items-center rounded-[3px] border border-accent text-accent">
          <Check className="h-4 w-4" />
        </span>
        <p className="mt-6 font-serif text-3xl text-fg">Message sent.</p>
        <p className="mt-3 text-fg-soft">Thank you for reaching out. I will get back to you by email.</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-text label mt-6 self-start px-0">
          Send another <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[6px] border border-line bg-raised p-6 md:p-8" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="label-sm text-muted">Name</span>
          <input name="name" required autoComplete="name" placeholder="Your name" className={`${field} mt-2`} />
        </label>
        <label className="block">
          <span className="label-sm text-muted">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={`${field} mt-2`}
          />
        </label>
      </div>
      <label className="mt-5 block">
        <span className="label-sm text-muted">
          Subject <span className="normal-case tracking-normal">(optional)</span>
        </span>
        <input name="subject" placeholder="Role, project or question" className={`${field} mt-2`} />
      </label>
      <label className="mt-5 block">
        <span className="label-sm text-muted">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="What would you like to talk about?"
          className={`${field} mt-2 resize-y`}
        />
      </label>

      {/* Honeypot: hidden from people, filled in by bots, and dropped by Formspree */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <button type="submit" disabled={status === "sending"} className="btn-primary label disabled:opacity-60">
          {status === "sending" ? (
            <>
              Sending <Loader2 className="h-3.5 w-3.5 animate-spin" />
            </>
          ) : (
            <>
              Send message <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
        <p aria-live="polite" className="text-sm text-muted">
          {status === "error" ? (
            <>
              Could not send right now. Please email{" "}
              <a href={`mailto:${profile.email}`} className="link-underline text-fg">
                {profile.email}
              </a>
              .
            </>
          ) : (
            "Goes straight to my inbox."
          )}
        </p>
      </div>
    </form>
  );
}
