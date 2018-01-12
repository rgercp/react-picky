import * as React from 'react';
import { PlaceholderProps } from './types';
import {
  isEmptyValue,
  isDataObject,
  safeFormatString,
  joinValues
} from './helpers';

const Placeholder: React.SFC<PlaceholderProps> = ({
  placeholder,
  value,
  multiple,
  numberDisplayed,
  valueKey,
  labelKey,
  manySelectedPlaceholder,
  allSelectedPlaceholder,
  allSelected
}) => {
  let message: string | undefined = '';
  console.log(allSelectedPlaceholder);
  if (isEmptyValue(value)) {
    message = placeholder;
  } else {
    if (Array.isArray(value) && multiple) {
      if (numberDisplayed !== undefined && value.length <= numberDisplayed) {
        message = joinValues(value, valueKey || '', labelKey || '');
      } else if (manySelectedPlaceholder && !allSelected) {
        // if it doesn't include the sprintf token then just use the placeholder
        message = safeFormatString(manySelectedPlaceholder, value.length);
        //If all selected and there is an allselectedplaceholder use that
      } else if (allSelected && allSelectedPlaceholder) {
        // if it doesn't include the sprintf token then just use the placeholder
        message = safeFormatString(allSelectedPlaceholder, value.length);
      } else {
        //If more than numberDisplayed then show "length selected"
        message = `${value.length} selected`;
      }
    } else {
      const tempValue = Array.isArray(value) ? value[0] : value;
      if (isDataObject(tempValue, valueKey || '', labelKey || '')) {
        message = tempValue[labelKey || ''];
      } else {
        message = tempValue;
      }
    }
  }
  return (
    <span className="picky__placeholder" data-test="placeholder-text">
      {message}
    </span>
  );
};

Placeholder.defaultProps = {
  placeholder: 'None selected',
  allSelectedPlaceholder: '%s selected',
  manySelectedPlaceholder: '%s selected',
  allSelected: false
};
export default Placeholder;
