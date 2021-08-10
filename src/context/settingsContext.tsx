import {createContext, useContext, useState} from "react";

enum Colors {
    BLUE = 'blue',
    GREEN = 'green',
    RED = 'red',
    ORANGE = 'orange',
    PURPLE = 'purple'
}

enum Themes {
    BLACK = 'black',
    WHITE = 'white'
}

enum UnitsTemp {
    'C',
    'F'
}

interface ICity {
    name: string,
    lat: number | undefined,
    lon: number | undefined,
    isHour: boolean,
}


type State = {
    theme: Themes,
    color: Colors,
    unitsTemp: UnitsTemp,
    isFullMode: boolean,
    citys: ICity[],
    setSettings: React.Dispatch<any>
};

type ThemeProviderProps = { children: React.ReactNode };

const SettingContext = createContext<State | undefined>(undefined);


function useSettings() {
    const context = useContext(SettingContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvide');
    }
    return context;
}

function SettingsProvider({children}: ThemeProviderProps) {
    const [theme, setSettings] = useState<State>({
        theme: Themes.BLACK,
        color: Colors.BLUE,
        unitsTemp: UnitsTemp.C,
        isFullMode: false,
        citys:[],
        setSettings: () => {
        }
    });

    return (
        <SettingContext.Provider value={{...theme, setSettings: setSettings}}>
            {children}
        </SettingContext.Provider>
    )
}

export {useSettings, SettingsProvider};