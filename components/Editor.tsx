import { Editor as CKEditor } from 'ckeditor5';
import dynamic from 'next/dynamic';
import React from 'react';

export interface IEventInfo {
  name: string;
  path: Array<any>;
  source: any;
}

export interface EditorProps {
  id?: string;
  data: string;
  name: string;
  onChange: (eventInfo: IEventInfo, editor: CKEditor) => void;
}

const CKEditorComponent = dynamic(
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  () => Promise.resolve(require('./CKEditorComponent').CKEditorComponent),
  {
    ssr: false,
    loading: () => <textarea defaultValue="Loading editor..." />
  }
) as React.ComponentType<EditorProps>;

export const Editor = (props: EditorProps) => <CKEditorComponent {...props} />;
