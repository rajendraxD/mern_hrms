import { useMediaQuery } from "@mui/material";

/**
 * Custom hook to detect current breakpoint using matchMedia (no resize listener).
 * Tailwind CSS breakpoints:
 * sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
 */
const useBreakpoint = () => {
  const isXs = useMediaQuery("(max-width: 639px)");
  const isSm = useMediaQuery("(min-width: 640px) and (max-width: 767px)");
  const isMd = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isLg = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");
  const isXl = useMediaQuery("(min-width: 1280px) and (max-width: 1535px)");
  const is2xl = useMediaQuery("(min-width: 1536px)");

  const isMobile = isXs || isSm;
  const isDesktop = isMd || isLg || isXl || is2xl;

  let breakpoint = "";
  if (isXs) breakpoint = "xs";
  else if (isSm) breakpoint = "sm";
  else if (isMd) breakpoint = "md";
  else if (isLg) breakpoint = "lg";
  else if (isXl) breakpoint = "xl";
  else if (is2xl) breakpoint = "2xl";

  return {
    breakpoint,
    windowSize: { width: undefined, height: undefined },
    isMobile,
    isDesktop,
  };
};

export default useBreakpoint;
