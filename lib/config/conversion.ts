/** Conversion plumbing endpoints — the single place every CTA resolves from.
 *
 *  The booking calendar is the LIVE "growX Partnership Call" calendar built in
 *  the growX HighLevel sub-account (30 min, assigned to Maruf, confirmation +
 *  24h reminder emails configured at the calendar level).
 */
export const GHL_BOOKING_URL =
  "https://api.leadconnectorhq.com/widget/booking/Yaa9d7AN9spx0NeUIOxQ";

/** HighLevel's embed helper — sizes the booking/form iframe to its content. */
export const GHL_EMBED_SCRIPT = "https://link.msgsndr.com/js/form_embed.js";

// TODO(launch): portal signup URL for the paid tiers once app.growx.studio is
// live — OnboardingModal falls back to the booking call until then.
export const PORTAL_SIGNUP_URL: string | null = null;
