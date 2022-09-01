import React from 'react';
import useCkEditor from '../hooks/useCkEditor';

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
export const EditorContext = () => {
  const { isEditorLoaded, CKEditor, CKEditorContext, InlineEditor } = useCkEditor();
  return isEditorLoaded ? CKEditorContext : 'div';
};

const Editor = (props: EditorProps) => {
  const { isEditorLoaded, CKEditor, CKEditorContext, InlineEditor } = useCkEditor();
  // return {
  //   Editor: isEditorLoaded ? (
  //     <CKEditor editor={InlineEditor} data={props.data} name={props.name} onBlur={props.onChange} />
  //   ) : (
  //     <textarea name={props.name}>Editor loading</textarea>
  //   ),
  //   CKEditorContext
  // };
  return isEditorLoaded ? (
    <CKEditor editor={InlineEditor} data={props.data} name={props.name} onBlur={props.onChange} />
  ) : (
    <textarea name={props.name} defaultValue="Editor loading" />
  );
};

export default Editor;
