import React from 'react';
import { Helmet } from 'react-helmet-async';

import { siteConfig } from '../config/siteConfig';

const SEO = ({ title, description, image, url, type = 'website' }) => {
    // Default Values
    const siteTitle = "Printify Studio PK | Printing, Packaging & Brand Identity";
    const siteDescription = "Looking for professional printing in Pakistan? Printify Studio PK offers premium business cards, banners, packaging, wedding cards, and branding services.";
    const siteImage = "/assets/og-preview.png"; // Use relative path
    const siteUrl = "/";

    // Merged Values
    // If a title is passed, use it. Otherwise use the default site title.
    const metaTitle = title ? title : siteTitle;
    const metaDescription = description || siteDescription;

    // Handle relative or absolute paths for images
    const metaImage = image
        ? (image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? '' : '/'}${image}`)
        : siteImage;

    const metaUrl = url
        ? (url.startsWith('http') ? url : `${siteUrl}${url.startsWith('/') ? '' : '/'}${url}`)
        : siteUrl;

    // Specific specific overrides for Social Media as per requirements
    // If no specific title/desc is provided, fallback to the requested social defaults, 
    // NOT just the general default.

    const ogTitle = title || "Printify Studio PK | Premium Printing & Branding Services";
    const ogDescription = description || "From business cards to large-format signage and custom packaging — Printify Studio PK delivers professional printing solutions with quality you can trust.";

    const twitterTitle = title || "Printify Studio PK – Printing That Builds Brands";
    const twitterDescription = description || "Professional printing and branding services for businesses, events, and startups across Pakistan.";

    // Schema Markdown
    const schemaOrgJSONLD = [
        {
            '@context': 'http://schema.org',
            '@type': 'LocalBusiness',
            name: 'Printify Studio PK',
            image: siteImage,
            telephone: siteConfig.phone.primary || '',
            address: {
                '@type': 'PostalAddress',
                streetAddress: siteConfig.contact.address || '',
                addressLocality: siteConfig.contact.address || '',
                addressCountry: ''
            },
            url: siteUrl,
            description: siteDescription
        }
    ];

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content="printing services Pakistan, business cards Karachi, banner printing, custom packaging, branding agency Pakistan" />
            <link rel="canonical" href={metaUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={ogTitle} />
            <meta property="og:description" content={ogDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={metaUrl} />
            <meta name="twitter:title" content={twitterTitle} />
            <meta name="twitter:description" content={twitterDescription} />
            <meta name="twitter:image" content={metaImage} />

            {/* JSON-LD Schema */}
            <script type="application/ld+json">
                {JSON.stringify(schemaOrgJSONLD)}
            </script>
        </Helmet>
    );
};

export default SEO;
