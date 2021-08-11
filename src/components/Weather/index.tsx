import React, {lazy, Suspense, useState} from 'react';
import s from './Weather.module.scss';
import cn from 'classnames';
import Icon from "./Weather.Icon";
import Params from "./Weather.Params";
import {WeatherResult} from "../../interface/weatherResult";
import Loader from "../Loader";
import WeatherHour from './Weather.Hour';
import {useSettings} from "../../context/settingsContext";
import { getIconByCode } from '../../utils/utils';
interface IWeather {
    data: WeatherResult | null,
    idx: number
}

const Weather: React.FC<IWeather> = ({data, idx}) => {
    const settings = useSettings();
    const {isFullMode, citys, setSettings} = settings;
    const [isShowHour, setIsShowHour] = useState<boolean>(citys[idx].isHour);
    
    const handleCityHour = () => {
        setIsShowHour((oldValue) => {
            citys[idx].isHour = !oldValue;
            setSettings({...settings, citys: citys});
            return !oldValue;
        });
        
    }
    
    return (
        <div className={cn(s.root,{[s.full]: isFullMode})}>
            {data ?
                <>
                    <div className={s.temp}>
                        {data.tempC}°с <Icon name={getIconByCode(data.condition.code)} className={s.tempIcon} />
                    </div>
                    <div className={s.condition}>
                        {data.condition.text}
                    </div>
                    <div className={s.site}>
                        <Icon name={'site'} className={s.siteIcon} width={11} fill={'currentColor'}
                              opacity={0.9}/> {data.city}
                    </div>
                    <Params items={data.params} className={s.params}/>
                   
                    <WeatherHour className={cn(s.hour,{[s.active]: isShowHour && isFullMode})} items={data.hour} />
                    
                    <div className={cn([s.btnShowHour, {[s.active]: isShowHour}])}
                         onClick={handleCityHour}>
                        <Icon className={s.btnShowHourIcon} name={'btnShowHour'} width={10} opacity={0.7}/>
                    </div>
                </> :
                <Loader/>
            }
        </div>
    );
};

export default Weather;