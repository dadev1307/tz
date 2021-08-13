import React, {useState} from 'react';
import cn from 'classnames';
import s from './SettingsAddCity.module.scss';
import Icon from "../Weather/Weather.Icon";
import SearchCity from "../SearchCity";

interface ISettingsAddCity extends React.HTMLAttributes<HTMLDivElement> {
    
}

const SettingsAddCity:React.FC<ISettingsAddCity> = ({className}) => {
    const [isSearch, setIsSearch] = useState<boolean>(false);
    
    return (
        <div className={cn(s.root, className)}>
            <button className={s.btnAdd}><Icon name={'add'} /> Добавить</button>
            <SearchCity getCityWeather={()=>{}} />
        </div>
    );
};

export default SettingsAddCity;