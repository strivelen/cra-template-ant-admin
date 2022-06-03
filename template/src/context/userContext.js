import { createContext, useContext, useState } from 'react';
import { localItem, setLocalItem, removeLocalItem } from 'utils/utils';
const Config = require('config');

const UserContext = createContext();

function useUserInfo() {
  const [user, setUser] = useState(JSON.parse(localItem(Config.userInfoKey) || '{}'));

  const updateInfo = userInfo => {
    setLocalItem(Config.userInfoKey, JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const deleteInfo = () => {
    removeLocalItem(Config.userInfoKey);
    setUser({});
  };

  return {
    user,
    updateInfo,
    deleteInfo
  };
}

export function UserProvide({ children }) {
  const user = useUserInfo();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}
