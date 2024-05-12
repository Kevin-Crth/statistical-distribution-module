'use client';
import React, { useState, useEffect } from 'react';
import * as Stat from '../../types/stat';

import { Histogram } from '../Histogram/Histogram';
import { Select } from '../Select/Select';
import style from './Statistics.module.scss';

export interface Props {
    stats: Stat.StatInterface[],
}

/** Manages the display of histograms and filtering on races */
export function Statistics(props: React.PropsWithoutRef<Props>) {
    const [filter, setFilter] = useState<Stat.Option>();
    const [categories, setCategories] = useState<Stat.StatCategoryInterface[]>(computeCategories);

    useEffect(() => {
		setCategories(computeCategories());
	}, [filter]);
    
    /** Calculates categories and their number of participants based on race filtering */
    function computeCategories() {
        const computedCategories: Stat.StatCategoryInterface[] = [];
        const filteredRace = props.stats.find(stat => stat.raceId === filter?.name);
        if (filteredRace) {
            filteredRace.categories.forEach(category => {
                computedCategories.push(category);
            });
        } else {
            const values = props.stats;
            values.forEach(stat => {
                stat.categories.forEach(statCategory => {
                    const target = computedCategories.find(element => element.category === statCategory.category);
                    if (target) {
                        target.total += statCategory.total;
                    }
                    else
                        computedCategories.push({ ...statCategory })
                });
            });
        }
        return computedCategories;
    }

    /** Returns the largest number of participants in a category */
    function getHighestValue() {
        let value = 0;
        categories.forEach(category => {
            if (category.total > value)
                value = category.total
        });
        return value
    }

    /** Returns the races list */
    function getRacesForSelect() {
        const races : Stat.Option[] = props.stats.map(stat => {return({name: stat.raceId, color: stat.color})});
        races.unshift({name:'Toutes les courses', color:'#2a4c94'});
        return races;
    }

    /** Updates the filter when a value is selected in the drop-down list */
    function handleSelectCallback(value: Stat.Option) {
        setFilter(value);
    }

    return (
        <div className={style.wrapStatistics}>
            <Select callback={handleSelectCallback} options={getRacesForSelect()} />
            <div className={style.histogramsContainer}>
                <Histogram title='Femme' categories={categories.filter(value => value.gender === Stat.RunnerSexEnum.FEMALE)} color='#fd6a6a' icon='woman.svg' scale={getHighestValue()} />
                <Histogram title='Homme' categories={categories.filter(value => value.gender === Stat.RunnerSexEnum.MALE)} color='#4bdbf5' icon='man.svg' scale={getHighestValue()} />
            </div>
        </div>
    );
}