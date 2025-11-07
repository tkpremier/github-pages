'use client';
import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../../src/context/user';

const Profile = () => {
  const [user] = useContext(UserContext);
  return user ? (
    <div>
      <h1>{user.name}</h1>
    </div>
  ) : (
    <div>
      <h1>
        <Link href={`${process.env.NEXT_PUBLIC_SERVERURL}/login`}>Please login</Link>
      </h1>
    </div>
  );
};

export default Profile;
