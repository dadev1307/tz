import React from 'react';
import cn from 'classnames';
import s from './SearchCityWindow.module.scss';
import {ReactComponent as ArrowSvg} from "../SearchCity/assets/arrow.svg";
import {useSettings} from "../../context/settingsContext";
import SearchCity from "../SearchCity";


interface ISearchCityWindow extends React.HTMLAttributes<HTMLDivElement> {
    
}

const SearchCityWindow:React.FC<ISearchCityWindow> = ({className, children}) => {

    const {theme, setSettings, color} = useSettings();
    return (
        <div className={s.root}>
            <div className={s.wrapper}>
                <p className={s.title}>
                    <ArrowSvg className={cn()} />
                    Введите регион
                </p>
                {children}
            </div>

        </div>
    );
};

export default SearchCityWindow;