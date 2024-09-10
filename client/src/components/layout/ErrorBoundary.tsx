/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, ReactNode } from 'react';

type Error = {
  children: ReactNode;
};

const ErrorBoundary: React.FC<Error> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error: any) => {
      console.error('Uncaught error:', error);
      setHasError(true);
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div className="error-boundary">
        <h1>Oops! Something went wrong.</h1>
        <p>
          We're sorry for the inconvenience. Please try refreshing the page.
        </p>
        <button onClick={() => window.location.reload()}>Refresh Page</button>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
