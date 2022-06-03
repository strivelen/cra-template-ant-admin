import React from 'react';
import { Button } from 'antd';

export default function BaseButton({ style, children, ...btnProps }) {
  return (
    <Button style={{ minWidth: 80, ...style }} {...btnProps}>
      {children}
    </Button>
  );
}
