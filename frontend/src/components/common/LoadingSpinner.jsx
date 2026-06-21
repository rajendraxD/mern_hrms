const LoadingSpinner = ({ size = "md", className = "", overlay = true, children }) => {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const overlayClass = overlay
    ? "bg-white/80 dark:bg-gray-900/80"
    : "";

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 ${overlayClass} ${className}`}
    >
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600`}
      />
      {children}
    </div>
  );
};

export default LoadingSpinner;
