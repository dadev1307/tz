import React from 'react';
import cn from 'classnames';
import s from './SettingsTemperature.module.scss';

interface ISettingsTemperature extends React.HTMLAttributes<HTMLDivElement> {
    
}

const SettingsTemperature:React.FC<ISettingsTemperature> = ({className}) => {
    return (
        <div className={cn(s.root, className)}>
            
        </div>
    );
};

export default SettingsTemperature;