import React from 'react';
import dynamic from 'next/dynamic';

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

const CKEditorComponent = dynamic(
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  () => Promise.resolve(require('./CKEditorComponent').default),
  {
    ssr: false,
    loading: () => <textarea defaultValue="Loading editor..." />
  }
) as React.ComponentType<EditorProps>;

const Editor = (props: EditorProps) => <CKEditorComponent {...props} />;

export default Editor;
