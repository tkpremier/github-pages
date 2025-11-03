'use client';
import { format } from 'date-fns';
import type { drive_v3 } from 'googleapis';
import isNull from 'lodash/isNull';
import Image from 'next/image';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Drawer } from '../../src/components/Drawer';
import AddDrive from '../../src/components/drive/add';
import styles from '../../src/styles/grid.module.scss';
import { DBData, DBDataResponse, DriveData, GoogleDriveAPIResponse, MergedData, SortOptionKeys } from '../../src/types';
import { formatBytes, getDuration, getImageLink } from '../../src/utils';
import handleResponse from '../../src/utils/handleResponse';

const getDriveFromApi = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVERURL}/api/drive-google`);
  const data: Awaited<{ files: Array<GoogleDriveAPIResponse>; nextPageToken: string }> = await handleResponse(response);
  const dbResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVERURL}/api/drive-list`);
  const dbData: Awaited<Promise<DBDataResponse>> = await handleResponse(dbResponse);
  console.log('dbData: ', dbData);
  const files: Array<MergedData> = data.files
    .filter(
      (f: GoogleDriveAPIResponse) =>
        f.id != null && f.name != null && f.mimeType != null && f.webViewLink != null && f.createdTime != null
    )
    .map((f: GoogleDriveAPIResponse) => {
      const dbFile = dbData.data.find((d: DBData) => d.id === f.id) as DBData;
      console.log('dbFile: ', dbFile);
      return typeof dbFile === 'undefined'
        ? ({
            ...f,
            ...(f.description && { description: f.description }),
            ...(f.size && { size: formatBytes(f.size) }),
            ...(f.webContentLink != null && { webContentLink: f.webContentLink }),
            ...(f.thumbnailLink != null && { thumbnailLink: f.thumbnailLink }),
            id: f.id!,
            name: f.name!,
            driveId: f.id!,
            webViewLink: f.webViewLink!,
            modelId: [],
            createdOn: format(new Date(), 'MM/dd/yyyy'),
            createdTime: format(new Date(f.createdTime!), 'MM/dd/yyyy'),
            lastViewed:
              f.viewedByMeTime && !isNull(f.viewedByMeTime) ? format(new Date(f.viewedByMeTime), 'MM/dd/yyyy') : null,
            type: f.mimeType!
          } as unknown as MergedData)
        : ({
            ...dbFile,
            ...f,
            id: dbFile.id,
            name: dbFile.name,
            driveId: dbFile.driveId,
            webViewLink: dbFile.webViewLink,
            modelId: dbFile.modelId,
            createdOn: dbFile.createdOn,
            createdTime: dbFile.createdTime,
            lastViewed: dbFile.lastViewed,
            type: dbFile.type
          } as unknown as MergedData);
    });
  return {
    dbData: dbData.data,
    files,
    nextPageToken: data.nextPageToken
  };
};

const Drive = () => {
  const [driveData, setDriveData] = useState<DriveData>({ dbData: [], files: [], nextPageToken: '' });
  const [sortDir, sortBy] = useState('createdTime-desc');
  useEffect(() => {
    getDriveFromApi().then(data => {
      setDriveData(data);
    });
  }, []);
  const handleGetMore = useCallback(async () => {
    if (driveData.nextPageToken === '') return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVERURL}/api/drive-google?nextPage=${driveData.nextPageToken}`
    );
    const { files, nextPageToken }: drive_v3.Schema$FileList = await response.json();
    const newData: Array<MergedData> =
      files?.map((f: GoogleDriveAPIResponse) => {
        const dbFile = driveData.dbData.find((d: DBData) => d.id === f.id) as DBData;

        return typeof dbFile === 'undefined'
          ? ({
              ...f,
              ...(f.description && { description: f.description }),
              ...(f.size && { size: formatBytes(f.size) }),
              ...(f.webContentLink != null && { webContentLink: f.webContentLink }),
              ...(f.thumbnailLink != null && { thumbnailLink: f.thumbnailLink }),
              id: f.id!,
              name: f.name!,
              driveId: f.id!,
              webViewLink: f.webViewLink!,
              modelId: [],
              createdOn: format(new Date(), 'MM/dd/yyyy'),
              createdTime: format(new Date(f.createdTime!), 'MM/dd/yyyy'),
              lastViewed:
                f.viewedByMeTime && !isNull(f.viewedByMeTime) ? format(new Date(f.viewedByMeTime), 'MM/dd/yyyy') : null,
              type: f.mimeType!
            } as unknown as MergedData)
          : ({
              ...dbFile,
              ...f,
              id: dbFile.id,
              name: dbFile.name,
              driveId: dbFile.driveId,
              webViewLink: dbFile.webViewLink,
              modelId: dbFile.modelId,
              createdOn: dbFile.createdOn,
              createdTime: dbFile.createdTime,
              lastViewed: dbFile.lastViewed,
              type: dbFile.type
            } as unknown as MergedData);
      }) ?? [];
    setDriveData(state => ({ ...state, files: newData, nextPageToken: nextPageToken ?? '' }));
  }, [driveData.dbData, driveData.files, driveData.nextPageToken]);
  const handleSort = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => (e.target.value !== sortDir ? sortBy(e.target.value) : null),
    []
  );
  const sortedData = useMemo(() => {
    driveData.files.sort((a, b): number => {
      const [key, dir]: Array<SortOptionKeys | string> = sortDir.split('-');
      if (key === 'duration') {
        if (a.videoMediaMetadata && b.videoMediaMetadata) {
          return dir === 'desc'
            ? parseInt(b.videoMediaMetadata?.durationMillis ?? '0', 10) -
                parseInt(a.videoMediaMetadata?.durationMillis ?? '0', 10)
            : parseInt(a.videoMediaMetadata?.durationMillis ?? '0', 10) -
                parseInt(b.videoMediaMetadata?.durationMillis ?? '0', 10);
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
          return new Date(b[key] ?? '').getTime() - new Date(a[key] ?? '').getTime();
        }
        return new Date(a[key] ?? '').getTime() - new Date(b[key] ?? '').getTime();
      }
      return 0;
    });
    return driveData.files.filter(d => d?.mimeType?.startsWith('video') || d?.mimeType?.startsWith('image'));
  }, [driveData.files, sortDir]);
  return (
    <>
      <h2>Welcome to the &#x1F608;</h2>
      <p>Here&apos;s what we&apos;ve been up to....</p>
      <fieldset className={styles.gridControls}>
        <button type="button" onClick={handleGetMore}>{`Get More ${driveData.files.length}`}</button>
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
                        {drive.webViewLink}
                      </a>
                      <p>
                        <strong>Id:</strong>&nbsp; {drive.id}
                      </p>
                    </Fragment>
                  ) : (
                    <p>
                      <strong>Id:</strong>&nbsp; {drive.id}
                      <a href={drive.webViewLink}>{drive.webViewLink}</a>
                    </p>
                  )}
                  <p>
                    <strong>{drive.name}</strong>
                    <br />
                    {drive.description && <strong>{drive.description}</strong>}
                    <br />
                    <strong>Uploaded on:</strong>&nbsp;{drive.createdTime}
                  </p>
                  {drive?.mimeType?.startsWith('video') || drive?.mimeType?.startsWith('image') ? <AddDrive /> : null}
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
                          {getDuration(parseInt(drive.videoMediaMetadata?.durationMillis ?? '0', 10))}
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
                    <br />
                    {drive.description && <strong>{drive.description}</strong>}
                    <br />
                    <a href={drive.webViewLink}>Go to File</a>
                  </p>
                </Fragment>
              ) : (
                <Fragment>
                  <a href="/model/" target="_blank" rel="noreferrer nofollower">
                    <Image
                      src="/images/video_placeholder_165x103.svg"
                      alt={`${drive.name} - Placeholder`}
                      width={300}
                      height={169}
                    />
                  </a>
                  <p>
                    <strong>Id:</strong>&nbsp; {drive.id}
                    <br />
                    {drive.description && <strong>{drive.description}</strong>}
                    <br />
                    <a href={drive.webViewLink}>Go to File</a>
                  </p>
                </Fragment>
              )}
              <p>
                <strong>{drive.name}</strong>
                <br />
                <strong>Uploaded on:</strong>&nbsp;{drive.createdTime}
              </p>
              {drive?.mimeType?.startsWith('video') || drive?.mimeType?.startsWith('image') ? <AddDrive /> : null}
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
                      {getDuration(parseInt(drive.videoMediaMetadata?.durationMillis ?? '0', 10))}
                    </p>
                  ) : null}
                </Drawer>
              </ul>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Drive;
