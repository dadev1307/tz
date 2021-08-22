﻿import React from 'react';
import cn from 'classnames';
import s from './SettingsCitysItem.module.scss';
import {ICity} from "../../context/settingsContext";
import Icon from "../Weather/Weather.Icon";

interface ISettingsCitysItem extends React.HTMLAttributes<HTMLDivElement>{
    city: ICity,
    removeCity: (id:string) => void
}

const SettingsCitysItem:React.FC<ISettingsCitysItem> = ({className, city, removeCity, draggable}) => {
  const handleRemoveCity = () => {
    removeCity(city.id);
  }
    return (
        <div className={cn(s.root, className)} draggable={draggable}>
            <Icon name={'menu'} className={s.menu} />
            {city.name}
            <Icon name={'trash'} className={s.basket} onClick={handleRemoveCity} />
        </div>
    );
};

export default SettingsCitysItem;