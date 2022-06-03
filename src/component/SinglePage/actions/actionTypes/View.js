import React, { useImperativeHandle, forwardRef, useContext, useState, useRef } from 'react';
import { Form, Row } from 'antd';
import * as BaseCom from 'component/basic';
import axios from 'utils/interceptor';
import { SinglePageContext } from '../../index';
import { mapServerFileDataToLocalFormat } from 'component/basic/Upload';
import { handleApiValueType } from '../../helper';
import RenderFields from '../RenderFields';
const { Modal, message } = BaseCom;
const { warning } = message;

/**
 * 查看弹框
 */
function ViewModal({ visible, onCancel, title, detailApi, fields = {} }, ref) {
  const fieldKeys = Object.keys(fields);
  const [form] = Form.useForm();

  // 获取修改时的默认数据
  const getDefaultData = async record => {
    if (!detailApi) {
      return warning('请配置参数：detailApi');
    }
    const { api, params } = handleApiValueType(detailApi, record);
    const res = await axios.post(api, params || { ID: record.ID });
    if (res.Code === 200) {
      const data = mapServerFileDataToLocalFormat(fields, res.Data);
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

  return (
    <Modal
      destroyOnClose={true}
      title={title}
      visible={visible}
      footer={null}
      onCancel={() => {
        onCancel();
        setTimeout(() => {
          form.resetFields();
        }, 300);
      }}
      width={960}
      onOk={() => form.submit()}
    >
      <Form form={form}>
        <Row>
          <RenderFields fields={fields} defaultComponentProps={{ disabled: true }} />
        </Row>
      </Form>
    </Modal>
  );
}

const NewViewModal = forwardRef(ViewModal);

export default function ViewAction({ actionConfig, data = {} }) {
  const { tableRef } = useContext(SinglePageContext);
  const [visible, setVisible] = useState(false);
  const refNewViewModal = useRef();
  return (
    <>
      <a
        onClick={() => {
          setVisible(true);
          refNewViewModal.current.getDefaultData(data);
        }}
      >
        {actionConfig.title}
      </a>
      <NewViewModal
        ref={refNewViewModal}
        {...actionConfig.options}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => tableRef.current.onRefresh()}
      />
    </>
  );
}
