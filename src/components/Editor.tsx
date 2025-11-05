'use client';
import 'ckeditor5/ckeditor5.css';
import dynamic from 'next/dynamic';
import React from 'react';
import { EditorProps } from '../types';

const CKEditorComponent = dynamic(
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  () => Promise.resolve(require('./CKEditorComponent').CKEditorComponent),
  {
    ssr: false,
    loading: () => <textarea defaultValue="Loading editor..." />
  }
) as React.ComponentType<EditorProps>;

export const Editor = (props: EditorProps) => <CKEditorComponent {...props} />;
