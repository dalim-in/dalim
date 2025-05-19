"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "../../ui/button";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-3 left-3 z-50">
      <div className="mx-auto flex max-w-xl shadow-lg rounded-xl border border-border bg-background p-4 flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-muted-foreground">
         We use cookies to improve your experience. By clicking "Accept," you agree to our Privacy Policy and Terms.{" "}
          <Link href="/privacy" className="underline hover:text-primary">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="underline hover:text-primary">
            Terms of Service
          </Link>
          .
        </p>
        <Button size={"sm"} onClick={acceptCookies} className="whitespace-nowrap">
          Accept Cookies
        </Button>
      </div>
    </div>
  );
}