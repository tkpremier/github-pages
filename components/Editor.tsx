import React from 'react';
import useCkEditor from "../hooks/useCkEditor";

export interface IEventInfo {
  name: string;
  path: Array<any>;
  source: any;
}

interface EditorProps {
  data: string;
  name: string;
  onChange: (eventInfo: IEventInfo, editor: any) => any;
}

const Editor = (props: EditorProps) => {
  const {
    isEditorLoaded,
    CKEditor,
    InlineEditor
  } = useCkEditor();
  return isEditorLoaded
    ? <CKEditor editor={InlineEditor} data={props.data} name={props.name} onBlur={props.onChange} />
    : <div>Editor loading</div>
};

export default Editor;
