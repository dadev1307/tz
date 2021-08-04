import React, {useState} from 'react';
import s from './SearchCity.module.scss';
import useDebounce from "../../hook/useDebounce";
import {searchCity} from "../../utils/fetchHelpers";
import {SearchData} from "../../interface/SearchData";
import {ReactComponent as ArrowSvg} from "./assets/arrow.svg";
import {ReactComponent as SearchSvg} from "./assets/search.svg";

const SearchCity = () => {
    const [queryCity, setQueryCity] = useState('');
    const [listQuery, setListQuery] = useState<SearchData[]>([])
    useDebounce(queryCity, 500, () => {
        searchCity(queryCity).then((res) => {
            setListQuery(res);
        })
    })
    const handleQueryCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryCity(e.target.value);
    }

    return (
        <div className={s.root}>

            <label className={s.wrapper}>
                <p className={s.title}>
                    <ArrowSvg />
                    Введите регион
                </p>
                <div className={s.inputWrapper}>
                    <div className={s.search}>
                        <SearchSvg className={s.searchSvg} /><input className={s.input} type='text' onInput={handleQueryCity}/>
                    </div>
                    <div className={s.resultList}>
                        
                    </div>
                </div>
                
            </label>
            
        </div>
    );
};

export default SearchCity;
