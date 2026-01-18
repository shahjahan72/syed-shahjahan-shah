import React from 'react';
import { AlertTriangle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught an error:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gray-50 text-gray-900 font-sans">
                    <div className="bg-white border border-gray-100 p-10 rounded-3xl soft-shadow max-w-lg w-full">
                        <div className="flex justify-center mb-6">
                            <AlertTriangle size={64} className="text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
                        <p className="text-white/60 mb-8">
                            We encountered an unexpected error. Please try reloading the page.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 bg-white text-black rounded-lg font-bold hover:bg-white/90 transition-colors"
                            >
                                Reload Page
                            </button>
                            <Link
                                to="/"
                                className="px-6 py-2 bg-white/10 text-white rounded-lg font-bold hover:bg-white/20 transition-colors flex items-center gap-2"
                                onClick={() => this.setState({ hasError: false })}
                            >
                                <Home size={18} /> Home
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
