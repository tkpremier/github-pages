'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import { DriveProvider } from '../context/drive';
import { ModelProvider } from '../context/model';
import { UserContext } from '../context/user';
import styles from '../styles/layout.module.scss';
import { User } from '../types';

export const Main = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User>(undefined);

  useEffect(() => {
    const checkUser = async () => {
      const response = await (
        await fetch(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/authentication`, {
          credentials: 'include'
        })
      ).json();
      setUser(response.user);
    };
    checkUser();
  }, []);
  return (
    <UserContext.Provider value={[user, setUser]}>
      <DriveProvider>
        <ModelProvider>
          <div className={styles.mainRoot}>{children}</div>
        </ModelProvider>
      </DriveProvider>
    </UserContext.Provider>
  );
};
