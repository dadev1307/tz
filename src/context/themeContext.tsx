import {createContext, useContext, useMemo, useState} from "react";

enum Colors {
    BLUE = 'blue',
    GREEN = 'green',
    RED = 'red',
    ORANGE = 'orange',
    PURPLE = 'purple'
}

enum Themes {
    BLACK= 'black',
    WHITE = 'white'
}

type State = {theme: Themes, color: Colors, setTheme: React.Dispatch<any>};
type ThemeProviderProps = {children: React.ReactNode};

const ThemeContext = createContext<State | undefined>(undefined);


function useTheme() {
    const context = useContext(ThemeContext);
    if(!context) {
        throw new Error('useTheme must be used within a ThemeProvide');
    }
    return context;
}

function ThemeProvider({children}: ThemeProviderProps) {
    const [theme, setTheme] = useState<State>({theme: Themes.BLACK, color: Colors.BLUE, setTheme: () => {}});
    
    return (
        <ThemeContext.Provider value={{...theme, setTheme: setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export {useTheme, ThemeProvider};