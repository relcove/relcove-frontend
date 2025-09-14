import React from 'react';
import ServerErrorPage from './ServerErrorPage';

class ServerErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasServerError: false, 
      serverError: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Only catch server errors, let other errors bubble up
    if (ServerErrorBoundary.isServerError(error)) {
      return { 
        hasServerError: true, 
        serverError: error,
        errorInfo: error.stack 
      };
    }
    return null; // Let the error bubble up to parent error boundaries
  }

  componentDidCatch(error, errorInfo) {
    // Only log server errors here
    if (ServerErrorBoundary.isServerError(error)) {
      console.error('Server Error Boundary caught a server error:', error, errorInfo);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Clear error state when props change (e.g., when navigating to a different page)
    if (prevProps.location?.pathname !== this.props.location?.pathname) {
      this.setState({ hasServerError: false, serverError: null, errorInfo: null });
    }
  }

  static isServerError(error) {
    if (!error) return false;
    
    // Check if error has a response with status
    if (error.response && error.response.status) {
      return error.response.status >= 500 && error.response.status < 600;
    }
    
    // Check if error has a status property
    if (error.status) {
      return error.status >= 500 && error.status < 600;
    }
    
    // Check if error message contains server error indicators
    if (error.message) {
      const serverErrorKeywords = [
        'internal server error',
        'server error',
        '500',
        '502',
        '503',
        '504',
        'gateway timeout',
        'bad gateway',
        'service unavailable'
      ];
      
      return serverErrorKeywords.some(keyword => 
        error.message.toLowerCase().includes(keyword)
      );
    }
    
    return false;
  }

  handleRetry = () => {
    this.setState({ hasServerError: false, serverError: null, errorInfo: null });
  };

  render() {
    if (this.state.hasServerError) {
      return (
        <ServerErrorPage 
          error={this.state.serverError}
          onRetry={this.handleRetry}
          title="Server Error"
          subtitle="We're experiencing server issues. Please try again in a few moments."
        />
      );
    }

    return this.props.children;
  }
}

export default ServerErrorBoundary; 