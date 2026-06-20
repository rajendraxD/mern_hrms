import { Component } from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
          role="alert"
        >
          <div className="max-w-md w-full text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <FiAlertTriangle className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-500 mb-6">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            {import.meta.env.VITE_NODE_ENV === "development" && this.state.error && (
              <div className="mb-6 p-4 bg-red-50 rounded-xl text-left border border-red-200">
                <details className="group">
                  <summary className="cursor-pointer text-sm font-semibold text-red-700 mb-2 hover:text-red-800">
                    Error details
                  </summary>
                  <p className="text-sm font-mono text-red-700 break-all mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.error.stack && (
                    <pre className="text-xs font-mono text-red-600 whitespace-pre-wrap break-all bg-red-100/50 rounded-lg p-3 max-h-48 overflow-y-auto">
                      {this.state.error.stack}
                    </pre>
                  )}
                </details>
              </div>
            )}
            <div className="flex items-center justify-center space-x-4">
              <button onClick={this.handleReset} className="btn-secondary">
                Try Again
              </button>
              <button
                onClick={this.handleReload}
                className="btn-primary inline-flex items-center"
              >
                <FiRefreshCw className="h-4 w-4 mr-2" />
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
