import React from 'react';
import SinglePage from 'component/SinglePage';
import { ACTION_POSITION, ACTION_TYPE } from 'component/SinglePage/actions';

export default function Test() {
  return (
    <SinglePage
      filterFields={[
        {
          label: '姓名',
          component: 'Input',
          field: 'NameFilter'
        },
        {
          label: '昵称',
          component: 'Input',
          field: 'NickNameFilter'
        },
        {
          label: '性别',
          component: 'Select',
          field: 'GenderFilter',
          enumUrl: '/Enum/Gender'
        },
        {
          label: '手机',
          component: 'Input',
          field: 'MobileFilter'
        }
      ]}
      tableConfig={{
        listApi: '/users', // 列表数据api
        isPagination: true, // 是否分页
        defaultSortName: 'ID', // 默认排序字段
        paginationPosition: ['bottomRight'], // 分页器放置位置
        rowKey: 'ID',
        columns: [
          {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
            sorter: true,
            render: (text, record) => (
              <a href="" target="_blank">
                {text}
              </a>
            )
          },
          {
            title: '姓名',
            dataIndex: 'Name',
            key: 'Name'
          },
          {
            title: '昵称',
            dataIndex: 'NickName',
            key: 'NickName'
          },
          {
            title: '性别',
            dataIndex: 'Gender',
            key: 'Gender'
          },
          {
            title: '手机',
            dataIndex: 'Mobile',
            key: 'Mobile'
          },
          {
            title: '地址',
            dataIndex: 'Address',
            key: 'Address'
          },
          {
            title: '创建时间',
            dataIndex: 'CreateTime',
            key: 'CreateTime',
            sorter: false
          }
        ]
      }}
      actions={[
        {
          title: '新增',
          position: ACTION_POSITION.TABLE_RIGHT_TOP,
          type: ACTION_TYPE.ADD,
          options: {
            title: '新增用户',
            submitApi: '/User/Add',
            fields: {
              ID: { component: 'Input', noStyle: true, hidden: true },
              Type: {
                component: 'Select',
                label: '类型',
                componentProps: { enumUrl: '/Enum/Type' },
                rules: [{ required: true, message: '请输入类型' }]
              },
              Address: {
                component: 'TextArea',
                label: '地址'
              }
            }
          }
        },
        {
          title: '查看',
          position: ACTION_POSITION.TABLE_EVERY_LINE,
          type: ACTION_TYPE.VIEW,
          options: {
            title: '查看用户',
            detailApi: '/NormalUser/Get',
            fields: {
              ID: { component: 'Input', noStyle: true, hidden: true },
              OpenID: { component: 'Input', label: 'OpenID' },
              UnionID: { component: 'Input', label: 'UnionID' },
              gzhOpenID: { component: 'Input', label: 'gzhOpenID' },
              Name: { component: 'Input', label: '姓名' },
              NickName: { component: 'Input', label: '昵称' },
              Gender: {
                component: 'Select',
                label: '性别',
                componentProps: { enumUrl: '/Enum/Gender' },
                rules: [{ required: true, message: '请选择性别' }]
              },
              Mobile: { component: 'Input', label: '手机' },
              Address: { component: 'TextArea', label: '地址' }
            }
          }
        },
        {
          title: '修改',
          position: ACTION_POSITION.TABLE_EVERY_LINE,
          type: ACTION_TYPE.UPDATE,
          options: {
            title: '修改用户',
            detailApi: '/NormalUser/Get',
            submitApi: '/NormalUser/Update',
            fields: {
              ID: { component: 'Input', noStyle: true, hidden: true },
              OpenID: { component: 'Input', label: 'OpenID' },
              UnionID: { component: 'Input', label: 'UnionID' },
              gzhOpenID: { component: 'Input', label: 'gzhOpenID' },
              Name: { component: 'Input', label: '姓名' },
              NickName: { component: 'Input', label: '昵称' },
              Gender: {
                component: 'Select',
                label: '性别',
                componentProps: { enumUrl: '/Enum/Gender' },
                rules: [{ required: true, message: '请选择性别' }]
              },
              Mobile: { component: 'Input', label: '手机' },
              Address: { component: 'TextArea', label: '地址' },
              File: {
                label: '上传头像',
                component: 'Upload',
                componentProps: {
                  action: '/test/upload'
                }
              }
            }
          }
        },
        {
          title: '删除',
          position: ACTION_POSITION.TABLE_EVERY_LINE,
          type: ACTION_TYPE.DELETE,
          options: record => ({
            // title: `确定要删除ID: ${record.ID}？`,
            api: '/User/Delete'
          })
        },
        {
          title: '测试行数据',
          position: ACTION_POSITION.TABLE_EVERY_LINE,
          options: {
            onClick: record => {
              console.log('测试行数据record: ', record);
            }
          }
        },
        {
          title: '报告',
          position: ACTION_POSITION.TABLE_EVERY_LINE,
          options: {
            onClick: record => {
              console.log('报告：', record);
              // window.open(`/order/onlineOrder/1&0`);
            }
          }
        },
        {
          title: '导出',
          position: ACTION_POSITION.TABLE_RIGHT_TOP,
          // type: ACTION_TYPE.UPDATE,
          options: {
            onClick: () => {
              console.log('导出');
            }
          }
        }
      ]}
    />
  );
}
