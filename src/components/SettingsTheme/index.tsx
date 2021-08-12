import React from 'react';
import cn from 'classnames';
import s from './SettingsTheme.module.scss';

interface ISettingsTheme extends React.HTMLAttributes<HTMLDivElement> {
    
}

const SettingsTheme:React.FC<ISettingsTheme> = ({className}) => {
    return (
        <div className={cn(s.root, className)}>
            
        </div>
    );
};

export default SettingsTheme;