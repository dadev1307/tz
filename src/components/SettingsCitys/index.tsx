import React from 'react';
import cn from 'classnames';
import s from './SettingsCitys.module.scss';
import {useSettings} from "../../context/settingsContext";
import SettingsCitysItem from "../SettingsCitysItem";
import SettingsAddCity from "../SettingsAddCity";
import DragContent from '../DragContent';


interface ISettingsCitys extends React.HTMLAttributes<HTMLDivElement>{
    addCity: (nameCity: string) => void,
    removeCity: (id:string) => void,
}

const SettingsCitys:React.FC<ISettingsCitys> = ({className, addCity, removeCity}) => {
    const settings = useSettings();
    const {citys, setSettings} = settings;
    return (
        <div className={cn(s.root, className)}>
            <DragContent>
                {citys.map((city) => <SettingsCitysItem key={city.id} city={city} removeCity={removeCity} />)}
            </DragContent>
            <SettingsAddCity addCity={addCity}  />
        </div>
    );
};

export default SettingsCitys;