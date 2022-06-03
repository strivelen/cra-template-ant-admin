import { useContext } from 'react';
import { confirm, message } from 'component/basic';
import axios from 'utils/interceptor';
import { SinglePageContext } from '../../index';
import { handleOptionsType } from '../../helper';

/**
 * 确认删除弹框
 */
export function confirmDelete({ title, submitApi, params, cb }) {
  confirm({
    title: title || '确定要删除此数据吗？',
    onOk() {
      (async () => {
        if (!submitApi || !params) {
          return message.warning('请指定删除submitApi和参数');
        }
        const res = await axios.post(submitApi, params);
        if (res.Code === 200) {
          message.success('删除成功');
          cb && cb();
        }
      })();
    }
  });
}

export default function DeleteAction({ actionConfig, data }) {
  const { tableRef } = useContext(SinglePageContext);
  const cb = () => tableRef.current.onRefresh();
  const options = handleOptionsType(actionConfig.options || {}, data);
  return <a onClick={() => confirmDelete({ params: { ID: data.ID }, cb, ...options })}>{actionConfig.title}</a>;
}
