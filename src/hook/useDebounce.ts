import { useEffect } from 'react';

const useDebounce = (value: string, delay: number, cb: Function) => {
    
    useEffect(() => {
        if(!value) {
            return;
        }
        const handler = setTimeout(()=> {
            cb();
        }, delay)
        return () => {
            clearTimeout(handler);
        }
    }, [value]);
    
    
}

export default useDebounce;