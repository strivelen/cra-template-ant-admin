import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'utils/interceptor';
import { success } from './Message';

const { confirm: baseconfirm } = Modal;
export function confirm(props) {
  baseconfirm({ centered: true, icon: <ExclamationCircleOutlined />, ...props });
}

/**
 * 确认删除弹框
 */
export function confirmDelete({ title, api, params, cb }) {
  confirm({
    title: title || '确定要删除此数据吗？',
    onOk() {
      (async () => {
        const res = await axios.post(api, params);
        if (res.Code === 200) {
          success('删除成功');
          cb && cb();
        }
      })();
    }
  });
}

export default function BaseModal({ children, ...otherProps }) {
  return (
    <Modal centered maskClosable={false} okText="保存" {...otherProps}>
      {children}
    </Modal>
  );
}
