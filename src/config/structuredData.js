export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Printify Studio PK",
    "url": "https://printifystudio.pk/",
    "logo": "https://printifystudio.pk/assets/profile.jpg",
    "sameAs": [
      "https://instagram.com/syedshahjahan",
      "https://linkedin.com/in/syedshahjahan"
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
    "name": "Printify Studio PK",
    "image": "https://printifystudio.pk/assets/profile.jpg",
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
    "name": "Syed Shahjahan Shah | Creative Developer & Printing Services",
    "url": "https://printifystudio.pk/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://printifystudio.pk/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
};