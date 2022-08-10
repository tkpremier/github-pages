import React, { useRef, useState, useEffect } from 'react';
/* eslint-disable @typescript-eslint/no-var-requires */
// A custom React Hook for using CKEditor with SSR 
// particularly with NextJS.
// https://ckeditor.com | https://nextjs.org
// source: https://gist.github.com/arcdev1/aba0fcea9f618de42ca399e3266f42aa

export default function useCKEditor () {
  const editorRef = useRef(null);
  const [isEditorLoaded, setIsEditorLoaded] = useState(false)
  const { CKEditor, InlineEditor } = editorRef.current || {
      CKEditor: null,
      InlineEditor: null
  }

  useEffect(() => {
    editorRef.current = {
      // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
      InlineEditor: require('@ckeditor/ckeditor5-build-inline')
    }
    setIsEditorLoaded(true)
  }, [])

  return Object.freeze({
    isEditorLoaded,
    CKEditor,
    InlineEditor
  })
};