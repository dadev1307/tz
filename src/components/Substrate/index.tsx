import React from 'react';
import cn from 'classnames';

import s from './Substrate.module.scss';
import Icon from "../Weather/Weather.Icon";

interface ISubstrate extends React.HTMLAttributes<HTMLDivElement> {
    title?: string,
    iconName?: string,
}

const Substrate:React.FC<ISubstrate> = ({className, children, title,iconName}) => {
    return (
        <div className={cn(s.root, className)}>
            {title && <h3 className={s.title}>
                {iconName && <Icon className={s.icon} name={iconName} />} {title}
            </h3>}
            
            {children}
        </div>
    );
};

export default Substrate;