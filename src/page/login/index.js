import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'utils/interceptor';
import { message } from 'antd';
import './index.less';
import login_bg from 'assets/image/login_bg.png';
import { setLocalItem } from 'utils/utils';
import { useUserContext } from 'context/userContext';
const config = require('config');

function Login() {
  const userContext = useUserContext();
  const [email, setAccount] = useState('admin');
  const [password, setPassword] = useState('123');
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };

  const onSubmit = async () => {
    const res = await axios.post('/posts', { email, password });
    if (res.id) {
      // data是模拟数据
      const data = { Session: 'Session', User: { ...res, Name: 'Admin' } };
      setLocalItem(config.userTokenKey, data.Session);
      setLocalItem(config.userInfoKey, JSON.stringify(data.User));
      userContext.updateInfo(data.User);
      message.success('登录成功!');
      history.replace(from);
    }
  };

  return (
    <div className="login-bg" style={{ backgroundImage: `url(${login_bg})` }}>
      <div className="login-box">
        <h1 className="login-title">乐康慧爱</h1>
        <div className="input-box">
          <i className="iconfont icon-zhanghu" />
          <input
            autoComplete="off"
            type="text"
            placeholder="请输入用户名"
            value={email}
            onChange={val => setAccount(val.target.value)}
          />
          <span className="line" />
        </div>
        <div className="input-box">
          <i className="iconfont icon-mima" />
          <input
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={val => setPassword(val.target.value)}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                onSubmit();
              }
            }}
          />
          <span className="line" />
        </div>
        {/* <div className="forgot-password">忘记密码？</div> */}
        <button type="button" className="submit" onClick={onSubmit}>
          登录
        </button>
      </div>
    </div>
  );
}
export default Login;
