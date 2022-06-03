/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import WangEditor from '../WangEditor';

function RichTextEditor({ value, onChange, disabled, isInitDefaultValue }) {
  let isInitValue = useRef(false).current;
  const [defaultHtml, setDefaultHtml] = useState();
  useEffect(() => {
    if (isInitDefaultValue && value && !isInitValue) {
      isInitValue = true;
      setDefaultHtml(value);
    }
  }, [value]);

  if (isInitDefaultValue) {
    return defaultHtml ? (
      <WangEditor
        defaultHtml={defaultHtml}
        disabled={disabled}
        onChange={htmlstr => {
          onChange(htmlstr);
        }}
      />
    ) : (
      <p>正在加载文章内容...</p>
    );
  }

  return (
    <WangEditor
      disabled={disabled}
      onChange={htmlstr => {
        onChange(htmlstr);
      }}
    />
  );
}

export default RichTextEditor;

// const v = (value || '').replace(/[\\ | | \/]/g, '');
// console.log(v);
