import React, { useEffect, useState, createContext } from 'react';
import Layout, { MyContext } from '../components/layout';
import utilStyles from '../styles/utils.module.scss';

interface UserMessage {
  name: string;
  message: string;
}

const Message = (props: UserMessage): any => (
  <p>
    {props.name}, {props.message}
  </p>
);

export default function Home() {
  return (
    <Layout home title="Welcome to TK Premier">
      <h1 className="title">Thomas Kim</h1>
      <p className="description">This too shall pass.</p>
    </Layout>
  );
}
