import { Value } from './types';
export declare const isDataObject: (obj: object, valueKey: string, labelKey: string) => boolean;
export declare const generateGuid: () => string;
export declare const isEmptyValue: (value: Value) => boolean;
export declare const format: (str: string, val: string | number) => string;
export declare const joinValues: (value: any[], valueKey: string, labelKey: string) => string;
export declare const safeFormatString: (placeholder: string, value: string | number) => string;
export declare const allSelected: (selected: Value, all: any[]) => any;
