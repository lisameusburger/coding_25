interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="error-container">
      <div className="error-icon">😢</div>
      <h2 className="error-title">Oops! Something went wrong</h2>
      <p className="error-message">{message}</p>
      <button className="retry-button" onClick={onRetry}>
        <span className="retry-icon">🔄</span>
        Try Again
      </button>
      <p className="error-hint">💡 Tip: Make sure you entered a valid city name!</p>
    </div>
  );
};

export default ErrorMessage;

