import {useContext} from "react";
import {AppThemeProvider} from "../providers/theme";

export function useTheme () {
  const { activeTheme, setTheme, dark, light } = useContext(AppThemeProvider)

  const theme = activeTheme === 'light' ? light : dark

  return {
    activeTheme,
    setTheme,
    theme
  }
}

export default useTheme