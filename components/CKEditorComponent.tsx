'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Bold, ClassicEditor, Essentials, Italic, Link, Paragraph } from 'ckeditor5';
import 'react';

export interface IEventInfo {
  name: string;
  path: Array<any>;
  source: any;
}

export interface EditorProps {
  id?: string;
  data: string;
  name: string;
  onChange: (eventInfo: IEventInfo, editor: any) => any;
}

export const CKEditorComponent = (props: EditorProps) => {
  const editorConfig = {
    licenseKey: 'GPL',
    plugins: [Essentials, Paragraph, Bold, Italic, Link],
    toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|', 'link'],
    initialData: props.data
  };

  return (
    <CKEditor
      id={props.id}
      editor={ClassicEditor}
      config={editorConfig}
      data={props.data}
      onChange={(event, editor) => {
        props.onChange({ name: 'change', path: [], source: editor }, editor);
      }}
    />
  );
};
