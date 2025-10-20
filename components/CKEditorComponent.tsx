'use client';

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Essentials, Paragraph, Bold, Italic, Link } from 'ckeditor5';

export interface IEventInfo {
  name: string;
  path: Array<any>;
  source: any;
}

export interface EditorProps {
  data: string;
  name: string;
  onChange: (eventInfo: IEventInfo, editor: any) => any;
}

const CKEditorComponent = (props: EditorProps) => {
  const editorConfig = {
    licenseKey: 'GPL',
    plugins: [Essentials, Paragraph, Bold, Italic, Link],
    toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|', 'link'],
    initialData: props.data
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfig}
      data={props.data}
      onChange={(event, editor) => {
        props.onChange({ name: 'change', path: [], source: editor }, editor);
      }}
    />
  );
};

export default CKEditorComponent;
