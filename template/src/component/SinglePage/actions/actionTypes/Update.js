import React, { useState, useImperativeHandle, forwardRef, useRef, useContext } from 'react';
import { Form, Row } from 'antd';
import * as BaseCom from 'component/basic';
import axios from 'utils/interceptor';
import { SinglePageContext } from '../../index';
import { mapLocalFileDataToServerFormat, mapServerFileDataToLocalFormat } from 'component/basic/Upload';
import { handleApiValueType, handleOptionsType, handleFieldsConfigType } from '../../helper';
import RenderFields from '../RenderFields';
const { Modal, message } = BaseCom;
const { success, warning } = message;

function UpdateModal({ title, visible, onCancel, onOk, fields, submitApi, detailApi }, ref) {
  const [form] = Form.useForm();
  const fieldsConfig = useRef(handleFieldsConfigType(fields, form)).current;
  const fieldKeys = Object.keys(fieldsConfig);
  const [loading, setLoading] = useState(false);
  // 获取修改时的默认数据
  const getDefaultData = async record => {
    if (!detailApi) {
      return warning('请配置参数：detailApi');
    }
    const { api, params } = handleApiValueType(detailApi, record);
    const res = await axios.post(api, params || { ID: record.ID });
    if (res.Code === 200) {
      const data = mapServerFileDataToLocalFormat(fieldsConfig, res.Data);
      const defaultData = {};
      fieldKeys.forEach(item => {
        defaultData[item] = data[item];
      });
      form.setFieldsValue(defaultData);
    }
  };

  useImperativeHandle(ref, () => ({
    getDefaultData
  }));

  // 提交
  const onFinish = async values => {
    console.log('更新-form-values: ', values);
    setLoading(true);
    const res = await axios.post(submitApi, mapLocalFileDataToServerFormat(fieldsConfig, values));
    if (res.Code === 200) {
      setLoading(false);
      success('修改成功');
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
      destroyOnClose={true}
      title={title}
      visible={visible}
      confirmLoading={loading}
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
          <RenderFields fields={fieldsConfig} form={form} />
        </Row>
      </Form>
    </Modal>
  );
}

const NewUpdateModal = forwardRef(UpdateModal);

export default function UpdateAction({ actionConfig, data = {} }) {
  const { tableRef } = useContext(SinglePageContext);
  const [visible, setVisible] = useState(false);
  const refNewUpdateModal = useRef();

  // 处理options数据类型
  let options = handleOptionsType(actionConfig.options || {}, data);
  return (
    <>
      <a
        onClick={() => {
          setVisible(true);
          refNewUpdateModal.current.getDefaultData(data);
        }}
      >
        {actionConfig.title}
      </a>
      <NewUpdateModal
        ref={refNewUpdateModal}
        {...options}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => tableRef.current.onRefresh()}
      />
    </>
  );
}
