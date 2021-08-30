import React from 'react';
import cn from 'classnames';
import s from './Weathers.module.scss';
import Icon from "../Weather/Weather.Icon";
import {useSettings} from "../../context/settingsContext";

interface IWeathers {
    classname?: string,
    showSettings: () => void,
}

const Weathers: React.FC<IWeathers> = ({showSettings, children}) => {
    const settings = useSettings();
    const {isFullMode, setSettings} = settings;
    
    const iconNameMode = (): string => {
        return isFullMode ? 'minimize' : 'maximize';
    }
    
    const handleFullMode = ():void => {
        setSettings({...settings, isFullMode: !isFullMode});
    }
    
    return (
        <div className={s.root}>
            {children}
            <div className={s.icons}>
                <Icon name={iconNameMode()} className={cn(s.fullModeToggle, {[s.active]: isFullMode})} onClick={handleFullMode} />
                <Icon name={'settings'} className={cn(s.settingsIcon, {[s.disabled]: !isFullMode})} onClick={showSettings} />
            </div>
            
        </div>
    );
};

export default Weathers;
