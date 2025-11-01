'use client';
import { format } from 'date-fns';
import { drive_v3 } from 'googleapis';
import { isNull } from 'lodash';
import Image from 'next/image';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Drawer } from '../../src/components/Drawer';
import AddDrive from '../../src/components/drive/add';
import styles from '../../src/styles/grid.module.scss';
import { GDriveApiBase, GDriveApiOptional, GoogleDriveAPIResponse } from '../../src/types';
import { formatBytes, getDuration } from '../../src/utils';
import handleResponse from '../../src/utils/handleResponse';

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

const getDriveFromApi = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVERURL}/api/drive-google`);
  const data: Awaited<{ files: Array<GoogleDriveAPIResponse>; nextPageToken: string }> = await handleResponse(response);

  const files: Array<MergedData> = data.files
    .filter(
      (f: GoogleDriveAPIResponse) =>
        f.id != null && f.name != null && f.mimeType != null && f.webViewLink != null && f.createdTime != null
    )
    .map((f: GoogleDriveAPIResponse) => {
      return {
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
      } as unknown as MergedData;
    });
  console.log('data', data);
  return {
    data: files,
    nextPage: data.nextPageToken
  };
};

enum SortOptions {
  'createdTime',
  'lastViewed'
}

type SortOptionKeys = keyof typeof SortOptions;

interface DriveData {
  data: Array<MergedData>;
  nextPage: string;
}

const Drive = () => {
  const [data, setData] = useState<DriveData>({ data: [], nextPage: '' });
  const [sortDir, sortBy] = useState('createdTime-desc');
  useEffect(() => {
    getDriveFromApi().then(data => {
      console.log(data);
      setData(data);
    });
  }, []);
  const handleGetMore = useCallback(async () => {
    if (data.nextPage === '') return;
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVERURL}/api/drive-google?nextPage=${data.nextPage}`);
    const { files, nextPageToken }: drive_v3.Schema$FileList = await response.json();
    const newData: Array<MergedData> =
      files?.map((f: GoogleDriveAPIResponse) => {
        // return f;
        return {
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
        } as unknown as MergedData;
      }) ?? [];
    setData({ data: newData, nextPage: nextPageToken ?? '' });
  }, [data.nextPage]);
  const handleSort = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => (e.target.value !== sortDir ? sortBy(e.target.value) : null),
    []
  );
  const sortedData = useMemo(() => {
    data.data.sort((a, b): number => {
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
    return data.data.filter(d => d?.mimeType?.startsWith('video') || d?.mimeType?.startsWith('image'));
  }, [data, sortDir]);
  return (
    <>
      <title>Let's Drive | TKPremier</title>
      <h2>Welcome to the &#x1F608;</h2>
      <p>Here&apos;s what we&apos;ve been up to....</p>
      <fieldset className={styles.gridControls}>
        <button type="button" onClick={handleGetMore}>{`Get More ${data.data.length}`}</button>
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
