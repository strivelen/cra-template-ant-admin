import { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from 'utils/utils';

/**
 * value改变时防抖
 * @param {String | Number} value
 * @param {Function} onChange
 * @param {String} component
 * @returns
 */
export default function useValueDebounce(value, onChange, component) {
  const debounceComponentTypes = useRef(['TextArea', 'Input']).current;
  const isUseDebounce = useRef(debounceComponentTypes.indexOf(component) > -1).current;
  const [Value, setValue] = useState(value);
  useEffect(() => {
    isUseDebounce && setValue(value);
  }, [value]);
  const debounceValue = useCallback(
    debounce(value => {
      onChange(value);
    }, 300),
    [value]
  );
  if (isUseDebounce) {
    return {
      value: Value,
      onChange: v => {
        setValue(v);
        debounceValue(v);
      }
    };
  }
  return {
    value,
    onChange
  };
}
