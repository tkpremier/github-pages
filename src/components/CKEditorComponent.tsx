'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Bold, ClassicEditor, Essentials, Italic, Link, Paragraph } from 'ckeditor5';
import 'react';
import { EditorProps } from '../types';

export const CKEditorComponent = (props: EditorProps) => {
  const editorConfig = {
    licenseKey: 'GPL',
    plugins: [Essentials, Paragraph, Bold, Italic, Link],
    toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|', 'link'],
    initialData: props.data
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CKEditor
        id={props.id ?? ''}
        editor={ClassicEditor}
        config={editorConfig}
        data={props.data}
        onChange={(event, editor) => {
          props.onChange({ name: 'change', path: [], source: editor }, editor);
        }}
      />
    </div>
  );
};
