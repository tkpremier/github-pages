'use client';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useContext, useMemo, useState } from 'react';
import { UserContext } from '../context/user';
import buttonStyles from '../styles/button.module.scss';
import styles from '../styles/header.module.scss';
import utilStyles from '../styles/utils.module.scss';

export const Header = () => {
  const [isOpen, toggleOffCanvas] = useState(false);
  const [user] = useContext(UserContext);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Construct the current URL for redirect
  const currentUrl = useMemo(() => {
    return pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
  }, [pathname, searchParams]);

  const loginUrl = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_CLIENTURL}/login${
      currentUrl ? `?returnTo=${encodeURIComponent(currentUrl)}` : ''
    }`;
  }, [currentUrl]);

  const handleToggle = useCallback(() => {
    toggleOffCanvas(open => !open);
  }, []);

  return (
    <Suspense fallback={<header className={styles.header}>Header Loading...</header>}>
      <header
        className={styles.header}
        // onMouseLeave={handleMouseLeaveHeader}
      >
        <nav className={styles.headerNav}>
          <ul className={styles.headerWrapper}>
            <li className={classNames(styles.headerNavItem, styles.headerNavItemMenu)}>
              <button onClick={handleToggle} className={styles.hamBurger} type="button" aria-label="Toggle Button">
                <img src="/images/hamburger.svg" width={36} height={36} alt="Hamburger" />
              </button>
            </li>
            <li className={classNames(styles.headerNavItem, styles.headerNavItemName)}>
              <Link href="/">
                <h2 className={styles.logo}>TK Premier</h2>
              </Link>
            </li>
            <li className={styles.headerNavItem}>
              <Link href="/about">About</Link>
            </li>
            <li className={styles.headerNavItem}>
              <Link href="/learn">Learn</Link>
            </li>
            <li className={styles.headerNavItem}>
              <Link href="/interview">Interviews</Link>
            </li>
            {user ? (
              <li className={styles.headerNavItem}>
                <Link href={`${process.env.NEXT_PUBLIC_CLIENTURL}/logout`}>Logout</Link>
              </li>
            ) : (
              <li className={styles.headerNavItem}>
                <Link href={loginUrl}>Login</Link>
              </li>
            )}
            <li className={classNames(styles.headerNavItem, styles.headerNavItemLogo)}>
              <button
                className={classNames(buttonStyles.card, { [buttonStyles.cardIsFlipped]: isOpen })}
                onClick={handleToggle}
              >
                <Image
                  alt="Close button"
                  className={classNames(utilStyles.iconBorderCircle, buttonStyles.cardItem, buttonStyles.cardItemBack)}
                  height={36}
                  priority={false}
                  width={36}
                  src="/images/close_36.svg"
                />
              </button>
            </li>
            <li className={styles.headerNavItem}>
              <Link href="/profile">
                <Image
                  alt="TK Premier Update"
                  className={classNames(utilStyles.borderCircle, styles.headerNavItemLogoImage, buttonStyles.cardItem)}
                  height={48}
                  priority={false}
                  src="/images/headshot_48px.jpg"
                  width={48}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <nav
        className={classNames(styles.offCanvasNavWrapper, {
          [styles.offCanvasNavWrapperIsActive]: isOpen
        })}
      >
        <ul
          className={classNames(styles.offCanvasNav, {
            [styles.offCanvasNavIsActive]: isOpen
          })}
        >
          <li className={styles.offCanvasNavItem}>
            <Link href="/about">About</Link>
          </li>
          <li className={styles.offCanvasNavItem}>
            <Link href="/learn">Learn</Link>
          </li>
          <li className={styles.offCanvasNavItem}>
            <Link href="/interview">Interviews</Link>
          </li>
          {user ? (
            <li className={styles.offCanvasNavItem}>
              <Link href={`${process.env.NEXT_PUBLIC_CLIENTURL}/logout`}>Logout</Link>
            </li>
          ) : (
            <li className={styles.offCanvasNavItem}>
              <Link href={loginUrl}>Login</Link>
            </li>
          )}
          <li className={styles.offCanvasNavItem}>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </Suspense>
  );
};
