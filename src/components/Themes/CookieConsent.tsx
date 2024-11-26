"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookie-consent");
    if (consent === undefined) {
      setShowConsent(true);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    Cookies.set("cookie-consent", accepted ? "accepted" : "rejected", {
      expires: 365,
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
