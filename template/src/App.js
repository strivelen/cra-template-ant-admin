import React from 'react';
import { UserProvide } from 'context/userContext';
import Routes from 'router';
import { ConfigProvider } from 'antd';
import * as dayjs from 'dayjs';

import zhCN from 'antd/lib/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import 'antd/dist/antd.less';
import 'assets/less/index.less';

dayjs.locale('zh-cn');

export default function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <UserProvide>
        <Routes />
      </UserProvide>
    </ConfigProvider>
  );
}
