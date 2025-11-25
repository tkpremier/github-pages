'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import { User, UserContext } from '../context/user';
import styles from '../styles/layout.module.scss';

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
      <div className={styles.mainRoot}>{children}</div>
    </UserContext.Provider>
  );
};
