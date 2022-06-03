import axios from 'axios';
import { message } from 'antd';
import { localItem } from 'utils/utils';
const Config = require('config');

// let loading;

function startLoading() {
  // 开启 loading
}
function endLoading() {
  // 关闭 loading
}

// showFullScreenLoading() tryHideFullScreenLoading() 用于将同一时刻的请求合并。
// 声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1
// 调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1   needLoadingRequestCount为 0 时，结束 loading

let needLoadingRequestCount = 0;
function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

// 处理浏览器错误状态码
function showBrowserErrorStatusMassage(errorCode, errorText) {
  let errorMessage = errorText;
  switch (errorCode) {
    case 400:
      errorMessage = '请求错误(400)';
      break;
    case 401:
      errorMessage = '未授权，请重新登录(401)';
      break;
    case 403:
      errorMessage = '拒绝访问(403)';
      break;
    case 404:
      errorMessage = '请求出错(404)';
      break;
    case 408:
      errorMessage = '请求超时(408)';
      break;
    case 500:
      errorMessage = '服务器错误(500)';
      break;
    case 501:
      errorMessage = '服务未实现(501)';
      break;
    case 502:
      errorMessage = '网络错误(502)';
      break;
    case 503:
      errorMessage = '服务不可用(503)';
      break;
    case 504:
      errorMessage = '网络超时(504)';
      break;
    case 505:
      errorMessage = 'HTTP版本不受支持(505)';
      break;
    default:
      errorMessage = `连接出错(${errorText})!`;
  }
  message.error(errorMessage);
}

axios.defaults.baseURL = Config.apiDomain;
axios.defaults.timeout = Config.timeout;
// axios.defaults.withCredentials = true;  // 请求是否携带cookie

/**
 * 请求拦截器
 */
function publicRequestInterceptor(instance) {
  return instance.interceptors.request.use(
    config => {
      showFullScreenLoading();
      const userToken = localItem(Config.userTokenKey);
      if (userToken) {
        config.headers[Config.apiSessionName] = userToken;
      }
      return config;
    },
    error => {
      message.error('请求超时！');
      return Promise.reject(error);
    }
  );
}

/**
 * 响应拦截器
 */
function publicResponseInterceptor(instance) {
  return instance.interceptors.response.use(
    response => {
      tryHideFullScreenLoading();
      return response;
    },
    error => {
      if (error && error.response) {
        const errorCode = error.response.status;
        const errorText = error.response.statusText;
        showBrowserErrorStatusMassage(errorCode, errorText);
      } else {
        message.error('连接服务器失败!');
      }
      return Promise.reject(error);
    }
  );
}

// ================================================================
//                axios实例
// ================================================================

// 请求JSON数据
function fetchJson() {
  const fetchJsonInstance = axios.create();
  publicRequestInterceptor(fetchJsonInstance);
  publicResponseInterceptor(fetchJsonInstance);
  fetchJsonInstance.interceptors.response.use(response => {
    const { data = {} } = response;
    if (data.Code !== 200) {
      message.error(data.Message);
    }
    return data;
  });
  return fetchJsonInstance;
}

// 请求Blob数据
function _fetchBlob() {
  const fetchBlobInstance = axios.create();
  fetchBlobInstance.defaults.responseType = 'blob';
  publicRequestInterceptor(fetchBlobInstance);
  publicResponseInterceptor(fetchBlobInstance);
  fetchBlobInstance.interceptors.response.use(response => {
    const { headers, data } = response;
    const filename = headers['content-disposition'].split('=')[1];
    return { filename, data };
  });
  return fetchBlobInstance;
}

export const fetchBlob = _fetchBlob();

export default fetchJson();
