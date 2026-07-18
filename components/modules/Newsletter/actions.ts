"use server";

export type NewsletterState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const INITIAL_NEWSLETTER_STATE: NewsletterState = {
  status: "idle",
  message: "",
};

// Deliberately loose — good enough to catch typos without rejecting valid
// addresses. Real validation happens when the ESP confirms the opt-in.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Server Action bound to the newsletter form via `useActionState`. Validates the
 * submitted email and returns the next form state. It runs on the server and is
 * progressively enhanced, so the form works even before JS hydrates.
 *
 * There's no mailing provider wired up yet, so this validates the address and
 * then tells the user, honestly, that signup isn't live — it never claims to
 * have stored or sent anything. See the TODO below to go live.
 */
export async function subscribeToNewsletter(
  _prevState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { status: "error", message: "Enter your email to subscribe." };
  }

  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "That doesn't look like a valid email." };
  }

  // TODO: Wire the ESP (Resend Audiences, ConvertKit, Mailchimp, …) here, then
  // replace the `return` below with the real result:
  //
  //   try {
  //     await addSubscriber(email);
  //   } catch {
  //     return { status: "error", message: "Something went wrong. Please try again in a moment." };
  //   }
  //   return { status: "success", message: "You're in — check your inbox to confirm your subscription." };
  //
  // Until that exists, nothing is stored and no email is sent — so don't claim
  // otherwise. `status: "success"` stays in NewsletterState for the wiring above.
  return {
    status: "error",
    message:
      "Newsletter signup isn't live yet. Email hi@growx.studio and we'll add you to the list.",
  };
}
