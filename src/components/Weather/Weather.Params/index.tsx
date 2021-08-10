import React from 'react';
import s from './Weather.Params.module.scss';
import cn from 'classnames';
import Icon from "../Weather.Icon";
import {ParamItem} from "../../../interface/weatherResult";



interface IParams extends React.HTMLAttributes<HTMLDivElement>{
    items: ParamItem[]
}

const Params:React.FC<IParams> = ({className, items}) => {
    return (
        <div className={cn([s.root, className])}>
            {items.map(item => <div className={s.item} key={item.iconName}>
                <Icon name={item.iconName} className={s.icon} />
                <span className={s.value}>{item.value}{item.units}</span>
            </div>)}
        </div>
    );
};

export default Params;