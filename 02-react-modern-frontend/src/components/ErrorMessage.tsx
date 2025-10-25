interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  // Determine error type for better hints
  const getHint = () => {
    if (message.includes('not found') || message.includes('🌍')) {
      return '💡 Tip: Try using the English name of the city (e.g., "Munich" instead of "München")';
    }
    if (message.includes('Network') || message.includes('📡') || message.includes('timeout') || message.includes('⏱️')) {
      return '💡 Tip: Check your internet connection and make sure you\'re online';
    }
    if (message.includes('API key') || message.includes('🔑') || message.includes('🔐')) {
      return '💡 Tip: Make sure you\'ve set up your .env file with a valid API key';
    }
    if (message.includes('Too many') || message.includes('⏱️')) {
      return '💡 Tip: Wait a few seconds before trying again';
    }
    return '💡 Tip: Try searching for a different city or check your spelling';
  };

  const getIcon = () => {
    if (message.includes('not found') || message.includes('🌍')) return '🔍';
    if (message.includes('Network') || message.includes('📡')) return '📡';
    if (message.includes('timeout') || message.includes('⏱️')) return '⏱️';
    if (message.includes('API') || message.includes('🔑')) return '🔑';
    return '😢';
  };

  return (
    <div className="error-container">
      <div className="error-icon">{getIcon()}</div>
      <h2 className="error-title">Oops! Something went wrong</h2>
      <p className="error-message">{message}</p>
      <button className="retry-button" onClick={onRetry}>
        <span className="retry-icon">🔄</span>
        Try Again
      </button>
      <p className="error-hint">{getHint()}</p>
    </div>
  );
};

export default ErrorMessage;

