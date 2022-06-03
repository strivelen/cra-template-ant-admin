import React, { useState, useEffect } from 'react';
import { message } from 'component/basic';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import '@wangeditor/editor/dist/css/style.css';

const customAlert = (s, t) => {
  switch (t) {
    case 'success':
      message.success(s);
      break;
    case 'info':
      message.info(s);
      break;
    case 'warning':
      message.warning(s);
      break;
    case 'error':
      message.error(s);
      break;
    default:
      message.info(s);
      break;
  }
};

function WangEditor({ defaultHtml, disabled, onChange }) {
  const [editor, setEditor] = useState(null); // 存储 editor 实例
  disabled && editor && editor.disable();

  const toolbarConfig = {};
  const editorConfig = {
    customAlert,
    placeholder: '请输入内容...',
    onCreated(editor) {
      setEditor(editor);
    }, // 记录下 editor 实例，重要！
    onChange(editor) {
      // console.log(editor.children);
      onChange && onChange(editor.getHtml());
    }
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor === null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: '1px solid #ccc' }}
      />
      <Editor
        defaultConfig={editorConfig}
        defaultHtml={defaultHtml}
        mode="default"
        style={{ height: '500px', overflowY: 'hidden' }}
      />
    </div>
  );
}

export default WangEditor;
