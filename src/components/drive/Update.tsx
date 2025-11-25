'use client';
import { Editor as CKEditor } from 'ckeditor5';
import { EditorProps, IEventInfo } from '../../types';
import { Editor } from '../Editor';

export const HTMLEditor = (props: EditorProps) => {
  const handleChange = (eventInfo: IEventInfo, editor: CKEditor) => {
    if (props.onChange) {
      props.onChange(eventInfo, editor);
    }
  };
  // const [currDrive, setDriveFile] = useState(props);
  // const [currModel, setModel] = useState(
  //   props.modelList.find(m => m.driveIds.indexOf(props.id ?? '') > -1) || {
  //     createdOn: '',
  //     driveIds: [],
  //     id: 0,
  //     name: '',
  //     platform: ''
  //   }
  // );
  // const [showButton, toggleButton] = useState(currDrive.modelId.length === 0);
  // const handleUpdateModel = useCallback(
  //   async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const apiPromises: Response[] = [];
  //     // if driveId isn't in contact's driveIds, add contact api promise
  //     if (currModel.driveIds.indexOf(props.id ?? '') > -1) {
  //       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/model/${currModel.id}`, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json;charset=utf-8'
  //         },
  //         body: JSON.stringify(['drive_ids', [props.id ?? ''], currModel.id])
  //       });
  //       apiPromises.push(response);
  //     } else {
  //       console.log('drive already included for contact');
  //     }
  //     if (currDrive.modelId.indexOf(currModel.id) === -1) {
  //       const driveData = serialize(e.target as HTMLFormElement, { hash: true });
  //       const newModelIds = [...currDrive.modelId, currModel.id];
  //       const {
  //         id,
  //         createdTime,
  //         mimeType,
  //         name,
  //         webViewLink,
  //         webContentLink,
  //         thumbnailLink,
  //         videoMediaMetadata,
  //         viewedByMeTime
  //       } = currDrive;
  //       const newDriveData = {
  //         id,
  //         driveId: id,
  //         type:
  //           mimeType !== null && mimeType.toString().indexOf('image') > -1
  //             ? 'image'
  //             : mimeType !== null && mimeType?.toString().indexOf('video') > -1
  //             ? 'video'
  //             : 'folder',
  //         name: name ?? '',
  //         webViewLink,
  //         webContentLink,
  //         thumbnailLink,
  //         createdTime,
  //         viewedDate: viewedByMeTime || null,
  //         duration: videoMediaMetadata ? parseInt(videoMediaMetadata?.durationMillis ?? '0', 10) : null,
  //         modelId: newModelIds
  //       };
  //       apiPromises.push(
  //         await fetch('http://localhost:8000/api/drive-list', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json;charset=utf-8'
  //           },
  //           body: JSON.stringify(newDriveData)
  //         })
  //       );
  //     } else {
  //       console.log('contact already included in drive');
  //     }
  //     // const modelResponse =
  //     Promise.all(apiPromises)
  //       .then(handleResponses as (values: Response[]) => void)
  //       .then(values => {
  //         console.log('successful values: ', values);
  //         toggleButton(false);
  //         // setDriveIds(arr => [...arr, props.id]);
  //         // setModelName(props.modelList.find(m => newModelId === m.id)?.name);
  //         // setModelIds([...modelId, newModelId]);
  //       })
  //       .catch(err => {
  //         console.log('errors: ', err);
  //       });
  //     // return response.ok ? await response.text() : `Error: ${response.text()}`;
  //   },
  //   [currModel, currDrive]
  // );
  // const handleAdd = useCallback(
  //   (_: React.PointerEvent<HTMLButtonElement>) => {
  //     toggleButton(!showButton);
  //   },
  //   [showButton]
  // );
  // const handleUpdateId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newModel = props.modelList.find(m => m.id === parseInt(e.target.value, 10));
  //   if (newModel) {
  //     setModel(() => newModel);
  //   }
  // }, []);
  return (
    <Editor className="editor-container" id={props.name} data={props.data} name={props.name} onChange={handleChange} />
  );
};
