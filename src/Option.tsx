import * as React from 'react';
import { isDataObject } from './helpers';
import { RenderProps } from './types';

const Option: React.SFC<RenderProps> = (props: RenderProps) => {
  const {
    parentId,
    item,
    isSelected,
    labelKey,
    valueKey,
    selectValue,
    style,
    multiple,
    tabIndex,
    index
  } = props;
  const cssClass = isSelected ? 'option selected' : 'option';
  const body = isDataObject(item as object, labelKey || '', valueKey || '')
    ? item[labelKey || '']
    : item;

  const inputType = multiple ? 'checkbox' : 'radio';
  const select = () => selectValue(item);
  return (
    <div
      tabIndex={tabIndex}
      id={`${parentId}-option-${index}`}
      role="option"
      style={style}
      aria-selected={isSelected}
      className={cssClass}
      onClick={select}
      onKeyPress={e => {
        e.preventDefault();
        selectValue(item);
      }}
    >
      <input
        type={inputType}
        readOnly
        onClick={select}
        tabIndex={-1}
        checked={isSelected}
        aria-label={body}
      />
      {body}
    </div>
  );
};

export default Option;
