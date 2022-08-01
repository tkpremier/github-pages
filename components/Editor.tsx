import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';

export interface IEventInfo {
  name: string;
  path: Array<any>;
  source: any;
}

interface EditorProps {
  data: string;
  name: string;
  onChange: (eventInfo: IEventInfo, editor: CKEditor) => any;
}

const Editor = (props: EditorProps) => (
  <CKEditor editor={InlineEditor} data={props.data} name={props.name} onBlur={props.onChange} />
);

export default Editor;
