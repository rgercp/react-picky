const isEqual = require('lodash.isequal');

import { Value } from './types';

export const isDataObject = (
  obj: object,
  valueKey: string,
  labelKey: string
) => {
  return (
    typeof obj === 'object' &&
    obj.hasOwnProperty(valueKey) &&
    obj.hasOwnProperty(labelKey)
  );
};

export const generateGuid = (): string => {
  function s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
};

export const isEmptyValue = (value: Value) =>
  value === null ||
  value === undefined ||
  (Array.isArray(value) && !value.length);

export const format = (str: string, val: string | number): string =>
  str.replace('%s', val.toString());

export const joinValues = (value: any[], valueKey: string, labelKey: string) =>
  value
    .map(
      opt => (isDataObject(opt, valueKey, labelKey) ? opt[labelKey || ''] : opt)
    )
    .join(', ');

export const safeFormatString = (placeholder: string, value: string | number) =>
  placeholder.indexOf('%s') > -1 ? format(placeholder, value) : placeholder;

export const allSelected = (selected: Value, all: any[]) => {
  const copiedOptions = all.slice(0);
  const copiedSelectedValue = Array.isArray(selected) ? selected.slice(0) : [];
  return isEqual(copiedOptions, copiedSelectedValue);
};
