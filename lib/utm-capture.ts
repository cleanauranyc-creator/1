"use client"

export function captureUTMParams() {
  if (typeof window === "undefined") return {}

  const params = new URLSearchParams(window.location.search)

  return {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    utmTerm: params.get("utm_term") || undefined,
    utmContent: params.get("utm_content") || undefined,
    referrer: document.referrer || undefined,
  }
}
