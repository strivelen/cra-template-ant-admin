import React, { useRef, useEffect, useMemo } from 'react';
import Filter from '../Filter';
import { Table } from '../basic';
import { ACTION_POSITION, renderActions } from './actions';
import { handleFilterFieldsConfig, handleTableColumnsSimpleConfig } from './helper';
import { useLocation } from 'react-router-dom';
import ActionConfig, { HandleAction } from './actions/handleAction';

export const SinglePageContext = React.createContext();

export default function SinglePage({ filterFields = [], tableConfig = {}, actions }) {
  const { state = {} } = useLocation();
  const newFilterFields = handleFilterFieldsConfig(filterFields);
  const tableConf = useRef(tableConfig).current;
  tableConf.columns = handleTableColumnsActions(handleTableColumnsSimpleConfig(tableConf.columns), state.Actions);
  const tableRef = useRef();
  const initFilterParams = useRef(
    newFilterFields.reduce((obj, filterItem) => ({ ...obj, [filterItem.field]: filterItem.defaultValue }), {})
  ).current;

  const positionActions = useRef(new ActionConfig(actions).bindAuth(state.Actions).generatePositionActions()).current;

  useEffect(() => {
    const tableLineActions = positionActions[ACTION_POSITION.TABLE_EVERY_LINE];
    tableLineActions &&
      tableConf.columns.push({
        title: '操作',
        key: '操作',
        render: (text, record, index) => {
          const newTableLineActions = new HandleAction(tableLineActions, record).isVisible().actions;
          return renderActions[ACTION_POSITION.TABLE_EVERY_LINE](newTableLineActions, record);
        }
      });
  }, []);

  return (
    <SinglePageContext.Provider value={useMemo(() => ({ tableRef }))}>
      <Filter
        fields={newFilterFields}
        onSubmit={fields => {
          tableRef.current.onFilter(fields);
        }}
      >
        {filterValues => {
          const tableRightTopActions = positionActions[ACTION_POSITION.TABLE_RIGHT_TOP];
          if (tableRightTopActions) {
            const newTableRightTopActions = new HandleAction(tableRightTopActions, filterValues).actions;
            return renderActions[ACTION_POSITION.TABLE_RIGHT_TOP](newTableRightTopActions, filterValues);
          }
          return null;
        }}
      </Filter>
      <Table ref={tableRef} {...tableConf} initFilterParams={initFilterParams} />
    </SinglePageContext.Provider>
  );
}

/**
 * 处理columns中的action配置
 * @param {{}} tableConfig
 * @returns
 */
export const handleTableColumnsActions = (columns, authActionTypes) => {
  return columns.map(column => {
    if (column.actions) {
      const actions = column.actions;
      delete column.actions;
      column.render = (_, record, index) => {
        const newActions = new HandleAction(actions, record).bindAuth(authActionTypes).isVisible().actions;
        return renderActions[ACTION_POSITION.TABLE_COLUMN](newActions, record);
      };
    }
    return column;
  });
};
