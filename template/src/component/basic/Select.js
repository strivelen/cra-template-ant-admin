import React, { useState, useEffect } from 'react';
import { Select as AntdSelect } from 'antd';
import axios from 'utils/interceptor';

export function Select({ enumUrl, options = [], ...otherProps }) {
  const [Enum, setEnum] = useState([]);
  useEffect(async () => {
    if (enumUrl && typeof enumUrl === 'string') {
      const res = await axios.get(enumUrl);
      if (res.Code === 200) {
        const data = (res.Data || []).map(item => ({ label: item.Value, value: Number(item.Key) }));
        setEnum(data);
      }
    }
  }, []);

  useEffect(() => {
    if (options.length > 0) {
      setEnum(options);
    }
  }, [options]);

  return (
    <AntdSelect
      allowClear
      optionFilterProp="label"
      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      options={Enum}
      {...otherProps}
    />
  );
}
