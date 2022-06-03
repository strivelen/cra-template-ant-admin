import React, { useState } from 'react';
import { Row, Col } from 'antd';
import * as BaseCom from './basic';
const { FormItem, Button } = BaseCom;

const ColSpan = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 6,
  xxl: 4
};

/**
 * 页面条件查询组件
 * @param {Object} param0
 * @param {[import('antd/lib/table').ColumnProps]} param0.fields
 * @param {Function} param0.onSubmit
 * @param {import('react').ReactNode} param0.children
 * @returns
 */
export default function Filter({ fields = [], onSubmit, children }) {
  const [values, setVlaues] = useState(() => {
    let initValue = fields.reduce((obj, filterItem) => ({ ...obj, [filterItem.field]: filterItem.defaultValue }), {});
    return initValue;
  });

  return (
    <div className="layout_filter">
      <RenderFilterField fields={fields} values={values} onChange={vals => setVlaues(vals)} />
      <RenderFilterButton
        isShowSubmitBtn={fields.length !== 0}
        onQuery={() => {
          onSubmit(values);
        }}
        onReset={() => {
          setVlaues({});
          onSubmit({});
        }}
      >
        {children && children(values)}
      </RenderFilterButton>
    </div>
  );
}

function RenderFilterField({ fields, values, onChange }) {
  if (fields.length === 0) {
    return null;
  }
  return (
    <Row gutter={20}>
      {fields.map(item => {
        const { component: StrCom, field, ...comProps } = item;
        const Com = BaseCom[StrCom];
        return (
          <Col key={item.label} {...ColSpan}>
            <FormItem label={item.label}>
              <Com
                {...comProps}
                value={values[field]}
                onChange={val => {
                  onChange({
                    ...values,
                    [field]: val
                  });
                }}
              />
            </FormItem>
          </Col>
        );
      })}
    </Row>
  );
}

function RenderFilterButton({ onQuery, onReset, isShowSubmitBtn, children }) {
  if (!isShowSubmitBtn) {
    return (
      <Row gutter={30} justify="end" className="layout_filter_button_box">
        {children}
      </Row>
    );
  }
  return (
    <Row gutter={30} justify="space-between" className="layout_filter_button_box">
      <Col>
        <Button
          type="primary"
          onClick={() => {
            onQuery();
          }}
        >
          查询
        </Button>
        <Button
          style={{ marginLeft: 30 }}
          type="default"
          onClick={() => {
            onReset();
          }}
        >
          重置
        </Button>
      </Col>
      <Col>{children}</Col>
    </Row>
  );
}
