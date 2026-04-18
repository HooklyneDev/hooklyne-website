"use client";
import { useEffect, useState } from "react";

export const CookieBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem("hooklyne_cookies");
    if (!choice) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("hooklyne_cookies", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("hooklyne_cookies", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div
        className="mx-auto max-w-3xl rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
        style={{ background: "var(--hooklyne-navy)", boxShadow: "var(--shadow-lg)" }}
      >
        <p className="text-sm text-white/70 leading-relaxed flex-1">
          We use functional cookies to keep the site working. No tracking or advertising without your consent.{" "}
          <a href="/cookies" className="text-white underline underline-offset-2 hover:opacity-80 transition-opacity">
            Cookie policy
          </a>
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="text-sm text-white/60 hover:text-white transition-colors px-3 py-1.5"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-sm font-semibold bg-white text-[var(--hooklyne-navy)] rounded-lg px-4 py-1.5 hover:opacity-90 transition-opacity"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
