import {createContext, useContext, useState} from "react";
import useLocalStorage from "../hook/useLocalStorage";
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

export interface ICity {
    name?: string,
    lat?: number,
    lon?: number,
    isHour: boolean,
}


export type SettingsState = {
    theme: Themes,
    color: Colors,
    unitsTemp: UnitsTemp,
    isFullMode: boolean,
    citys: ICity[],
    setSettings: React.Dispatch<any>
};

type SettingsProviderProps = { children: React.ReactNode };

const SettingContext = createContext<SettingsState | undefined>(undefined);


function useSettings() {
    const context = useContext(SettingContext);
    if (!context) {
        throw new Error('useTheme must be used within a SettingsProvide');
    }
    return context;
}

function SettingsProvider({children}: SettingsProviderProps) {
    const [settings, setSettings] = useState<SettingsState>({
        theme: Themes.BLACK,
        color: Colors.BLUE,
        unitsTemp: UnitsTemp.C,
        isFullMode: false,
        citys:[],
        setSettings: () => {
        }
    });
    
    const [set, setSet] = useLocalStorage();
    const newSetSettings = (data: SettingsState) => {
        setSet(data);
        setSettings(data);
    }
    
    if(!set) {
        setSet(settings);
    }

    return (
        <SettingContext.Provider value={{...settings, setSettings: newSetSettings}}>
            {children}
        </SettingContext.Provider>
    )
}

export {useSettings, SettingsProvider};