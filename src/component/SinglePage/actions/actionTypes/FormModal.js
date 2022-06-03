import React, { useState, useContext } from 'react';
import { Form, Row } from 'antd';
import axios from 'utils/interceptor';
import * as BaseCom from 'component/basic';
import { SinglePageContext } from '../../index';
import { mapLocalFileDataToServerFormat } from 'component/basic/Upload';
import { handleApiValueType, handleOptionsType } from '../../helper';
import RenderFields from '../RenderFields';
const { Modal, message } = BaseCom;
const { success } = message;

export function FormModal({ title, visible, onCancel, onOk, fields, submitApi }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 提交
  const onFinish = async values => {
    console.log('form-values: ', values);
    const newValues = mapLocalFileDataToServerFormat(fields, values);
    setLoading(true);
    const { api, params } = handleApiValueType(submitApi);
    const res = await axios.post(api, { ...newValues, ...params });
    if (res.Code === 200) {
      success('新增成功');
      onCancel();
      onOk();
      setTimeout(() => {
        form.resetFields();
      }, 300);
    }
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };
  return (
    <Modal
      title={title}
      visible={visible}
      confirmLoading={loading}
      destroyOnClose={true}
      onCancel={() => {
        onCancel();
        setTimeout(() => {
          form.resetFields();
        }, 300);
      }}
      width={960}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={values => onFinish(values)}>
        <Row>
          <RenderFields fields={fields} />
        </Row>
      </Form>
    </Modal>
  );
}

export default function FormModalAction({ actionConfig, data, actionCom: ActionCom }) {
  const [visible, setVisible] = useState(false);
  const { tableRef } = useContext(SinglePageContext);
  const options = handleOptionsType(actionConfig.options || {}, data);
  return (
    <>
      <ActionCom title={actionConfig.title} onClick={() => setVisible(true)} />
      <FormModal
        {...options}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => tableRef.current.onRefresh(true)}
      />
    </>
  );
}
