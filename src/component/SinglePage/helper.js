/**
 * 处理api值类型
 * @param { String | Function } apiValue
 * @param { Object } info
 * @returns { api: String; params: Object }
 */
export const handleApiValueType = (api, info) => {
  if (typeof api === 'string') {
    return { api };
  }
  if (typeof api === 'function') {
    return api(info);
  }
  return api;
};

/**
 * 处理options数据类型
 * @param {Object} options
 * @param {Object} info
 * @returns 返回一个object配置对象
 */
export const handleOptionsType = (options, info) => {
  if (typeof options === 'function') {
    return options(info);
  }
  return options;
};

/**
 * 处理SinglePage => filterFields 配置
 */
export const handleFilterFieldsConfig = (config = []) => {
  return config.map(item => {
    return {
      // label: item.label,  必传
      component: 'Input',
      field: item.label + 'Filter',
      ...item
    };
  });
};

/**
 * 处理tableConfig.columns 简易配置
 * @param {{}} tableConfig
 * @returns
 */
export const handleTableColumnsSimpleConfig = columns => {
  return columns.map(item => {
    return {
      // title: item.title, 必传
      dataIndex: item.title,
      key: item.title,
      ...item
    };
  });
};

/**
 * 处理fields属性值得类型
 * @param {{} | Function} fieldsConfig  字段配置项
 * @param {import('antd').FormInstance} formInstance form实例
 * @returns
 */
export function handleFieldsConfigType(fieldsConfig, formInstance) {
  if (typeof fieldsConfig === 'function') {
    return fieldsConfig(formInstance);
  }
  return fieldsConfig;
}
