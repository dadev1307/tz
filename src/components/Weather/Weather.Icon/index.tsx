import React from "react";
import Loader from "../../Loader";
import s from './Weather.Icon.module.scss'

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: string;
}

const Icon: React.FC<IconProps> = ({name, ...rest}) => {
    if(!rest.width) {
        rest.width = 18;
    }
    const ImportedIconRef = React.useRef<React.FC<React.SVGProps<SVGSVGElement>>>();
    const [loading, setLoading] = React.useState(false);

    React.useEffect((): void => {
        setLoading(true);
        const importIcon = async (): Promise<void> => {
            try {
                ImportedIconRef.current = (await import(`./assets/${name}.svg`)).ReactComponent;
            } catch (err) {
                throw err;
            } finally {
                setLoading(false);
            }
        };
        importIcon();
    }, [name]);
    
    
    if(loading) {
        return <div className={s.root} style={{width: `${rest.width}px` || "inherit"}}><Loader /></div>
    }

    if (!loading && ImportedIconRef.current) {
        const {current: ImportedIcon} = ImportedIconRef;
        return <div className={s.root}><ImportedIcon {...rest} /></div>;
    }

    return null;
};

export default Icon;