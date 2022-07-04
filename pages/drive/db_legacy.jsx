import React from "react";
import { format } from "date-fns";
import { isNull } from "lodash";
import Grid from "../../components/Grid";
import Layout from "../../components/layout";
// import { getDrive } from "../../services/drive";
import { getDriveFile } from "../../services/db";

const getDriveFromDatabase = async () => {
  const { data } = await getDriveFile();
  return { data };
};

const getDriveFromApi = async () => {
  const data = await getDrive();
  return {
    data: data.files,
    nextPage: data.nextPageToken
  };
};

export async function getServerSideProps() {
  const props = await getDriveFromDatabase();
  // const props = await getDriveFromApi();
  return {
    props
  };
}

const Drive = props => {
  return (
    <Layout drive>
      <h2>Welcome to the &#x1F608;</h2>
      <p>Here's what we've been up to....</p>
      <Grid data={props.data} nextPage={props.nextPage} />
    </Layout>
  );
};

export default Drive;
