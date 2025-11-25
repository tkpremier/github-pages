'use client';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useContext, useState } from 'react';
import { UserContext } from '../../context/user';
import utilStyles from '../../styles/utils.module.scss';
import buttonStyles from '../button.module.scss';
import styles from './header.module.scss';

export const Header = () => {
  const [isOpen, toggleOffCanvas] = useState(false);
  const [user] = useContext(UserContext);
  const handleToggle = useCallback(() => {
    toggleOffCanvas(open => !open);
  }, [isOpen]);

  return (
    <>
      <header
        className={styles.header}
        // onMouseLeave={handleMouseLeaveHeader}
      >
        <nav className={styles.headerNav}>
          <ul className={styles.headerWrapper}>
            {/**
             * Off Canvas Menu
             */}
            {/**
             *  1) Hamburger Button
             *  2) Name
             *  3) Menu
             */}
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
            <li className={styles.headerNavItem}>
              <Link href={`${process.env.NEXT_PUBLIC_CLIENTURL}/logout`}>Logout</Link>
            </li>
            <li className={styles.headerNavItem}>
              <Link href={`${process.env.NEXT_PUBLIC_CLIENTURL}/login`}>Login</Link>
            </li>
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
                <Image
                  alt="TK Premier Update"
                  className={classNames(utilStyles.borderCircle, styles.headerNavItemLogoImage, buttonStyles.cardItem)}
                  height={48}
                  priority={false}
                  src="/images/headshot_48px.jpg"
                  width={48}
                />
              </button>
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
        </ul>
      </nav>
    </>
  );
};
