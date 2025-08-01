import { useContext } from "react";
import { ThemeContext } from "../ContextApi/Theme/ThemeContext";


export const useTheme = () => {
    return useContext(ThemeContext)
}