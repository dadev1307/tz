import React from 'react';
import cn from 'classnames';
import s from './Hour.module.scss';
import {WeatherHour} from "../../../interface/weatherResult";
import Icon from "../Weather.Icon";
import {getIconByCode, getTime } from '../../../utils/utils';

interface IHour extends React.HTMLAttributes<HTMLDivElement> {
    items: WeatherHour[]
}

const Hour:React.FC<IHour> = ({className, items= []}) => {
    return (
        <div className={cn(s.root, className)}>
            {items.map(item => <div className={s.item} key={item.timeEpoch}>
                <span className={s.temp}>{item.tempC}°с</span>
                <Icon className={s.icon} name={getIconByCode(item.condition.code)} />
                <span className={s.time}>{getTime(item.time)}</span>
            </div>)}
        </div>
    );
};

export default Hour;