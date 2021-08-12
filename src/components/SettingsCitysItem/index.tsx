import React from 'react';
import cn from 'classnames';
import s from './SettingsCitysItem.module.scss';
import {ICity} from "../../context/settingsContext";
import Icon from "../Weather/Weather.Icon";

interface ISettingsCitysItem extends React.HTMLAttributes<HTMLDivElement>{
    city: ICity,
    deleteCity?: () => void
}

const SettingsCitysItem:React.FC<ISettingsCitysItem> = ({className, city}) => {
    return (
        <div className={cn(s.root, className)}>
            <Icon name={'menu'} className={s.menu} />
            {city.name}
            <Icon name={'trash'} className={s.basket} />
        </div>
    );
};

export default SettingsCitysItem;