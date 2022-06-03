import React, { useState } from 'react';
import { Layout, Avatar, Row, Col, Dropdown, Menu, Divider } from 'antd';
import LayoutMenu from 'component/Layout/LayoutMenu';
import LayoutBreadcrumb from 'component/Layout/LayoutBreadcrumb';
import { LayoutProvide } from 'context/layoutContext';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { removeLocalItem, localItem } from 'utils/utils';
import { useHistory } from 'react-router-dom';

const { Content, Footer, Header } = Layout;
const config = require('config');

export default function MyLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState();
  return (
    <LayoutProvide value={{ setBreadcrumb }}>
      <Layout>
        <LayoutMenu
          collapsed={collapsed}
          onSelect={({ keyPath }) => {
            setBreadcrumb(keyPath.reverse());
          }}
        />
        <Layout className="site-layout">
          <Header className="site-header">
            <Row justify="space-between" align="middle">
              <Col>
                <Row align="middle">
                  <Col>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                      className: 'site-menu-trigger',
                      onClick: () => setCollapsed(!collapsed)
                    })}
                  </Col>
                  <Col>
                    <LayoutBreadcrumb data={breadcrumb} />
                  </Col>
                </Row>
              </Col>
              <Col>
                <UserAvatarAndName />
              </Col>
            </Row>
          </Header>
          <Divider style={{ height: 6, margin: 0, borderWidth: 0 }} />
          <Content style={{ padding: '8px 16px', overflow: 'initial', backgroundColor: '#fff' }}>{children}</Content>
          <Footer style={{ textAlign: 'center' }}>Footer</Footer>
        </Layout>
        {/* <Content id="ant-layout">{children}</Content> */}
      </Layout>
    </LayoutProvide>
  );
}

function UserAvatarAndName() {
  const userInfo = JSON.parse(localItem(config.userInfoKey)) || {};
  const history = useHistory();
  const menu = (
    <Menu
      style={{ width: 120 }}
      onClick={e => {
        if (e.key === '3') {
          removeLocalItem(config.userTokenKey);
          removeLocalItem(config.userInfoKey);
          history.push('/login');
        }
      }}
    >
      {/* <Menu.Item key="0">
        <a>个人信息</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a>个人信息2</a>
      </Menu.Item>
      <Menu.Divider /> */}
      <Menu.Item danger key="3">
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['click', 'hover']}>
      <Row gutter={10} style={{ cursor: 'pointer' }}>
        <Col>
          <Avatar icon={<UserOutlined />} />
        </Col>
        <Col>{userInfo.Name}</Col>
      </Row>
    </Dropdown>
  );
}
