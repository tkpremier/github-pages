'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../src/context/user';

const Profile = () => {
  const [user] = useContext(UserContext);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const loginUrl = useMemo(() => {
    const currentUrl = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    return `${process.env.NEXT_PUBLIC_CLIENTURL}/login${
      currentUrl ? `?returnTo=${encodeURIComponent(currentUrl)}` : ''
    }`;
  }, [pathname, searchParams]);

  return user ? (
    <div>
      <h1>{user.name}</h1>
    </div>
  ) : (
    <div>
      <h1>
        <Link href={loginUrl}>Please login</Link>
      </h1>
    </div>
  );
};

export default Profile;
