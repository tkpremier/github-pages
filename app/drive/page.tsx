'use client';
import { format } from 'date-fns';
import type { drive_v3 } from 'googleapis';
import isNull from 'lodash/isNull';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Drawer } from '../../src/components/Drawer';
import { DriveFileView } from '../../src/components/FileEditor';
import { Tags } from '../../src/components/drive/Tags';
import styles from '../../src/styles/grid.module.scss';
import { DriveData, GoogleDriveAPIResponse, MergedData, SortOptionKeys } from '../../src/types';
import { formatBytes, getDuration, getImageLink } from '../../src/utils';
import handleResponse from '../../src/utils/handleResponse';
import { extractHashtags } from '../../src/utils/hashTags';

const getDriveFromApi = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/drive-google`, {
      credentials: 'include'
    });
    const data: Awaited<{ files: Array<GoogleDriveAPIResponse>; nextPageToken: string }> = await handleResponse(
      response
    );
    const files: Array<MergedData> = data?.files
      .filter(
        (f: GoogleDriveAPIResponse) =>
          f.id != null && f.name != null && f.mimeType != null && f.webViewLink != null && f.createdTime != null
      )
      .map(f => {
        return {
          ...f,
          createdTime: format(new Date(f.createdTime as string), 'MM/dd/yyyy, h:mm a'),
          viewedByMeTime: f.viewedByMeTime ? format(new Date(f.viewedByMeTime), 'MM/dd/yyyy, h:mm a') : null
        } as unknown as MergedData;
      });
    return {
      files,
      nextPageToken: data.nextPageToken
    };
  } catch (error) {
    console.error('error: ', error);
    return { dbData: [], files: [], nextPageToken: '' };
  }
};

const Drive = () => {
  const [driveData, setDriveData] = useState<DriveData>({ files: [], nextPageToken: '' });
  const [sortDir, sortBy] = useState('createdTime-desc');
  const [selectedHashtags, setSelectedHashtags] = useState<Set<string>>(new Set());
  useEffect(() => {
    getDriveFromApi().then(data => {
      setDriveData(data);
    });
  }, []);
  const handleGetMore = useCallback(async () => {
    if (driveData.nextPageToken === '') return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENTURL}/api/drive-google?nextPage=${driveData.nextPageToken}`,
      {
        credentials: 'include'
      }
    );
    const { files, nextPageToken }: drive_v3.Schema$FileList = await response.json();
    const newData: Array<MergedData> =
      files?.map((f: GoogleDriveAPIResponse) => {
        return {
          ...f,
          ...(f.description && { description: f.description }),
          ...(f.size && { size: f.size }),
          ...(f.webContentLink != null && { webContentLink: f.webContentLink }),
          ...(f.thumbnailLink != null && { thumbnailLink: f.thumbnailLink }),
          id: f.id!,
          name: f.name!,
          driveId: f.id!,
          webViewLink: f.webViewLink!,
          modelId: [],
          createdTime: format(new Date(f.createdTime!), 'MM/dd/yyyy, h:mm a'),
          viewedByMeTime:
            f.viewedByMeTime && !isNull(f.viewedByMeTime)
              ? format(new Date(f.viewedByMeTime), 'MM/dd/yyyy, h:mm a')
              : null,
          type: f.mimeType!
        } as unknown as MergedData;
      }) ?? [];
    setDriveData(state => ({ ...state, files: state.files.concat(newData), nextPageToken: nextPageToken ?? '' }));
  }, [driveData.files, driveData.nextPageToken]);
  const handleSort = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => (e.target.value !== sortDir ? sortBy(e.target.value) : null),
    []
  );
  const sortedData = useMemo(() => {
    const filtered = driveData.files.filter(d => d?.mimeType?.startsWith('video') || d?.mimeType?.startsWith('image'));

    // Apply hashtag filter if any hashtags are selected
    const hashtagFiltered =
      selectedHashtags.size > 0
        ? filtered.filter(file => {
            const fileHashtags = extractHashtags(file.description);
            // Show file if it contains ANY of the selected hashtags
            return fileHashtags.some(tag => selectedHashtags.has(tag));
          })
        : filtered;

    hashtagFiltered.sort((a, b): number => {
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
      if (key === 'viewedByMeTime' || key === 'createdTime') {
        if (dir === 'desc') {
          return new Date(b[key] ?? '').getTime() - new Date(a[key] ?? '').getTime();
        }
        return new Date(a[key] ?? '').getTime() - new Date(b[key] ?? '').getTime();
      }
      return dir === 'desc' ? Number(b[key] ?? 0) - Number(a[key] ?? 0) : Number(a[key] ?? 0) - Number(b[key] ?? 0);
    });
    return hashtagFiltered;
  }, [driveData.files, sortDir, selectedHashtags]);

  const handleHashtagClick = useCallback((tag: string) => {
    setSelectedHashtags(prev => {
      if (tag === 'clear') {
        return new Set();
      }
      const newSet = new Set(prev);
      if (newSet.has(tag)) {
        newSet.delete(tag);
      } else {
        newSet.add(tag);
      }
      return newSet;
    });
  }, []);

  return (
    <>
      <h2>Welcome to the &#x1F608;</h2>
      <p>Here&apos;s what we&apos;ve been up to....</p>
      <Tags files={driveData.files} selectedHashtags={selectedHashtags} toggleHashtag={handleHashtagClick} />
      <fieldset className={styles.gridControls}>
        <button type="button" onClick={handleGetMore}>{`Get More ${driveData.files.length}`}</button>
        <select onChange={handleSort} defaultValue={sortDir}>
          <option value="">Choose Sort</option>
          <option value="createdTime-desc">Created - Latest</option>
          <option value="createdTime-asc">Created - Earliest</option>
          <option value="viewedByMeTime-desc">Viewed - Latest</option>
          <option value="viewedByMeTime-asc">Viewed - Earliest</option>
          <option value="duration-desc">Duration - Longest</option>
          <option value="duration-asc">Duration - shortest</option>
          <option value="size-desc">Size - Largest</option>
          <option value="size-asc">Size - Smallest</option>
        </select>
      </fieldset>
      <ul className={styles.grid}>
        {sortedData.map(drive => (
          <li className={styles.gridItem} key={drive.id}>
            {/**
             * https://stackoverflow.com/questions/30851685/google-drive-thumbnails-getting-403-rate-limit-exceeded
             */}
            <Fragment>
              <a href={drive.webViewLink} target="_blank" rel="noreferrer nofollower">
                {drive.thumbnailLink && !isNull(drive.thumbnailLink) ? (
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                    <Image
                      src={getImageLink(drive.thumbnailLink, 's640', 's220')}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      title={`${drive.name}`}
                      alt={`${drive.name} - Thumbnail`}
                      fill={true}
                      objectFit="cover"
                      placeholder="blur"
                      blurDataURL="/images/video_placeholder_165x103.svg"
                    />
                  </div>
                ) : (
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                    <Image
                      src="/images/video_placeholder_165x103.svg"
                      alt={`${drive.name} - Placeholder`}
                      fill={true}
                      objectFit="cover"
                    />
                  </div>
                )}
              </a>
              <p>
                <strong>Id:</strong>&nbsp; {drive.id}
                <br />
                {drive.description && <strong>{drive.description}</strong>}
                <br />
                <Link href={`/drive/${drive.id}`}>Go to File Page</Link>
                <br />
                <a href={drive.webViewLink}>Go to File</a>
              </p>
            </Fragment>
            <p>
              <strong>{drive.name}</strong>
              <br />
              <strong>Uploaded on:</strong>&nbsp;{drive.createdTime}
              <br />
              {!isNull(drive.viewedByMeTime) && (
                <>
                  <strong>Last viewed:</strong>&nbsp;{drive.viewedByMeTime}
                </>
              )}
            </p>

            <DriveFileView source="drive-google" file={drive} />
            <ul>
              <Drawer header={drive.name} key={`${drive.id}-drawer`}>
                <p>{drive.type}</p>
                {drive.videoMediaMetadata ? (
                  <p>
                    <strong>Duration: </strong>
                    {getDuration(parseInt(drive.videoMediaMetadata?.durationMillis ?? '0', 10))}
                  </p>
                ) : null}
                {drive.size && (
                  <p>
                    <strong>Size: </strong>
                    {formatBytes(drive?.size ?? 0)}
                  </p>
                )}
              </Drawer>
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Drive;
