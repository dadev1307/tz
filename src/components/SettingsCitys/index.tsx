import React from 'react';
import cn from 'classnames';
import s from './SettingsCitys.module.scss';
import {useSettings} from "../../context/settingsContext";
import SettingsCitysItem from "../SettingsCitysItem";
import SettingsAddCity from "../SettingsAddCity";


interface ISettingsCitys extends React.HTMLAttributes<HTMLDivElement>{
    
}

const SettingsCitys:React.FC<ISettingsCitys> = ({className}) => {
    const settings = useSettings();
    const {citys, setSettings} = settings;
    return (
        <div className={cn(s.root, className)}>
            {citys.map(city => <SettingsCitysItem key={`${city.lat}${city.lon}`} city={city}/>)}
            <SettingsAddCity />
        </div>
    );
};

export default SettingsCitys;