import {useEffect, useRef, useState} from 'react';
import {LazyImageProps} from "../interfaces/LazyImage";


const LazyImage: React.FC<LazyImageProps> = ({src, alt, className}) => {
    const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setLoadedSrc(src);
                        observer.disconnect();
                    }
                });
            },
            {rootMargin: '100px'}
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, [src]);

    return <img ref={imgRef} src={loadedSrc || ''} alt={alt} className={className}/>;
};
export default LazyImage;