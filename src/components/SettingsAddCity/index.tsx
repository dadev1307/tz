import React from 'react';
import cn from 'classnames';
import s from './SettingsAddCity.module.scss';
import Icon from "../Weather/Weather.Icon";

interface ISettingsAddCity extends React.HTMLAttributes<HTMLDivElement> {
    
}

const SettingsAddCity:React.FC<ISettingsAddCity> = ({className}) => {
    return (
        <div className={cn(s.root, className)}>
            <button className={s.btnAdd}><Icon name={'add'} /> Добавить</button>
        </div>
    );
};

export default SettingsAddCity;