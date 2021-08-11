import React, {useState} from 'react';
import cn from 'classnames';
import s from './SearchCity.module.scss';
import useDebounce from "../../hook/useDebounce";
import {searchCity} from "../../utils/fetchHelpers";
import {SearchData} from "../../interface/SearchData";
import {ReactComponent as ArrowSvg} from "./assets/arrow.svg";
import {ReactComponent as SearchSvg} from "./assets/search.svg";
import {ReactComponent as ArrowRightSvg} from "./assets/arrow-right.svg";
import Loader from "../Loader";
import {useSettings} from "../../context/settingsContext";

interface ISearchCity extends React.HTMLAttributes<HTMLDivElement>{
    getCityWeather: (cityName: string) => void,
}

const SearchCity:React.FC<ISearchCity> = ({getCityWeather}) => {
    const [queryCity, setQueryCity] = useState<string>('');
    const [listQuery, setListQuery] = useState<SearchData[]>([])
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [isLoader, setIsLoader] = useState<boolean>(true);
    const [selectedCity, setSelectedCity] = useState<SearchData|null|undefined>(null);

    const {theme, setSettings, color} = useSettings();
    
    const getSearchWeather = () => {
        getCityWeather(queryCity);
    }
    
    useDebounce(queryCity, 500, () => {
        if(queryCity.length < 3) {
            setListQuery([]);
            return;
        }
        searchCity(queryCity).then((res) => {
            setListQuery(res);
        }).finally(()=>{
            setIsLoader(false);
        })
    })
    const handleQueryCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryCity(e.target.value);
        setIsLoader(true);
    }
    
    const handleSelectedCity = (item: SearchData) => {
        setQueryCity(item.name)
        setSelectedCity(item);
    }
    
    const focusInput = () => {
        setIsFocus(true);
        setQueryCity('');
        setSelectedCity(null);
    }
    const blurInput = () => {
        setIsFocus(false);
    }
    
    const isShowArrowRight = selectedCity || (!isFocus && !queryCity.length ) || (queryCity.length > 3 && !listQuery.length);
    const isShowSearchSvg = isFocus || queryCity.length;
    const isShowList = (queryCity.length >= 3 && !selectedCity);
    
    const showListByState = () => {
        if(isLoader) {
            return <div className={s.loader}><Loader /></div>
        }
        if(listQuery.length) {
            return <div className={s.resultList}>{(listQuery.slice(0, 5).map(item => <span key={item.id} onClick={(e) => handleSelectedCity(item)}>{item.name}</span>))}</div>
        }
        if(!listQuery.length && isShowList) {
            return <p className={s.notFound}>Ничего не найдено</p>
        }
        return <div className={s.loader}><Loader /></div>
        
    }
    

    return (
        <div className={s.root}>
            <div className={s.wrapper}>
                <p className={s.title}>
                    <ArrowSvg className={cn([s[color]])} />
                    Введите регион
                </p>
                <div className={cn([s.inputWrapper, {[s.active]: isShowList}])}>
                    <div className={s.search}>
                        <SearchSvg className={cn([s.searchSvg,{[s.active]: isShowSearchSvg}])} />
                        <input className={s.input} type='text' value={queryCity} onInput={handleQueryCity} onFocus={focusInput} onBlur={blurInput}/>
                        <ArrowRightSvg onClick={getSearchWeather} className={cn([s.arrowRightSvg, {[s.active]: isShowArrowRight}])}  />
                    </div>
                    <div className={cn([s.resultWrapper, {[s.active]: isShowList}])}>
                        {showListByState()}
                    </div>
                </div>
                
            </div>
            
        </div>
    );
};

export default SearchCity;
