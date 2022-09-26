import React, { Fragment, useCallback, useState, useMemo } from 'react';
import { format } from 'date-fns';
import { GetServerSideProps } from 'next';
import { isNull } from 'lodash';
import classNames from 'classnames';
import {
  drive_v3 // For every service client, there is an exported namespace
} from 'googleapis';
// import Link from 'next/link';
import Drawer from '../../components/Drawer';
import styles from '../../components/grid.module.scss';
import buttonStyles from '../../components/button.module.scss';
import Layout from '../../components/Layout';
import { getDrive } from '../../services/drive';
import { getDriveFile, getModelList } from '../../services/db';
import { getDuration } from '../../utils';
import handleResponse from '../../utils/handleResponse';

type GDriveApiBase = Required<
  Pick<drive_v3.Schema$File, 'kind' | 'id' | 'name' | 'createdTime' | 'mimeType' | 'webViewLink'>
>;

type GDriveApiOptional = Pick<
  drive_v3.Schema$File,
  | 'parents'
  | 'spaces'
  | 'imageMediaMetadata'
  | 'webContentLink'
  | 'thumbnailLink'
  | 'videoMediaMetadata'
  | 'viewedByMeTime'
>;

type GoogleDriveAPIResponse = GDriveApiBase & GDriveApiOptional;
interface Contact {
  createdOn: string;
  driveIds: Array<string>;
  id: number;
  name: string;
  platform: string;
}

type DBData = {
  id: string;
  driveId: string;
  name: string;
  type: string;
  webViewLink: string;
  webContentLink?: string;
  thumbnailLink?: string;
  createdTime: string;
  lastViewed?: string | null;
  createdOn: string;
  duration?: number;
  modelId: Array<number>;
};
type MergedData = GDriveApiBase &
  GDriveApiOptional &
  DBData & {
    [key: string]:
      | string
      | number
      | Array<string>
      | Array<number>
      | GDriveApiOptional['imageMediaMetadata']
      | GDriveApiOptional['videoMediaMetadata']
      | null;
  };

const getImageLink = (link = '', endStr = 's220', split = 's220') => {
  const [base] = link.split(split);
  return `${base}${endStr}`;
};

interface IAddModel extends DBData {
  modelList: Array<Contact>;
}
const AddModel = (props: IAddModel) => {
  const [modelId, setModelIds] = useState(props.modelId);
  const [driveIds, setDriveIds] = useState(props.modelList.find(m => modelId.indexOf(m.id) > -1)?.driveIds || []);
  const [showButton, toggleButton] = useState(modelId.length === 0);
  const [modelName, setModelName] = useState(props.modelList.find(m => modelId.indexOf(m.id) > -1)?.name || '');
  const handleUpdateModel = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newModelId = parseInt(e.target.value);
      if (parseInt(e.target.value) === 0) {
        return;
      }
      const modelResponse = await fetch(`/api/model/${newModelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(['drive_ids', [...driveIds, props.id], newModelId])
      });
      const driveResponse = await fetch(`/api/drive/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(['model_id', [newModelId], props.id])
      });
      Promise.all([modelResponse, driveResponse]).then(values => {
        console.log('successful values: ', values);
        toggleButton(false);
        setDriveIds(arr => [...arr, props.id]);
        setModelName(props.modelList.find(m => newModelId === m.id)?.name);
        setModelIds([...modelId, newModelId]);
      });
      // return response.ok ? await response.text() : `Error: ${response.text()}`;
    },
    [driveIds]
  );
  const handleAdd = useCallback(
    (_: React.PointerEvent<HTMLButtonElement>) => {
      toggleButton(!showButton);
    },
    [showButton]
  );
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
      }}
    >
      {modelId.length === 0 ? (
        showButton ? (
          <button className={classNames(buttonStyles.button, buttonStyles.primary)} onClick={handleAdd}>
            <span>Add Model</span>
          </button>
        ) : (
          <Fragment>
            <label htmlFor="model-list-input">
              <strong>{`${props.modelId.length === 0 ? 'Add ' : ''}Model`}</strong>:&nbsp;
              <input list="model-list" id="model-list-input" name="model-input" onChange={handleUpdateModel} />
            </label>
            <datalist id="model-list">
              <option key={0} value={0}>
                New Model
              </option>
              {props.modelList.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </datalist>
          </Fragment>
        )
      ) : (
        <p>{modelName}</p>
      )}
    </div>
  );
};

const getDriveFromApi = async () => {
  const response = await getDrive();
  const data = (await handleResponse(response)) as { files: Array<GoogleDriveAPIResponse>; nextPageToken: string };
  const { data: dbData } = await getDriveFile();
  const { data: modelList } = await getModelList();
  const files: Array<MergedData> = data.files.map((f: GoogleDriveAPIResponse) => {
    // return f;
    const dbFile = dbData.find((d: DBData) => d.id === f.id) as DBData;
    return typeof dbFile === 'undefined'
      ? {
          ...f,
          id: f.id,
          name: f.name,
          driveId: f.id,
          modelId: [],
          createdOn: format(new Date(), 'MM/dd/yyyy'),
          createdTime: format(new Date(f.createdTime), 'MM/dd/yyyy'),
          lastViewed:
            f.viewedByMeTime && !isNull(f.viewedByMeTime) ? format(new Date(f.viewedByMeTime), 'MM/dd/yyyy') : null,
          duration: null,
          type: f.mimeType
        }
      : {
          ...f,
          ...dbFile,
          createdTime: format(new Date(dbFile.createdTime), 'MM/dd/yyyy'),
          modelId: isNull(dbFile.modelId) ? [] : dbFile.modelId
        };
  });
  return {
    dbData,
    data: files,
    modelList,
    nextPage: data.nextPageToken
  };
};

export const getServerSideProps: GetServerSideProps = async () => {
  const props = await getDriveFromApi();
  return {
    props
  };
};

enum SortOptions {
  'createdTime',
  'lastViewed'
}

type SortOptionKeys = keyof typeof SortOptions;
const Drive = (props: {
  data: Array<MergedData>;
  dbData: Array<DBData>;
  nextPage: string;
  modelList: Array<Contact>;
}) => {
  const [data, setData] = useState(props.data);
  const [nextPage, updateToken] = useState(props.nextPage);
  const [sortDir, sortBy] = useState('createdTime-desc');
  const handleGetMore = useCallback(async () => {
    const response = await fetch(`http://localhost:9000/api/drive-list?nextPage=${nextPage}`);
    const { files, nextPageToken }: drive_v3.Schema$FileList = await response.json();
    const newData: Array<MergedData> = files.map((f: GoogleDriveAPIResponse) => {
      // return f;
      const dbFile = props.dbData.find(d => d.id === f.id);
      return typeof dbFile === 'undefined'
        ? {
            ...f,
            modelId: [],
            id: f.id,
            name: f.name,
            driveId: f.id,
            createdTime: format(new Date(f.createdTime), 'MM/dd/yyyy'),
            createdOn: format(new Date(), 'MM/dd/yyyy'),
            lastViewed:
              f.viewedByMeTime && !isNull(f.viewedByMeTime) ? format(new Date(f.viewedByMeTime), 'MM/dd/yyyy') : null,
            duration: null,
            type: f.mimeType
          }
        : {
            ...f,
            ...dbFile,
            createdTime: format(new Date(dbFile.createdTime), 'MM/dd/yyyy'),

            modelId: isNull(dbFile.modelId) ? [] : dbFile.modelId
          };
    });
    console.log('newData: ', newData);
    setData(curr => curr.concat(newData));
    updateToken(nextPageToken);
  }, []);
  const handleSort = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => (e.target.value !== sortDir ? sortBy(e.target.value) : null),
    []
  );
  const sortedData = useMemo(() => {
    data.sort((a, b): number => {
      const [key, dir]: Array<SortOptionKeys | string> = sortDir.split('-');
      if (key === 'duration') {
        if (a.videoMediaMetadata && b.videoMediaMetadata) {
          return dir === 'desc'
            ? parseInt(b.videoMediaMetadata.durationMillis) - parseInt(a.videoMediaMetadata.durationMillis)
            : parseInt(a.videoMediaMetadata.durationMillis) - parseInt(b.videoMediaMetadata.durationMillis);
        }
        if (a.videoMediaMetadata && !b.videoMediaMetadata) {
          return -1;
        }
        if (b.videoMediaMetadata && !a.videoMediaMetadata) {
          return 1;
        }
        return 0;
      }
      if (key === 'lastViewed' || key === 'createdTime') {
        if (dir === 'desc') {
          return new Date(b[key]).getTime() - new Date(a[key]).getTime();
        }
        return new Date(a[key]).getTime() - new Date(b[key]).getTime();
      }
    });
    return data.filter(d => d.mimeType.startsWith('video') || d.mimeType.startsWith('image'));
  }, [data, sortDir]);
  return (
    <Layout title="Let's Drive | TKPremier">
      <h2>Welcome to the &#x1F608;</h2>
      <p>Here&apos;s what we&apos;ve been up to....</p>
      <fieldset className={styles.gridControls}>
        <button type="button" onClick={handleGetMore}>{`Get More ${data.length}`}</button>
        <select onChange={handleSort} defaultValue={sortDir}>
          <option value="">Choose Sort</option>
          <option value="createdTime-desc">Created - Latest</option>
          <option value="createdTime-asc">Created - Earliest</option>
          <option value="lastViewed-desc">Viewed - Latest</option>
          <option value="lastViewed-asc">Viewed - Earliest</option>
          <option value="duration-desc">Duration - Longest</option>
          <option value="duration-asc">Duration - shortest</option>
        </select>
      </fieldset>
      <ul className="root">
        <Drawer header="Catalogued" closed>
          <h3>Catalogued</h3>
          <ul className={styles.grid}>
            {sortedData
              .filter(drive => drive.modelId.length > 0)
              .map(drive => (
                <li className={styles.gridItem} key={drive.id}>
                  {/**
                   * https://stackoverflow.com/questions/30851685/google-drive-thumbnails-getting-403-rate-limit-exceeded
                   */}
                  {drive.thumbnailLink && !isNull(drive.thumbnailLink) ? (
                    <Fragment>
                      <a href={drive.webViewLink} target="_blank" rel="noreferrer nofollower">
                        <img
                          src={getImageLink(drive.thumbnailLink, 's330', 's220')}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          title={`${drive.name}`}
                        />
                      </a>
                      <p>
                        <strong>Id:</strong>&nbsp; {drive.id}
                      </p>
                    </Fragment>
                  ) : (
                    <p>
                      <strong>Id:</strong>&nbsp; {drive.id}
                    </p>
                  )}
                  <p>
                    <strong>{drive.name}</strong>
                    <br />
                    <strong>Uploaded on:</strong>&nbsp;{drive.createdTime}
                  </p>
                  {drive.mimeType.startsWith('video') || drive.mimeType.startsWith('image') ? (
                    <AddModel {...drive} modelList={props.modelList} />
                  ) : null}
                  <ul>
                    <Drawer header={drive.name} key={`${drive.id}-drawer`}>
                      <p>{drive.type}</p>
                      {!isNull(drive.lastViewed) ? (
                        <p>
                          <strong>Last viewed:</strong>&nbsp;{drive.lastViewed}
                        </p>
                      ) : (
                        drive.lastViewed
                      )}
                      {drive.videoMediaMetadata ? (
                        <p>
                          <strong>Duration: </strong>
                          {getDuration(parseInt(drive.videoMediaMetadata.durationMillis))}
                        </p>
                      ) : null}
                    </Drawer>
                  </ul>
                </li>
              ))}
          </ul>
        </Drawer>
      </ul>
      <ul className={styles.grid}>
        {sortedData
          .filter(drive => drive.modelId.length === 0)
          .map(drive => (
            <li className={styles.gridItem} key={drive.id}>
              {/**
               * https://stackoverflow.com/questions/30851685/google-drive-thumbnails-getting-403-rate-limit-exceeded
               */}
              {drive.thumbnailLink && !isNull(drive.thumbnailLink) ? (
                <Fragment>
                  <a href={drive.webViewLink} target="_blank" rel="noreferrer nofollower">
                    <img
                      src={getImageLink(drive.thumbnailLink, 's330', 's220')}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      title={`${drive.name}`}
                    />
                  </a>
                  <p>
                    <strong>Id:</strong>&nbsp; {drive.id}
                  </p>
                </Fragment>
              ) : (
                <p>
                  <strong>Id:</strong>&nbsp; {drive.id}
                </p>
              )}
              <p>
                <strong>{drive.name}</strong>
                <br />
                <strong>Uploaded on:</strong>&nbsp;{drive.createdTime}
              </p>
              {drive.mimeType.startsWith('video') || drive.mimeType.startsWith('image') ? (
                <AddModel {...drive} modelList={props.modelList} />
              ) : null}
              <ul>
                <Drawer header={drive.name} key={`${drive.id}-drawer`}>
                  <p>{drive.type}</p>
                  {!isNull(drive.lastViewed) ? (
                    <p>
                      <strong>Last viewed:</strong>&nbsp;{drive.lastViewed}
                    </p>
                  ) : (
                    drive.lastViewed
                  )}
                  {drive.videoMediaMetadata ? (
                    <p>
                      <strong>Duration: </strong>
                      {getDuration(parseInt(drive.videoMediaMetadata.durationMillis))}
                    </p>
                  ) : null}
                </Drawer>
              </ul>
            </li>
          ))}
      </ul>
    </Layout>
  );
};

export default Drive;
