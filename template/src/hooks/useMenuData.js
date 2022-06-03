import { useState, useEffect } from 'react';
import axios from 'utils/interceptor';
const localMenuData = require('config').menu;

export default function useMenuData({ isUseServerMenu = false }) {
  if (!isUseServerMenu) {
    return localMenuData;
  }

  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    (async () => {
      if (!isUseServerMenu) {
        return;
      }
      const res = await axios.get('/User/PageList');
      if (res.Code === 200) {
        setMenuData(res.Data);
      }
    })();
  }, []);

  return menuData;
}
