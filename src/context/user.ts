import { createContext, Dispatch, SetStateAction } from 'react';

export type User =
  | {
      sid: string;
      email: string;
      email_verified: boolean;
      sub: string;
    }
  | undefined;

export const UserContext = createContext<[User, Dispatch<SetStateAction<User>>]>([undefined, () => {}]);
