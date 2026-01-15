import React from 'react';
import { structuredData } from '../config/structuredData';

const StructuredData = () => {
    // Combine all structured data
    const allStructuredData = [
        structuredData.organization,
        structuredData.localBusiness,
        structuredData.webSite
    ];

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(allStructuredData)
            }}
        />
    );
};

export default StructuredData;