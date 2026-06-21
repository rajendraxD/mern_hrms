import { useSelector } from "react-redux";

const useResolvedTheme = () => {
  const { themeMode, osPrefersDark } = useSelector((state) => state.theme);

  if (themeMode === "system") {
    return osPrefersDark ? "dark" : "light";
  }
  // Ensure only valid MUI palette modes are returned
  if (themeMode === "light" || themeMode === "dark") {
    return themeMode;
  }
  return "light";
};

export default useResolvedTheme;
