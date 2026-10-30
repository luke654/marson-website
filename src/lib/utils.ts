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
    }
  } catch (e) {
    console.error("Tracking error:", e);
  }
};
