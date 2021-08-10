import React from 'react';
import s from './Settings.module.scss';
import Icon from "../Weather/Weather.Icon";

interface ISettings extends React.HTMLAttributes<HTMLDivElement>{
    closeSettings: () => void,
}

const Settings:React.FC<ISettings> = ({closeSettings}) => {
  return (
    <div className={s.root}>
      Settings
        <Icon name={'close'} className={s.icon} onClick={() => closeSettings()} />
    </div>
  );
};

export default Settings;
