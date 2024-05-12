import React from 'react';
import * as Stat from '../../types/stat';
import style from './Category.module.scss';

export interface Props {
    statCategory: Stat.StatCategoryInterface,
    position: number;   //Element position in histogram
    scale: number;  //Reference value to proportionally calculate the size of the bar in the histogram
    color: string;
}
/**Represents a category on a histogram*/
export function Category(props: React.PropsWithoutRef<Props>) {

    /** Returns the opacity of the background depending on the position of the element in the histogram */
    function getOpacity(){
        if(props.position % 2 === 1)
            return 0.5
        else
            return 1
    }

    return (
        <div className={style.wrapCategory}>
            <div className={style.categoryHeader}>
                <span className={style.spanName}>{props.statCategory.category}</span><br/>
                <span className={style.spanTotal}>{props.statCategory.total}</span>
            </div>
            <div className={style.categorybar} style={{ height: `${props.statCategory.total / props.scale * 100}%`, opacity: getOpacity(), background: props.color}}></div>
        </div>
    );
}

