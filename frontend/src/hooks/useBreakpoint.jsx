import { useState, useEffect } from "react";
// import useMediaQuery from "@mui/material/useMediaQuery";

// const useBreakpoint = () => {
//   // React Hooks must be called at the top level
//   const isMobile = useMediaQuery("(max-width:600px)");
//   const isTablet = useMediaQuery("(min-width:601px) and (max-width:900px)");
//   const isDesktop = useMediaQuery("(min-width:901px)");

//   return { isMobile, isTablet, isDesktop };
// };

// export default useBreakpoint;



/**
 * Custom hook to detect current breakpoint
 * Tailwind CSS breakpoints:
 * sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
 */
const useBreakpoint = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : undefined,
    height: typeof window !== "undefined" ? window.innerHeight : undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute breakpoint from windowSize (no setState in effect)
  const getBreakpoint = (width) => {
    if (!width) return "";
    if (width < 640) return "xs";
    if (width >= 640 && width < 768) return "sm";
    if (width >= 768 && width < 1024) return "md";
    if (width >= 1024 && width < 1280) return "lg";
    if (width >= 1280 && width < 1536) return "xl";
    return "2xl";
  };

  const breakpoint = getBreakpoint(windowSize.width);

  return {
    breakpoint,
    windowSize,
    isMobile: breakpoint === "xs" || breakpoint === "sm",
    // isTablet: breakpoint === "md",
    isDesktop:
      breakpoint === "md" ||
      breakpoint === "lg" ||
      breakpoint === "xl" ||
      breakpoint === "2xl",
  };
};

export default useBreakpoint;
