import React from 'react';
import { Input } from 'antd';

export default function BaseInput({ onChange, ...otherProps }) {
  return (
    <Input
      allowClear
      onChange={val => {
        onChange(val.target.value);
      }}
      {...otherProps}
    />
  );
}

export function Password(props) {
  return <Input.Password {...props} />;
}

export function TextArea(props) {
  return <Input.TextArea rows={4} {...props} />;
}
