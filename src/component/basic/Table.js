import React, { useImperativeHandle } from 'react';
import { Table } from 'antd';
import useTable from 'hooks/useTable';

/**
 * 基础Table组件
 * @param {Array} columns
 * @param {String} rowKey
 * @param {String} listApi
 * @param {Boolean} isPagination
 * @param {Array} paginationPosition
 * @param {Array} defaultSortName
 * @returns
 */
function BaseTable(
  {
    columns = [],
    rowKey,
    listApi,
    isPagination,
    paginationPosition,
    defaultSortName,
    defaultIsASC,
    initFilterParams,
    ...otherTableConfig
  },
  ref
) {
  if (columns.length === 0) {
    return null;
  }
  const { loading, dataSource, onChange, pagination, onFilter, onRefresh } = useTable({
    api: listApi, // 列表数据api
    isPagination: isPagination, // 是否分页
    paginationPosition, // 分页器位置
    defaultSortName, // 默认排序字段
    defaultIsASC, // 默认是否正序排列
    initFilterParams // 初始化过滤器参数
  });
  useImperativeHandle(ref, () => ({
    onFilter,
    onRefresh
  }));
  return (
    <>
      <p style={{ marginBottom: 3, fontWeight: 'bold' }}>
        总共找到<span style={{ color: 'red' }}> {pagination.total} </span>条数据
      </p>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={record => record[rowKey] || record.ID}
        pagination={pagination || false}
        loading={loading}
        onChange={onChange}
        {...otherTableConfig}
      />
    </>
  );
}

export default React.forwardRef(BaseTable);
