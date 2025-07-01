"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

export function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
      <GoogleAnalytics gaId="G-83YKM9VSBF" />
    </>
  );
}