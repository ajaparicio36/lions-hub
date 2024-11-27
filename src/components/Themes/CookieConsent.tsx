"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const checkConsent = async () => {
      const response = await fetch("/api/cookie-consent");
      const { consent } = await response.json();
      if (consent === undefined) {
        setShowConsent(true);
      }
    };
    checkConsent();
  }, []);

  const handleConsent = async (accepted: boolean) => {
    await fetch("/api/cookie-consent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ consent: accepted ? "accepted" : "rejected" }),
    });
    setShowConsent(false);
    toast.dismiss("cookie-consent");
  };

  useEffect(() => {
    if (showConsent) {
      toast(
        <div className="flex flex-col gap-2">
          <p>
            We use cookies to enhance your experience. Do you accept these
            cookies?
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => handleConsent(false)}>
              Reject
            </Button>
            <Button onClick={() => handleConsent(true)}>Accept</Button>
          </div>
        </div>,
        {
          id: "cookie-consent",
          duration: Infinity,
        }
      );
    }
  }, [showConsent]);

  return null;
}
