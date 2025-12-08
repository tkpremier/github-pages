import { createContext, Dispatch, SetStateAction } from 'react';
import { User } from '../types';

export const UserContext = createContext<[User, Dispatch<SetStateAction<User>>]>([undefined, () => {}]);
