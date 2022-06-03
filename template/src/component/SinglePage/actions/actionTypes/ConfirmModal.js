import { useContext } from 'react';
import { confirm, message } from 'component/basic';
import axios from 'utils/interceptor';
import { SinglePageContext } from '../../index';

export function confirmModal({ title, submitApi, params, cb }) {
  confirm({
    title: title || '确定要执行此操作吗？',
    onOk() {
      (async () => {
        if (!submitApi || !params) {
          return message.warning('请指定submitApi或参数');
        }
        const res = await axios.post(submitApi, params);
        if (res.Code === 200) {
          message.success('操作成功');
          cb && cb();
        }
      })();
    }
  });
}

export default function ConfirmModal({ actionConfig, data }) {
  const { tableRef } = useContext(SinglePageContext);
  const cb = () => tableRef.current.onRefresh();
  let options = actionConfig.options || {};
  if (typeof actionConfig.options === 'function') {
    options = options(data);
  }
  return (
    <a onClick={() => confirmModal({ cb, ...options, params: { ID: data.ID, ...options.params } })}>
      {actionConfig.title}
    </a>
  );
}
