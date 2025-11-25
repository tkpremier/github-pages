'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Bold, ClassicEditor, Essentials, Italic, Link, List, Paragraph } from 'ckeditor5';
import 'react';
import { EditorProps } from '../types';

export const CKEditorComponent = (props: EditorProps) => {
  const editorConfig = {
    licenseKey: 'GPL',
    plugins: [Essentials, Paragraph, Bold, Italic, Link, List],
    toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|', 'link', '|', 'numberedList', 'bulletedList'],
    initialData: props.data
  };
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CKEditor
        id={props.id ?? ''}
        editor={ClassicEditor}
        config={editorConfig}
        data={props.data}
        onChange={(_event, editor) => {
          if (props.onChange) {
            props.onChange({ name: 'change', path: [], source: editor }, editor);
          }
        }}
      />
    </div>
  );
};
