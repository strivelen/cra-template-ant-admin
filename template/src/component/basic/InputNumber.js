import React from 'react';
import { InputNumber } from 'antd';

export default function BaseInputNumber(props) {
  return <InputNumber style={{ width: '100%' }} controls={false} {...props} />;
}
