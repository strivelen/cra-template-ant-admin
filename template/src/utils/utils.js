const Config = require('config');

// 验证手机号
export const isPhone = function (strNumber) {
  if (strNumber.length !== 11) {
    return false;
  }
  if (!/^1[3456789]\d{9}$/.test(strNumber)) {
    return false;
  }
  return true;
};

/**
 * 本地数据读取
 *
 * @param {String} key
 * @returns {String} 返回结果
 */
export const localItem = key => {
  const getItemRes = localStorage.getItem(key);
  return getItemRes;
};

/**
 * 本地数据存储
 *
 * @param {String} key
 * @param {String} value
 */
export const setLocalItem = (key, value) => {
  localStorage.setItem(key, value);
};

/**
 * 删除本地数据
 *
 * @param {String} [key]
 */
export const removeLocalItem = key => {
  if (typeof key === 'undefined') {
    localStorage.clear();
  } else {
    localStorage.removeItem(key);
  }
};

/**
 * 会话数据读取
 *
 * @param {String} key
 * @returns {String} 返回结果
 */
export const sessionItem = key => {
  const getItemRes = sessionStorage.getItem(key);
  return getItemRes;
};

/**
 * 会话数据存储
 *
 * @param {String} key
 * @param {String} value
 */
export const setSessionItem = (key, value) => {
  sessionStorage.setItem(key, value);
};

/**
 * 删除会话数据
 *
 * @param {String} [key]
 */
export const removeSessionItem = key => {
  if (typeof key === 'undefined') {
    sessionStorage.clear();
  } else {
    sessionStorage.removeItem(key);
  }
};

/**
 * 获取屏幕/元素高度
 *
 * @param {String} [documentString] 不传返回屏幕高度，可传querySelector选择器字符串
 * @returns {Number} 返回结果
 */
export const documentHeight = documentString => {
  let documentHeightTemp = 0;
  if (documentString) {
    documentHeightTemp = document.querySelector(documentString).offsetHeight;
  } else {
    documentHeightTemp = document.body.clientHeight || document.documentElement.clientHeight;
  }
  return documentHeightTemp;
};

/**
 * 获取url查询参数
 * @param {String} url
 */
export function handleUrlQueryValue(url) {
  // 获取url查询参数字符串数组
  function getUrlQueryArr(url = '') {
    if (url.indexOf('?') === -1) {
      return [];
    }
    let search = url.split('?')[1] || window.location.search;
    search.indexOf('?') > -1 && (search = search.substring(1));
    if (search) {
      return search.split('&');
    }
    return [];
  }
  const searchArr = getUrlQueryArr(url);

  // 返回值处理
  let queryObj = {};
  for (let i = 0; i < searchArr.length; i++) {
    const item = searchArr[i] || '';
    const itemArr = item.split('=');
    if (itemArr.length > 0) {
      queryObj[itemArr[0]] = itemArr[1];
    }
  }
  return queryObj;
}

/**
 * 获取cookie
 */
export function getCookie(name) {
  let prefix = name + '=';
  let start = document.cookie.indexOf(prefix);

  if (start === -1) {
    return null;
  }

  let end = document.cookie.indexOf(';', start + prefix.length);
  if (end === -1) {
    end = document.cookie.length;
  }

  let value = document.cookie.substring(start + prefix.length, end);
  return unescape(value);
}

/**
 * 拼接查询参数
 */
export function setQueryUrl(fields) {
  const fieldsKeys = Array.from(Object.keys(fields));
  let queryUrl = '';
  fieldsKeys.forEach(item => {
    if (fields[item]) {
      queryUrl += `${item}=${fields[item]}${item !== fieldsKeys[fieldsKeys.length - 1] ? '&' : ''}`;
    }
  });
  return queryUrl ? `&${queryUrl}` : '';
}

// 打开新开窗口并监听关闭
export const openNewWindow = function (url, callback) {
  window.name = 'origin';
  let windowObjectReference;
  // var strWindowFeatures =
  //   "width=1000,height=500,menubar=yes,location=yes,resizable=yes,scrollbars=true,status=true"; //窗口设置
  // url需打开的窗口路径例如：www.baidu.com
  function openRequestedPopup(url) {
    windowObjectReference = window.open(
      url,
      'name' + Math.random()
      // strWindowFeatures
    );
  }
  // 循环监听
  let loop = setInterval(() => {
    if (windowObjectReference.closed) {
      clearInterval(loop); // 停止定时器
      callback && callback();
      // location.reload(); //刷新当前页面
    }
  }, 600);
  openRequestedPopup(url);
};

/**
 * 防抖(debounce)
 * @param {Function} fn
 * @param {Number} delay
 * @description 1.解决this指向问题 2.解决 event 事件对象问题
 */
export const debounce = function (fn, wait) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, arguments); // 把参数传进去
    }, wait);
  };
};

/**
 * 节流(throttle)
 * @param {Function} fn
 * @param {Number} delay
 * @description 请注意，节流函数并不止上面这种实现方案,例如可以完全不借助setTimeout，可以把状态位换成时间戳，然后利用时间戳差值是否大于指定间隔时间来做判定。
 * 也可以直接将setTimeout的返回的标记当做判断条件-判断当前定时器是否存在，如果存在表示还在冷却，并且在执行fn之后消除定时器表示激活，原理都一样
 */
export const throttle = function (fn, delay) {
  let valid = true;
  return function () {
    if (!valid) {
      // 休息时间 暂不接客
      return false;
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false;
    setTimeout(() => {
      fn();
      valid = true;
    }, delay);
  };
};

/**
 * 复制文本
 * @param {String} text
 * @param {Function} callback
 */
export function copyText(text, callback) {
  const tag = document.createElement('textarea');
  tag.setAttribute('id', 'cp_hgz_input');
  tag.value = text;
  document.getElementsByTagName('body')[0].appendChild(tag);
  document.getElementById('cp_hgz_input').select();
  document.execCommand('copy');
  document.getElementById('cp_hgz_input').remove();
  if (callback) {
    callback(text);
  }
}

/**
 * 下载文件
 * @param {String} href
 * @param {String} fileName
 */
export function downloadFile(href, fileName) {
  const a = document.createElement('a');
  a.href = href;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * 下载流数据文件
 * @param {FileStream} data
 * @param {ContentType} type
 * @param {String} fileName
 */
export function downloadStreamDataFile(data, type, fileName = '') {
  let blob = new Blob([data], { type });
  const fileUrl = window.URL.createObjectURL(blob);
  downloadFile(fileUrl, fileName);
  window.URL.revokeObjectURL(fileUrl);
}

/**
 * 菜单页面自定义时绑定按钮权限的公共方法
 * @description 返回布尔值，当返回true时显示按钮。
 * @param {String | false} actionType
 * @param {Array} authTypes
 * @returns Boolean
 */
export function isAuthAction(actionType, authTypes) {
  if (!Config.isUseServerMenu || actionType === false) {
    return true;
  }
  return !!authTypes.find(item => item.Action === actionType);
}
