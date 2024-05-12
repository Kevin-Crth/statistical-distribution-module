export interface StatInterface {
    raceId: string;
    color: string;
    categories: StatCategoryInterface[];
}

export interface StatCategoryInterface {
    gender: RunnerSexEnum;
    category: string;
    total: number;
}

export enum RunnerSexEnum {
    FEMALE = 'FEMALE',
    MALE = 'MALE',
    MIXED = 'MIXED',
    UNKNOWN = 'UNKNOWN',
}

export type Option = {
    name: string,
    color?: string,
}