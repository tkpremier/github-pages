import React, { forwardRef } from 'react';
import isNull from 'lodash';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';

const Editor = props => <CKEditor editor={InlineEditor} data={props.data} name={props.name} onBlur={props.onChange} />;

export default Editor;
