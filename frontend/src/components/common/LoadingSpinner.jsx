const LoadingSpinner = ({ size = "md", className = "", overlay = true, children }) => {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const overlayClass = overlay
    ? "bg-[var(--color-background-default)]/80"
    : "";

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 ${overlayClass} ${className}`}
    >
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-(--color-divider) border-t-(--color-primary-main)`}
      />
      {children}
    </div>
  );
};

export default LoadingSpinner;
