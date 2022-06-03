import React from 'react';
import { fetchBlob } from 'utils/interceptor';
import { downloadStreamDataFile } from 'utils/utils';
import { handleApiValueType } from '../../helper';

export default function Export({ actionConfig, actionCom: ActionCom, data }) {
  const { options } = actionConfig;
  const onExportFile = async () => {
    const { api, params } = handleApiValueType(options.api, data);
    const { filename, data: Data } = await fetchBlob.post(api, params);
    downloadStreamDataFile(Data, options.type, decodeURIComponent(filename));
  };
  return (
    <ActionCom
      title={actionConfig.title}
      onClick={() => {
        onExportFile();
      }}
    />
  );
}
