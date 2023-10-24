/* eslint-disable react/prop-types */

const ErrorHandler = ({ setError }) => {
  // Render the error message or a custom error component
  const resetHandler = () => {
    setError(null);
    window.location.reload();
  };
  return (
    <div className="error_message">
      <h2>Oops! Something went wrong.</h2>
      <button onClick={resetHandler}>Try Agian</button>
    </div>
  );
};

export default ErrorHandler;
