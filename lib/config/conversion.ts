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

// TODO(launch): client portal login URL (app.growx.studio). Opens in a new tab
// from the header "Login" control. Until this is set, the Login link renders
// inert rather than pointing at a dead URL.
export const PORTAL_LOGIN_URL: string | null = null;

// TODO(launch): the HighLevel "Scale Without Hiring" webinar registration
// form/funnel URL. Registration is HighLevel-owned (tag-gated for room
// quality). Until it is set, the /webinar page's CTA falls back to the
// partnership booking call so the page never dead-ends.
export const WEBINAR_REGISTRATION_URL: string | null = null;

/** HighLevel chat widget — the floating support bubble loaded site-wide. */
export const GHL_CHAT_WIDGET = {
  loaderSrc: "https://widgets.leadconnectorhq.com/loader.js",
  resourcesUrl: "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
  widgetId: "6a5ca681c6e06ac8e8987565",
};
