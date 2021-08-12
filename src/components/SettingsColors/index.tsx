import React from 'react';
import cn from 'classnames';
import s from './SettingsColors.module.scss';

interface ISettingsColors extends React.HTMLAttributes<HTMLDivElement> {
    
}

const SettingsColors:React.FC<ISettingsColors> = ({className}) => {
    return (
        <div className={cn(s.root, className)}>
            
        </div>
    );
};

export default SettingsColors;