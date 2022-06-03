import dayjsGenerateConfig from 'rc-picker/es/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';
import dayjs from 'dayjs';

const AntdDatePicker = generatePicker(dayjsGenerateConfig);

export default function DatePicker({ value, ...otherProps }) {
  return <AntdDatePicker value={value ? dayjs(value) : ''} {...otherProps} />;
}
