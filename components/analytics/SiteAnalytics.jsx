"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ClickTracker from "./ClickTracker";

// Skip events when framed: only the CMS admin may embed the site (CSP frame-ancestors),
// so framed page views are editor previews, not visitors.
function beforeSend(event) {
  return window.self !== window.top ? null : event;
}

export default function SiteAnalytics() {
  return (
    <>
      <Analytics beforeSend={beforeSend} />
      <SpeedInsights beforeSend={beforeSend} />
      <ClickTracker />
    </>
  );
}
