import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { isNull } from 'lodash';
import { format, millisecondsToHours, millisecondsToMinutes, endOfSecond } from 'date-fns';
import Drawer from './Drawer';
import styles from './grid.module.scss';

const getImageLink = (link = '', endStr = 's220', split = 's220') => {
  const [base] = link.split(split);
  return `${base}${endStr}`;
};

const getDuration = milliseconds => {
  let remainder = new Number(milliseconds);
  const hour = millisecondsToHours(parseInt(milliseconds, 10));
  const hours = hour * 60 * 60 * 1000;
  const min = millisecondsToMinutes(parseInt(milliseconds - hours, 10));
  remainder = (remainder - min * 60 * 1000) / 1000;
  const duration = `${hour > 0 ? `0${hour} hours, ` : ''}${min} minutes,${Math.ceil(remainder / 100)} seconds`;
  return duration;
};

const Grid = props => {
  const increment = 300;
  const [{ list, nextPage, sortBy, end }, setState] = useState({
    list: props.data,
    nextPage: props.nextPage,
    sortBy: 'createdTime-desc',
    end: increment - 1
  });
  const handleSort = e => {
    if (e.target.value.length > 0) {
      setState({
        sortBy: e.target.value,
        list,
        nextPage,
        end
      });
    }
  };

  const handleGetMoreFromDb = () => {
    setState({
      list,
      nextPage,
      sortBy,
      end: end + increment > list.length ? list.length - 1 : end + increment
    });
  };
  return (
    <Fragment>
      <fieldset className={styles.gridControls}>
        <button type="button" onClick={handleGetMoreFromDb}>{`Get More : ${list.slice(0, end).length}`}</button>
        <select defaultValue={sortBy} onChange={handleSort}>
          <option value="">Choose Sort</option>
          <option value="createdTime-desc">Created - Latest</option>
          <option value="createdTime-asc">Created - Earliest</option>
          <option value="lastViewed-desc">Viewed - Latest</option>
          <option value="lastViewed-asc">Viewed - Earliest</option>
          <option value="duration-desc">Duration - Longest</option>
          <option value="duration-asc">Duration - shortest</option>
        </select>
      </fieldset>
      <ul className={styles.grid}>
        {list.slice(0, end).map(drive => (
          <li className={styles.gridItem} key={drive.id}>
            {/**
             * https://stackoverflow.com/questions/30851685/google-drive-thumbnails-getting-403-rate-limit-exceeded
             */}
            {drive.thumbnailLink ? (
              <Fragment>
                <a href={drive.webViewLink} target="_blank" rel="noreferrer nofollower">
                  <img
                    src={getImageLink(drive.thumbnailLink, 's330', 's220')}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </a>
                <p>
                  <strong>Id:</strong>&nbsp; {drive.id}
                </p>
              </Fragment>
            ) : (
              <img src="/mstile-150x150.png" alt="Place holder" />
            )}
            <p>
              <strong>{drive.name}</strong>
              <br />
              <strong>Uploaded on:</strong>&nbsp;{format(new Date(drive.createdTime), "MM/dd/yyyy' 'HH:mm:ss")}
            </p>
            <p>
              <strong>{drive.name}</strong>
              <br />
              <strong>Uploaded on:</strong>&nbsp;{format(new Date(drive.createdTime), "MM/dd/yyyy' 'HH:mm:ss")}
            </p>
            <ul>
              <Drawer header={drive.name} key={`${drive.id}-drawer`}>
                <p>{drive.mimeType}</p>
                <p>
                  <strong>Last viewed:</strong>&nbsp;
                  {drive.lastViewed || 'Never'}
                </p>
                {drive.duration ? (
                  <p>
                    <strong>Duration: </strong>
                    {getDuration(drive.duration)}
                  </p>
                ) : null}
              </Drawer>
            </ul>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Grid;
