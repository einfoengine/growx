"use client";

import { useActionState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import {
  INITIAL_NEWSLETTER_STATE,
  subscribeToNewsletter,
} from "./actions";

type NewsletterFormProps = {
  placeholder: string;
  cta: string;
  disclaimer: string;
};

export default function NewsletterForm({
  placeholder,
  cta,
  disclaimer,
}: NewsletterFormProps) {
  const [state, formAction, pending] = useActionState(
    subscribeToNewsletter,
    INITIAL_NEWSLETTER_STATE,
  );

  if (state.status === "success") {
    return (
      <div
        id="gw-newsletter-form"
        role="status"
        className="mx-auto flex w-full max-w-md items-center gap-3 rounded-2xl border border-brand/30 bg-brand/10 px-5 py-4 text-left"
      >
        <CheckCircle2 aria-hidden="true" className="shrink-0 text-brand" size={22} />
        <p className="text-sm text-white/90">{state.message}</p>
      </div>
    );
  }

  const invalid = state.status === "error";

  return (
    <div id="gw-newsletter-form" className="mx-auto w-full max-w-md">
      <form action={formAction} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={placeholder}
          aria-invalid={invalid}
          aria-describedby={invalid ? "newsletter-error" : undefined}
          className="w-full min-w-0 flex-auto rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-base text-white placeholder:text-white/40 transition-colors focus:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text"
        />
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-black transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? (
            <>
              <Loader2 aria-hidden="true" size={16} className="animate-spin" />
              Subscribing
            </>
          ) : (
            <>
              {cta}
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </>
          )}
        </button>
      </form>

      {invalid ? (
        <p id="newsletter-error" role="alert" className="mt-3 text-xs text-red-400">
          {state.message}
        </p>
      ) : (
        <p className="mt-3 text-xs text-white/50">{disclaimer}</p>
      )}
    </div>
  );
}
