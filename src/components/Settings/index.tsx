import React from 'react';
import s from './Settings.module.scss';
import Icon from "../Weather/Weather.Icon";
import Substrate from "../Substrate";
import SettingsCitys from "../SettingsCitys";
import SettingsTemperature from "../SettingsTemperature";
import SettingsTheme from "../SettingsTheme";
import SettingsColors from "../SettingsColors";

interface ISettings extends React.HTMLAttributes<HTMLDivElement> {
    closeSettings: () => void,
}

const Settings: React.FC<ISettings> = ({closeSettings}) => {
    return (
        <div className={s.root}>
            <h2 className={s.title}>Настройки</h2>
            <Icon name={'close'} className={s.icon} onClick={() => closeSettings()}/>
            <Substrate iconName={'arrow'} title={'Округ'} className={s.citys}>
                <SettingsCitys/>
            </Substrate>
            <Substrate iconName={'thermometer'} title={'Температура'} className={s.temp}>
                <SettingsTemperature/>
            </Substrate>
            <Substrate iconName={'star'} title={'Тема'}>
                <SettingsTheme/>
            </Substrate>
            <Substrate iconName={'droplet'} title={'Цвет'}>
                <SettingsColors/>
            </Substrate>
        </div>
    );
};

export default Settings;
