"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-[8px] border border-[rgb(255_255_255_/_0.16)] bg-[rgb(255_255_255_/_0.07)] px-3.5 py-2.5 text-sm font-light text-[var(--paper-bright)] outline-none transition duration-300 placeholder:text-[rgb(255_255_255_/_0.42)] hover:border-[rgb(255_255_255_/_0.26)] focus:border-[rgb(223_238_255_/_0.6)] focus:bg-[rgb(255_255_255_/_0.11)]";

const labelClass =
  "mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.08em] text-[rgb(255_255_255_/_0.62)]";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      });

      const result: { ok?: boolean; error?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error ?? "Could not send that message.");
      }

      form.reset();
      setStatus("sent");
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not send that message.",
      );
    }
  }

  return (
    <form
      className="rounded-[10px] border border-[rgb(255_255_255_/_0.14)] bg-[rgb(255_255_255_/_0.05)] p-5 backdrop-blur-sm sm:p-6"
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="text-sm font-medium text-[var(--paper-bright)]">
        Send a message
      </p>
      <p className="mt-1.5 text-xs font-light leading-5 text-[rgb(255_255_255_/_0.62)]">
        Tell me what you are working on and I will reply from my own inbox.
      </p>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input
          autoComplete="off"
          id="contact-company"
          name="company"
          tabIndex={-1}
          type="text"
        />
      </div>

      <div className="mt-5 grid gap-3.5">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="contact-name">
              Name
            </label>
            <input
              autoComplete="name"
              className={fieldClass}
              id="contact-name"
              maxLength={120}
              name="name"
              placeholder="Your name"
              required
              type="text"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="contact-email">
              Email
            </label>
            <input
              autoComplete="email"
              className={fieldClass}
              id="contact-email"
              maxLength={200}
              name="email"
              placeholder="you@company.com"
              required
              type="email"
            />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="contact-message">
            Message
          </label>
          <textarea
            className={`${fieldClass} min-h-[6.5rem] resize-y leading-6`}
            id="contact-message"
            maxLength={4000}
            name="message"
            placeholder="What are you trying to make sense of?"
            required
            rows={4}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          className="group inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[var(--paper-bright)] px-4 text-sm font-medium text-[var(--navy)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--note-blue)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--note-blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--navy)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          disabled={status === "sending"}
          type="submit"
        >
          {status === "sending" ? (
            <>
              <LoaderCircle
                aria-hidden="true"
                className="h-4 w-4 animate-spin"
                strokeWidth={2.35}
              />
              Sending
            </>
          ) : status === "sent" ? (
            <>
              <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.35} />
              Sent
            </>
          ) : (
            <>
              Send message
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2.35}
              />
            </>
          )}
        </button>

        <p aria-live="polite" className="text-xs font-light leading-5">
          {status === "sent" ? (
            <span className="text-[var(--note-mint)]">
              Thanks — I&rsquo;ll get back to you.
            </span>
          ) : status === "error" ? (
            <span className="text-[var(--note-pink)]">{error}</span>
          ) : null}
        </p>
      </div>
    </form>
  );
}
