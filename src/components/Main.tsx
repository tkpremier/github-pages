'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import { UserContext } from '../context/user';
import styles from '../styles/layout.module.scss';
import { UserContextType } from '../types';
import handleResponse from '../utils/handleResponse';

export const Main = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<UserContextType[0]>(undefined);

  useEffect(() => {
    const checkUser = async () => {
      const response = await handleResponse(
        await fetch(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/authentication`, {
          credentials: 'include'
        })
      );
      if (!(response instanceof Error)) {
        setUser({ ...response.user, isAdmin: response.isAdmin });
      }
    };
    checkUser();
  }, []);
  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className={styles.mainRoot}>{children}</div>
    </UserContext.Provider>
  );
};
