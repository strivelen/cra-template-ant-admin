/**
 * @component Actions
 * @description 设计思想：
 * 一、CRUD列表页面中放置按钮的地方分为两个地方：
 *     1. 页面级的按钮，放在Filter组件查询按钮同行右侧(表格右上角)。
 *     2. 表格行级，放在表格中每行的操作列。
 * 二、指定特定功能按钮，如：CRUD按钮，当然也可以指定其他功能性的按钮。
 */

// import React from 'react';
import { Button, Divider, Row, Col } from 'antd';
import React from 'react';
import * as actionTypes from './actionTypes';

// 按钮位置，扩展按钮位置就在这里
export const ACTION_POSITION = {
  TABLE_RIGHT_TOP: 'table_right_top',
  TABLE_EVERY_LINE: 'table_every_line',
  TABLE_COLUMN: 'table_column'
};

// 功能性按钮类型，多个地方要使用的按钮功能可以设定在此，方便复用
export const ACTION_TYPE = {
  ADD: 'Add', // 新增
  UPDATE: 'Update', // 修改
  VIEW: 'View', // 查询
  DELETE: 'Delete', // 删除
  CONFIRMMODAL: 'ConfirmModal', // 确认弹框
  FORMMODAL: 'FormModal', // 通用表单弹框
  EXPORT: 'Export' // 导出功能
};

const actionButton = {
  [ACTION_POSITION.TABLE_EVERY_LINE]: ({ title, ...actionProps }) => <a {...actionProps}>{title}</a>,
  [ACTION_POSITION.TABLE_RIGHT_TOP]: ({ title, ...actionProps }) => (
    <Button type="primary" {...actionProps}>
      {title}
    </Button>
  )
};

export const renderActions = {
  /**
   * 渲染在表格column中定义的actions
   * @param {Array} actions
   * @param {{}} record 表格行数据
   * @returns
   */
  [ACTION_POSITION.TABLE_COLUMN]: (actions = [], record = {}) => {
    const ActionButton = actionButton[ACTION_POSITION.TABLE_EVERY_LINE];
    return (
      <Row>
        {actions.map((action, index) => {
          const ActionTypeCom = actionTypes[action.type];
          const Action = ActionTypeCom ? (
            <ActionTypeCom key={index} actionConfig={action} data={record} actionCom={ActionButton} />
          ) : (
            <ActionButton key={index} title={action.title} onClick={() => action.options.onClick(record)} />
          );
          if (actions.length === 1) {
            return Action;
          }
          return (
            <Col span={12} key={index}>
              {Action}
            </Col>
          );
        })}
      </Row>
    );
  },

  /**
   * 渲染action到table每一行
   * @param {Array} actions
   * @param {{}} record 表格行数据
   * @returns
   */
  [ACTION_POSITION.TABLE_EVERY_LINE]: (actions = [], record = {}) => {
    const ActionButton = actionButton[ACTION_POSITION.TABLE_EVERY_LINE];
    return actions.map((action, index) => {
      const ActionTypeCom = actionTypes[action.type];
      const Action = ActionTypeCom ? (
        <ActionTypeCom key={index} actionConfig={action} data={record} actionCom={ActionButton} />
      ) : (
        <ActionButton key={index} title={action.title} onClick={() => action.options.onClick(record)} />
      );
      if (index === 0) {
        return Action;
      }
      return (
        <React.Fragment key={index}>
          <Divider type="vertical" />
          {Action}
        </React.Fragment>
      );
    });
  },

  /**
   * 渲染action到table右上角与查询按钮平齐
   * @param {Array} actions
   * @param {{}} filterValues 筛选参数
   * @returns
   */
  [ACTION_POSITION.TABLE_RIGHT_TOP]: (actions = [], filterValues = {}) => {
    const ActionButton = actionButton[ACTION_POSITION.TABLE_RIGHT_TOP];
    return (
      <Row gutter={20}>
        {actions.map(item => {
          const ActionTypeCom = actionTypes[item.type];
          return (
            <Col key={item.title}>
              {ActionTypeCom ? (
                <ActionTypeCom actionConfig={item} data={filterValues} actionCom={ActionButton} />
              ) : (
                <ActionButton
                  title={item.title}
                  style={{ minWidth: 80 }}
                  onClick={() => item.options.onClick(filterValues)}
                />
              )}
            </Col>
          );
        })}
      </Row>
    );
  }
};
