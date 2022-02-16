import { BaseObject } from './base-object';
import ISelectOption from './select-option';

export interface Language extends ISelectOption{
    id: number,
    code: string
}