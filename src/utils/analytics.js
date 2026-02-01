// Analytics utility for tracking user interactions
class Analytics {
    constructor() {
        this.isEnabled = import.meta.env.PROD;
        this.init();
    }

    init() {
        // Initialize analytics (you can integrate with Google Analytics, Plausible, etc.)
        // Analytics initialized (no client-side console logs in production)
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

        // Event tracked (no console output)
    }

    trackPageView(path) {
        if (!this.isEnabled) return;

        // Example Google Analytics page view
        if (typeof window.gtag !== 'undefined') {
            window.gtag('config', 'GA_MEASUREMENT_ID', {
                page_path: path
            });
        }

        // Page view tracked (no console output)
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

        // E-commerce event tracked (no console output)
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