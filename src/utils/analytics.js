// Analytics utility for tracking user interactions
class Analytics {
    constructor() {
        this.isEnabled = import.meta.env.PROD;
        this.init();
    }

    init() {
        // Initialize analytics (you can integrate with Google Analytics, Plausible, etc.)
        if (this.isEnabled) {
            console.log('Analytics initialized');
        }
    }

    trackEvent(category, action, label, value) {
        if (!this.isEnabled) return;

        // Example Google Analytics 4 event tracking
        if (typeof window.gtag !== 'undefined') {
            window.gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value
            });
        }

        // Console logging for development
        console.log('Analytics Event:', { category, action, label, value });
    }

    trackPageView(path) {
        if (!this.isEnabled) return;

        // Example Google Analytics page view
        if (typeof window.gtag !== 'undefined') {
            window.gtag('config', 'GA_MEASUREMENT_ID', {
                page_path: path
            });
        }

        console.log('Page View:', path);
    }

    trackEcommerce(action, params) {
        if (!this.isEnabled) return;

        // E-commerce tracking
        if (typeof window.gtag !== 'undefined') {
            window.gtag('event', action, {
                currency: 'PKR',
                ...params
            });
        }

        console.log('E-commerce Event:', { action, params });
    }
}

// Create singleton instance
const analytics = new Analytics();

// Export for use in components
export default analytics;

// Hook for easy React integration
export const useAnalytics = () => {
    return {
        trackEvent: analytics.trackEvent.bind(analytics),
        trackPageView: analytics.trackPageView.bind(analytics),
        trackEcommerce: analytics.trackEcommerce.bind(analytics)
    };
};