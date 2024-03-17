import React from "react";

interface IErrorPageProps {
  error: any;
  errorInfo: React.ErrorInfo | null;
  moduleName?: string;
}

const ErrorPage: React.FC<IErrorPageProps> = ({
  error,
  errorInfo,
  moduleName
}) => {
  const customErrorEvent = new CustomEvent("customerror", {
    detail: {
      error,
      errorInfo,
      moduleName
    }
  });
  document.dispatchEvent(customErrorEvent);

  return null;
};

export default ErrorPage;
