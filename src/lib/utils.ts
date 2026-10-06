import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  try {
    if (typeof window !== 'undefined') {
      // Google Analytics 4
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', eventName, eventParams);
      }
      // Google Tag Manager
      if (Array.isArray((window as any).dataLayer)) {
        (window as any).dataLayer.push({ event: eventName, ...eventParams });
      }
      // Meta Pixel
      if (typeof (window as any).fbq === 'function') {
        (window as any).fbq('trackCustom', eventName, eventParams);
      }
      
      // Removed CRM Tracking for clicks to prevent workflow interference

      console.log(`[Tracking] ${eventName}`, eventParams);
    }
  } catch (e) {
    console.error("Tracking error:", e);
  }
};

export const trackPageView = () => {
  try {
    if (typeof window !== 'undefined') {
      // Push to GTM
      if (Array.isArray((window as any).dataLayer)) {
        (window as any).dataLayer.push({ 
          event: 'page_view', 
          page_path: window.location.pathname,
          page_title: document.title
        });
      }

      const trackingPayload = {
        type: "page_view",
        timestamp: Date.now(),
        url: window.location.href,
        title: document.title,
        path: window.location.pathname,
        userAgent: navigator.userAgent,
        trackingId: "tk_8aa01e08f6644e53b972b2160c5d9120",
        locationId: "ex5ANvHlbpBQcbqlNsx5",
        sessionId: crypto.randomUUID(),
        properties: {
          deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "desktop",
        },
      };

      fetch("https://backend.leadconnectorhq.com/external-tracking/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          version: "2021-07-28",
        },
        body: JSON.stringify(trackingPayload),
        keepalive: true
      }).catch(() => {});
    }
  } catch (e) {
    console.error("Tracking error:", e);
  }
};
