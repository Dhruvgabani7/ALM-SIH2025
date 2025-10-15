import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    // You can also log error to a remote service here
    // console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-black text-white">
          <div className="max-w-3xl">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <pre className="whitespace-pre-wrap text-sm bg-gray-900 p-4 rounded-md overflow-auto" style={{maxHeight: '60vh'}}>
              {this.state.error && this.state.error.toString()}
              {this.state.info && this.state.info.componentStack}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
