import React from 'react';
import { Form } from 'antd';

const colSpan = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    md: { span: 6 },
    lg: { span: 6 },
    xl: { span: 6 },
    xxl: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    md: { span: 18 },
    lg: { span: 18 },
    xl: { span: 18 },
    xxl: { span: 18 }
  }
};

export default function BaseFormItem({ children, ...otherProps }) {
  return (
    <Form.Item {...colSpan} {...otherProps} tooltip={false}>
      {children}
    </Form.Item>
  );
}
