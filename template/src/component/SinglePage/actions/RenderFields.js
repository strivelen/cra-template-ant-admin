import { Col } from 'antd';
import * as BaseCom from 'component/basic';
const { FormItem } = BaseCom;

/**
 * Render Fields
 * @param {
 *    {
 *      [fieldName]: {
 *        component: String;
 *        componentProps: ComponentProps;
 *        isFillLine: Boolean;
 *        col: ColProps;
 *        ...FormItemProps
 *      }
 *    }
 * } fields
 * @param {Object} defaultComponentProps 默认组件属性，会绑定到FormItem的子组件当中
 * @description 此组件用来渲染fields配置到表单
 * @returns
 */
export default function RenderFields({ fields, defaultComponentProps = {} }) {
  const fieldKeys = Object.keys(fields);
  return fieldKeys.map(item => {
    const { component: comName, componentProps, col, isFillLine, ...formItemProps } = fields[item];
    const Com = BaseCom[comName];
    if (formItemProps.hidden) {
      return (
        <FormItem key={item} name={item} {...formItemProps}>
          <Com {...defaultComponentProps} {...componentProps} />
        </FormItem>
      );
    }
    if (isFillLine) {
      return (
        <Col key={item} span={24} {...col}>
          <FormItem name={item} labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} {...formItemProps}>
            <Com {...defaultComponentProps} {...componentProps} />
          </FormItem>
        </Col>
      );
    }
    return (
      <Col key={item} span={12} {...col}>
        <FormItem name={item} {...formItemProps}>
          <Com {...defaultComponentProps} {...componentProps} />
        </FormItem>
      </Col>
    );
  });
}
