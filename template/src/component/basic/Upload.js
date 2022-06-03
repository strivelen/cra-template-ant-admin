import React from 'react';
import { Upload, Button } from 'antd';
import { localItem } from 'utils/utils';
import { UploadOutlined } from '@ant-design/icons';
const config = require('config');
const userToken = localItem(config.userTokenKey);

export default function BaseUpload({ value = [], onChange, action, disabled, ...componentProps }) {
  const handleOnChange = ({ file, fileList }) => {
    let newFileList = fileList;
    if (file.status === 'done') {
      newFileList = fileList.map(item => {
        if (item.uid === file.uid) {
          const res = file.response;
          return { ...item, url: res.Data };
        }
        return item;
      });
    }
    onChange(newFileList);
  };
  return (
    <Upload
      action={config.apiDomain + action}
      headers={{
        [config.apiSessionName]: userToken
      }}
      fileList={value}
      onChange={info => handleOnChange(info)}
      {...componentProps}
    >
      <Button type="default" disabled={disabled} icon={<UploadOutlined />}>
        上传文件
      </Button>
    </Upload>
  );
}

// 本地文件数据转成服务端接受格式
export function mapLocalFileDataToServerFormat(fieldModel, fieldValue) {
  const fileFields = Object.keys(fieldModel).filter(item => fieldModel[item].component === 'Upload');
  const newFileFieldValues = {};
  fileFields.forEach(item => {
    const fileFieldValue = fieldValue[item] || [];
    const fileFieldType = fieldModel[item].fieldtype || 'objectArray';
    switch (fileFieldType) {
      case 'string':
        newFileFieldValues[item] = (fileFieldValue[0] || {}).url || '';
        break;
      case 'array':
        newFileFieldValues[item] = fileFieldValue.map(item => item.url);
        break;
      case 'objectArray':
        newFileFieldValues[item] = fileFieldValue.map(item => {
          const fileData = { ...item };
          delete fileData.response;
          delete fileData.originFileObj;
          delete fileData.xhr;
          return fileData;
        });
    }
  });
  return { ...fieldValue, ...newFileFieldValues };
}

// 服务端文件数据转成本地文件格式
export function mapServerFileDataToLocalFormat(fieldModel, data = {}) {
  const fileFields = Object.keys(fieldModel).filter(item => fieldModel[item].component === 'Upload');
  const localFileFieldValue = {};
  fileFields.forEach((fieldName, index) => {
    const currentFileFieldData = data[fieldName];
    if (!currentFileFieldData || !currentFileFieldData.length) {
      localFileFieldValue[fieldName] = [];
      return;
    }
    if (typeof currentFileFieldData === 'string') {
      localFileFieldValue[fieldName] = [
        {
          url: currentFileFieldData,
          uid: `file-${index}`,
          name: getUrlFileName(currentFileFieldData),
          status: 'done'
        }
      ];
    }
    if (currentFileFieldData.length) {
      localFileFieldValue[fieldName] = currentFileFieldData.map((file, index) => {
        if (typeof file === 'object') {
          return {
            url: file.Url,
            uid: `file-arr-${index}`,
            name: getUrlFileName(file.Url),
            status: 'done'
          };
        }
        return {
          url: file,
          uid: `file-arr-${index}`,
          name: getUrlFileName(file),
          status: 'done'
        };
      });
    }
  });
  return { ...data, ...localFileFieldValue };
}

// 从url中提取文件名
function getUrlFileName(url) {
  const pathArr = url.split('/');
  return pathArr[pathArr.length - 1];
}
