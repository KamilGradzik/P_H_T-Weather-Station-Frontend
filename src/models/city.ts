import { Sensor } from './sensor';
import { BaseObject } from './base-object';
import ISelectOption from './select-option';

export default interface City extends ISelectOption{
    id: number,
    city_name: string,
    sensor_list: number[]
}