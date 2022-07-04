import React, { Fragment } from "react";
import { format, millisecondsToHours, millisecondsToMinutes } from "date-fns";
import { isNull } from "lodash";
import Link from "next/link";
import Drawer from "../../components/Drawer";
import styles from "../../components/grid.module.scss";
import Layout from "../../components/layout";
import { getDrive } from "../../services/drive";
import { getDriveFile } from "../../services/db";

const getImageLink = (link = "", endStr = "s220", split = "s220") => {
  const [base] = link.split(split);
  return `${base}${endStr}`;
};
const getDuration = milliseconds => {
  let remainder = new Number(milliseconds);
  const hour = millisecondsToHours(parseInt(milliseconds, 10));
  const hours = hour * 60 * 60 * 1000;
  const min = millisecondsToMinutes(parseInt(milliseconds - hours, 10));
  remainder = (remainder - min * 60 * 1000) / 1000;
  const duration = `${hour > 0 ? `0${hour} hours, ` : ""}${min} minutes,${Math.ceil(remainder / 100)} seconds`;
  return duration;
};
const getDriveFromApi = async () => {
  const data = await getDrive();
  const { data: dbData } = await getDriveFile();
  const files = data.files.map(f => {
    // return f;
    const dbFile = dbData.find(d => d.id === f.id);
    return typeof dbFile === "undefined"
      ? f
      : {
          ...f,
          modelId: dbFile.modelId
        };
  });
  return {
    data: files,
    nextPage: data.nextPageToken
  };
};

export async function getServerSideProps() {
  const props = await getDriveFromApi();
  return {
    props
  };
}

const Drive = props => {
  const folders = props.data.filter(d => d.mimeType === "application/vnd.google-apps.folder");
  return (
    <Layout drive>
      <h2>Welcome to the &#x1F608;</h2>
      <p>Here's what we've been up to....</p>
      <ul className={styles.grid}>
        {props.data.map(drive => (
          <li className={styles.gridItem} key={drive.id}>
            {/**
             * https://stackoverflow.com/questions/30851685/google-drive-thumbnails-getting-403-rate-limit-exceeded
             */}
            {drive.thumbnailLink && !isNull(drive.thumbnailLink) ? (
              <Fragment>
                <a href={drive.webViewLink} target="_blank" rel="noreferrer nofollower">
                  <img
                    src={getImageLink(drive.thumbnailLink, "s330", "s220")}
                    referrerPolicy="no-referrer"
                    loading="lazy"
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
              <strong>Uploaded on:</strong>&nbsp;{format(new Date(drive.createdTime), "MM/dd/yyyy' 'HH:mm:ss")}
            </p>
            {drive.mimeType.startsWith("video") || drive.mimeType.startsWith("image") ? (
              <p>
                <strong>Model</strong>:&nbsp;
                {!isNull(drive.modelId) ? (
                  drive.modelId.map(n => (
                    <Link href={`/model/${n}`}>
                      <a>{n}</a>
                    </Link>
                  ))
                ) : (
                  <Link href={`/add?drive=${drive.id}`}>
                    <a>Add Model</a>
                  </Link>
                )}
              </p>
            ) : null}
            <ul>
              <Drawer header={drive.name} key={`${drive.id}-drawer`}>
                <p>{drive.mimeType}</p>
                <p>
                  <strong>Last viewed:</strong>&nbsp;
                  {drive.viewedByMeTime || "Never"}
                </p>
                {drive.videoMediaMetadata ? (
                  <p>
                    <strong>Duration: </strong>
                    {getDuration(drive.videoMediaMetadata.durationMillis)}
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
