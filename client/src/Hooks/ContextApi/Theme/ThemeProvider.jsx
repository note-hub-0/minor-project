import { useEffect, useState } from "react"
import { ThemeContext } from "./ThemeContext"


const ThemeProvider = ({children}) => {
    const [theme ,setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light"
    })

    useEffect(() => {
        document.body.className = ""
        document.body.classList.add(`bg-${theme}`, `text-${theme === "dark" ? "light" : "dark"}`)
        localStorage.setItem("theme",theme)
    },[theme])
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"))
    }

    return(
        <ThemeContext.Provider value={{theme ,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeProvider}