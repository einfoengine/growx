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
 * There's no mailing provider wired up yet — swap the marked block for a call to
 * your ESP (Resend Audiences, ConvertKit, Mailchimp, …) to go live.
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

  try {
    // --- Wire your email provider here -----------------------------------
    // await addSubscriber(email);
    // ---------------------------------------------------------------------
  } catch {
    return {
      status: "error",
      message: "Something went wrong. Please try again in a moment.",
    };
  }

  return {
    status: "success",
    message: "You're in — check your inbox to confirm your subscription.",
  };
}
