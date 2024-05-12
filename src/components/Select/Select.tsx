import React, { useState, useRef, useEffect } from 'react';
import * as Stat from '../../types/stat';
import style from './Select.module.scss';

interface Props {
    options: Stat.Option[],
    callback: (value: Stat.Option) => void;
}

/** Drop-down list component*/
export function Select(props: React.PropsWithoutRef<Props>) {
    const [value, setValue] = useState<Stat.Option>(props.options[0]);
    const [isUlVisible, setIsUlVisibble] = useState<boolean>(false);
    const selectRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        if (value)
            props.callback(value);
    }, [value]);

    /** Returns a CSS class depending on the visibility of the options list */
    function getUlClass() {
        if (isUlVisible)
            return style.showUpSelect;
        else
            return style.hideDownSelect;
    }

    /** Hides the options list when user clicks outside */
    function handleClickOutside(event: MouseEvent) {
        document.removeEventListener('click', handleClickOutside);
        if (selectRef.current && !selectRef.current.contains(event.target as Node))
            setIsUlVisibble(false);
    }

    /** Shows or hides the options list when the field is clicked */
    function handleSelectClick() {
        if (isUlVisible) {
            setIsUlVisibble(false);
        } else {
            setIsUlVisibble(true);
            document.addEventListener('click', handleClickOutside);
        }
    }

    /** Takes the selected value when a list item is clicked */
    function handleLiClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        const targetText = e.currentTarget.textContent;
        if (targetText) {
            const searchedValue = props.options.find(option => option.name === targetText);
            if (searchedValue) {
                setValue(searchedValue);
                setIsUlVisibble(false);
            }
        }
    }

    return (
        <div ref={selectRef} className={style.wrapSelect + ' ' + getUlClass()}>
            <div style={{ borderLeft: `solid 0.25rem ${value.color}` }} onClick={handleSelectClick} className={style.wrapValue}>
                <span style={{ color: value.color }}>{value.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M831.872 340.864L512 652.672L192.128 340.864a30.592 30.592 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.592 30.592 0 0 0-42.752 0z"></path></svg>
            </div>
            <div className={style.wrapUl}>
                <ul >
                    {props.options?.map((option, i) => (
                        <li onMouseDown={handleLiClick} key={option.name + i}>
                            <div style={{ borderLeft: `solid 0.25rem ${option.color}` }} className={style.wrapLiSpan}>
                                <span style={{ color: option.color }}>{option.name}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
