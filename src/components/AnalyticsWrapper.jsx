import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import analytics from '../utils/analytics';

const AnalyticsWrapper = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        // Track page views on route changes
        analytics.trackPageView(location.pathname + location.search);
    }, [location]);

    return <>{children}</>;
};

export default AnalyticsWrapper;