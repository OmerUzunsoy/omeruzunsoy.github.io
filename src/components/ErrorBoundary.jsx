import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-900 text-white p-8 font-mono">
                    <h1 className="text-3xl text-red-500 mb-4">Something went wrong.</h1>
                    <div className="bg-slate-800 p-4 rounded-lg overflow-auto mb-4 border border-slate-700">
                        <h2 className="text-xl text-blue-400 mb-2">Error:</h2>
                        <pre className="whitespace-pre-wrap text-red-300">
                            {this.state.error && this.state.error.toString()}
                        </pre>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg overflow-auto border border-slate-700">
                        <h2 className="text-xl text-blue-400 mb-2">Component Stack:</h2>
                        <pre className="whitespace-pre-wrap text-slate-400 text-sm">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
