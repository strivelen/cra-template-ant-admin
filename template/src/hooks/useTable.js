import { useState, useCallback, useEffect } from 'react';
import { message } from 'antd';
import axios from 'utils/interceptor';
import { handleApiValueType } from 'component/SinglePage/helper';
const Config = require('config');

/**
 * Table组件用hook
 * @param {String}    tableConfig.api                 - 必需，列表接口，如："/User/List"
 * @param {Boolean}   tableConfig.isPagination        - 非必需，是否分页，默认不分页
 * @param {String}    tableConfig.defaultIsASC        - 非必需，默认是否正序，
 * @param {String}    tableConfig.defaultSortName     - 非必需，默认排序字段，默认用“ID”排序
 * @param {Array}     tableConfig.paginationPosition  - 非必需，分页器位置，默认在右下角位置
 * @param {Object}     tableConfig.initFilterParams   - 非必需，初始化过滤器参数
 * @returns
 */
function useTable(tableConfig = {}) {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [filterParams, setFilterParams] = useState(tableConfig.initFilterParams || {});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: Config.pageSize,
    total: 0,
    position: tableConfig.paginationPosition
  });
  const [isASC, setIsASC] = useState(!!tableConfig.defaultIsASC);
  const defaultSortName = tableConfig.defaultSortName || 'ID';
  const [sortName, setSortName] = useState(defaultSortName);
  // 筛选
  const onFilter = function (filterFields) {
    setFilterParams({ ...filterFields });
    setPagination({
      ...pagination,
      current: 1
    });
  };
  // 页码改变时执行函数
  const onChange = useCallback((currentPagination, filters, sorte) => {
    setIsASC(sorte.order === 'ascend');
    setSortName(sorte.order === undefined ? defaultSortName : sorte.field);
    setPagination({ ...currentPagination });
  }, []);
  // 刷新列表
  const onRefresh = isToPageOne => {
    if (isToPageOne) {
      if (pagination.current === 1) {
        return getDataSource();
      }
      setPagination({
        ...pagination,
        current: 1
      });
    } else {
      getDataSource();
    }
  };
  // 获取列表
  const getDataSource = async () => {
    const paginationParams = {
      pageSize: tableConfig.isPagination ? pagination.pageSize : undefined,
      pageNumber: tableConfig.isPagination ? pagination.current : undefined,
      isASC,
      name: sortName
    };
    setLoading(true);
    if (!tableConfig.api) {
      return message.warning("请在 'useTable' hook中设定参数: api.");
    }
    const { api, params } = handleApiValueType(tableConfig.api);
    const res = await axios.post(api, {
      ...params,
      ...paginationParams,
      ...filterParams
    });
    setLoading(false);
    if (res.Code === 200) {
      console.log('执行table-api完成：', res);
      const data = res.Data;
      setDataSource(data.List);
      tableConfig.isPagination &&
        setPagination({
          ...pagination,
          total: data.VirtualCount
        });
    }
  };

  useEffect(() => {
    getDataSource();
  }, [pagination.current, pagination.pageSize, filterParams, isASC, sortName]);

  return {
    loading,
    dataSource,
    onRefresh,
    onFilter,
    onChange: tableConfig.isPagination ? onChange : undefined,
    pagination: tableConfig.isPagination ? pagination : undefined
  };
}

export default useTable;
