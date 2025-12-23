'use client';
import { useContext } from 'react';
import { UserContext } from '../../../src/context/user';
export const AddForm = () => {
  const [user] = useContext(UserContext);
  if (!user?.isAdmin) {
    return null;
  }
  return (
    <form>
      <input type="text" name="name" placeholder="Name" />
      <input type="text" name="description" placeholder="Description" />
      <button type="submit">Add</button>
    </form>
  );
};
