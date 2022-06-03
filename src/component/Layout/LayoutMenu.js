/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, useHistory, matchPath } from 'react-router-dom';
import * as Icon from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import useMenuData from 'hooks/useMenuData';
const { isUseServerMenu, routerMap } = require('config');
const { Sider } = Layout;
const { SubMenu } = Menu;

export default function LayoutMenu({ collapsed = false, onSelect }) {
  const menuData = useMenuData({ isUseServerMenu });
  const history = useHistory();
  const location = useLocation();
  const rootSubmenuKeys = menuData.filter(item => item.Children && item.Children.length > 0).map(item => item.Name);
  const [selectedKeys, setselectedKeys] = useState();
  const [openKeys, setOpenKeys] = useState();

  // 设置菜单相关状态
  const setMenuStatus = (data, pathname) => {
    const keyPath = getMenuKeyPath(data, pathname) || [];
    onSelect({ keyPath: [...keyPath] });
    setselectedKeys(keyPath[0]);
    setOpenKeys(keyPath.slice(1) || []);
  };

  useEffect(() => {
    if (menuData.length > 0) {
      // 初始化映射菜单状态
      setMenuStatus(menuData, location.pathname);
      // 监听路由变化，自动映射到菜单状态
      const historyListen = history.listen(({ pathname }) => {
        setMenuStatus(menuData, pathname);
      });
      return historyListen;
    }
  }, [menuData]);

  // 处理菜单折叠
  const onOpenChange = keys => {
    // 这段逻辑表示只控制第一层的展开与收起。
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      const newKeys = latestOpenKey ? [latestOpenKey] : [];
      setOpenKeys(newKeys);
    }
  };
  const menuCom = useMemo(
    () => (
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        // 这里是多余的，路由监听会映射菜单状态
        // onSelect={({ key, keyPath, selectedKeys, domEvent }) => {
        //   // console.log({ key, keyPath, selectedKeys, domEvent });
        //   setselectedKeys(selectedKeys);
        //   onSelect && onSelect({ key, keyPath, selectedKeys, domEvent });
        // }}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        <Menu.Item key="首页" icon={<Icon.HomeOutlined />}>
          <Link to={{ pathname: '/' }}>首页</Link>
        </Menu.Item>
        {menuData.map(item => {
          return <MenuItem key={item.Name} data={item} />;
        })}
      </Menu>
    ),
    [openKeys, menuData]
  );
  return (
    <Sider width={260} trigger={null} collapsible collapsed={collapsed}>
      <div
        style={{
          overflowY: 'auto',
          height: '100vh',
          position: 'sticky',
          top: 0
        }}
      >
        {menuCom}
      </div>
    </Sider>
  );
}

// 渲染菜单
function MenuItem({ data, ...otherProps }) {
  const MenuIcon = data.Icon ? Icon[data.Icon] : undefined;
  if (data.Children) {
    return (
      <SubMenu {...otherProps} key={data.Name} title={data.Name} icon={MenuIcon && <MenuIcon />}>
        {data.Children.map(item => {
          return <MenuItem key={item.Name} data={item} />;
        })}
      </SubMenu>
    );
  }
  return (
    <Menu.Item {...otherProps} key={data.Name} icon={MenuIcon && <MenuIcon />}>
      <Link to={{ pathname: data.Url, state: { Actions: data.Actions } }}>{data.Name}</Link>
    </Menu.Item>
  );
}

// 根据路径匹配菜单状态
function getMenuKeyPath(menuData, pathname) {
  // 把树状结构展平
  const menuLists = [];
  function getMenuList(menuData, level = 0) {
    menuData.forEach((item, index) => {
      const id = `${level}-${index}`;
      menuLists.push({
        ...item,
        id
      });
      if (item.Children) {
        getMenuList(item.Children, id);
      }
    });
  }
  getMenuList(menuData);
  let route = menuLists.find(item => item.Url === pathname);
  if (!route) {
    const currentPagePathModel = routerMap.find(({ path }) => {
      return !!matchPath(pathname, {
        path,
        exact: true,
        strict: true
      });
    }).path;
    route = menuLists.find(
      menuItem =>
        !!matchPath(menuItem.Url, {
          path: currentPagePathModel,
          exact: true,
          strict: true
        })
    );
  }
  if (!route) return;
  return inferKeyPath(route, menuLists, [route.Name]);
}

// 推导出菜单路径
function inferKeyPath(route, routelist, init = []) {
  const routeId = route.id;
  if (routeId.split('-').length <= 2) {
    return init; // 数组第一项是页面菜单选中项，后边的每一项依次为树结构的末枝到根节点的路径。
  } else {
    const routeIdArr = routeId.split('-');
    routeIdArr.pop();
    const upLevelId = routeIdArr.join('-');
    const upLevelRoute = routelist.find(item => item.id === upLevelId);
    return inferKeyPath(upLevelRoute, routelist, init.concat([upLevelRoute.Name]));
  }
}
