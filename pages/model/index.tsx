import React from 'react';
import Link from 'next/link';
// import { format } from "date-fns";
// import { isNull } from "lodash";
// import Grid from "../../components/Grid";
import Layout from '../../components/Layout';
// import handleResponse from "../../utils/handleResponse";
import { getModelList } from '../../services/db';

const getModelFromDatabase = async () => {
  const { data } = await getModelList();
  return { data };
};

export async function getServerSideProps() {
  const props = await getModelFromDatabase();
  return {
    props
  };
}

interface Contact {
  createdOn: string;
  driveIds: Array<string>;
  id: number;
  name: string;
  platform: string;
}

const Contacts = (props: { data: Array<Contact> }): any => (
  <Layout title="My Contacts">
    <h2>Contacts</h2>
    <ul>
      {props.data.map(m => (
        <li key={m.id}>
          <Link href={`/model/${m.id}`}>{m.name}</Link>
        </li>
      ))}
    </ul>
  </Layout>
);

export default Contacts;
