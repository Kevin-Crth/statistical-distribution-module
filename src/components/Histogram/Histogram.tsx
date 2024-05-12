import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import * as Stat from '../../types/stat';

import { Category } from '../Category/Category';
import style from './Histogram.module.scss';

export interface Props {
    categories: Stat.StatCategoryInterface[],
    scale: number, //Reference value to proportionally calculate the size of bars in the histogram
    color: string,
    icon: string,
    title: string,
}

export function Histogram(props: React.PropsWithoutRef<Props>) {

    const graphicRef = useRef<HTMLDivElement | null>(null);
    const [isScrollBarVisible, setIsScrollBarVisible] = useState<boolean>(false);

    useLayoutEffect(() => {
        function updateSize() {
            setIsScrollBarVisible(testIfScrollbarIsVisible());
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        setIsScrollBarVisible(testIfScrollbarIsVisible());
    }, [props.categories.length]);

    /** Tests if a scrollbar is visible on the histogram */
    function testIfScrollbarIsVisible() {
        if (graphicRef.current) {
            const hasScrollbar = graphicRef.current.scrollWidth > graphicRef.current.clientWidth;
            if (hasScrollbar) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    /** Returns a CSS class depending on the scrollbar visibility */
    function getGraphicScrollbarClass() {
        if (isScrollBarVisible)
            return style.scrollableHistogram;
        else
            return style.unscrollableHistogram;
    }

    return (
        <div className={style.wrapHistogram + ' ' + getGraphicScrollbarClass()}>
            <div ref={graphicRef} className={style.wrapGraphic}>
                {props.categories.map((category: Stat.StatCategoryInterface, i) => (
                    <Category color={props.color} key={category.category + '-' + i} position={i} scale={props.scale} statCategory={category} />
                ))}
            </div>
            <div className={style.wrapBottom}>
                <div className={style.wrapImage}>
                    <img src={props.icon} />
                </div>
                <div className={style.wrapText}>
                    <span>{props.title} <b>{props.categories.reduce((total, category) => total + category.total, 0)}</b></span>
                </div>
            </div>
        </div>
    );
}

