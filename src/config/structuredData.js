export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PRNT",
    "url": "https://printifystudio.pk/",
    "logo": "https://printifystudio.pk/assets/brand-logo.jpg",
    "sameAs": [
      "https://instagram.com/prnt.pk",
      "https://linkedin.com/company/prnt-pk"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+92-348-1342505",
      "contactType": "customer service",
      "areaServed": "PK",
      "availableLanguage": "en"
    }
  },

  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "PRNT Studio",
    "image": "https://printifystudio.pk/assets/brand-logo.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Karachi",
      "addressCountry": "PK"
    },
    "telephone": "+92-348-1342505",
    "priceRange": "$$",
    "openingHours": "Mo-Su 09:00-22:00"
  },

  webSite: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PRNT | Premium Printing & Bespoke Design Services",
    "url": "https://printifystudio.pk/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://printifystudio.pk/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
};