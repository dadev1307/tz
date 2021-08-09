import React, {useState} from 'react';
import s from './Weather.module.scss';
import cn from 'classnames';
import Icon from "./Weather.Icon";
import Params from "./Weather.Params";

const Weather = () => {
    const [btnShowHourActive, setBtnShowHourActive] = useState<boolean>(false);
    
    
    return (
        <div className={cn(s.root, s.full)}>
            <div className={s.temp}>
                13°с <Icon name={'cloud'} className={s.tempIcon} width={20}/>
            </div>
            <div className={s.condition}>
                Гроза
            </div>
            <div className={s.site}>
               <Icon name={'site'} className={s.siteIcon} width={11} fill={'currentColor'} opacity={0.9} /> Санкт-Петербург
            </div>
            <Params items={[{name: 'barometer', units: 'мм', value: 355 },{name: 'wind', units: 'м/с', value: 4 },{name: 'humidity', units: '%', value: 60 }]} className={s.params} />
            <div className={cn([s.btnShowHour, {[s.active]: btnShowHourActive}])} onClick={() => setBtnShowHourActive(!btnShowHourActive)}>
                <Icon className={s.btnShowHourIcon} name={'btnShowHour'} width={10} opacity={0.7} />
            </div>
        </div>
    );
};

export default Weather;