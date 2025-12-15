'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../src/context/user';

export const UnauthenticatedFallback = ({ loginUrl = '/' }: { loginUrl: string }) => (
  <h1>
    <Link href={loginUrl}>Please login</Link>
  </h1>
);

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

  return <div>{user ? <h1>{user.name}</h1> : <UnauthenticatedFallback loginUrl={loginUrl} />}</div>;
};

export default Profile;
