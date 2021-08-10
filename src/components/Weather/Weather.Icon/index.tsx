import React from "react";
import Loader from "../../Loader";
import cn from "classnames";
import s from './Weather.Icon.module.scss'

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: string;
}

const Icon: React.FC<IconProps> = ({className,name, ...rest}) => {
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
        return <div className={cn(s.root,className)}><Loader /></div>
    }

    if (!loading && ImportedIconRef.current) {
        const {current: ImportedIcon} = ImportedIconRef;
        return <div className={cn(s.root,className)}><ImportedIcon {...rest} /></div>;
    }

    return null;
};

export default Icon;