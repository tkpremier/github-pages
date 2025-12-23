'use client';
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react';
import { User } from '../types';
import handleResponse from '../utils/handleResponse';

export const UserContext = createContext<[User, Dispatch<SetStateAction<User>>]>([undefined, () => {}]);

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User>(undefined);

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
  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};
