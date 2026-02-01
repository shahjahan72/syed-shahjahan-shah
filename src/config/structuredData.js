export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PRNT",
    "url": "/",
    "logo": "/assets/brand-logo.jpg",
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "",
      "contactType": "customer service",
      "areaServed": "",
      "availableLanguage": "en"
    }
  },

  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "PRNT Studio",
    "image": "/assets/brand-logo.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "",
      "addressCountry": ""
    },
    "telephone": "",
    "priceRange": "",
    "openingHours": ""
  },

  webSite: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PRNT | Premium Printing & Bespoke Design Services",
    "url": "/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
};