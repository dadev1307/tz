import React from 'react';
import s from './WindowLoader.module.scss';
import Loader from "../Loader";

const WindowLoader = () => {
    return (
        <div className={s.root}>
            <Loader />
        </div>
    );
};

export default WindowLoader;