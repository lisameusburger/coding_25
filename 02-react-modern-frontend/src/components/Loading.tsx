const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <h2 className="loading-title">Fetching Weather Data...</h2>
      <p className="loading-text">✨ Please wait while we get the fabulous forecast ✨</p>
    </div>
  );
};

export default Loading;

