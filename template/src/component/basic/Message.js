import { message } from 'antd';

export const success = props => {
  message.success(props);
};

export const error = props => {
  message.error(props);
};

export const warning = props => {
  message.warning(props);
};

export const info = props => {
  message.info(props);
};

export default {
  success,
  error,
  warning,
  info
};
