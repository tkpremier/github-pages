import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './header.module.scss';
import utilStyles from '../../styles/utils.module.scss';

const Header = () => {
  const [isOpen, toggleOffCanvas] = useState(false);
  const handleToggle = e => {
    console.log('handleToggle ');
    toggleOffCanvas(!isOpen);
  };
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
            <li>
              <button onClick={handleToggle} className={styles.hamBurger} type="button" aria-label="Toggle Button">
                <svg width="18px" height="18px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="#bff3c7"
                    d="M17 5H1a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2zm0 5H1a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2zm0 5H1a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2z"
                  />
                </svg>
              </button>
            </li>
            <li className={styles.headerNavItemName}>
              <Link href="/">
                <a className={styles.logo}>TK Premier</a>
              </Link>
            </li>
            <li className={styles.headerNavItem}>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li className={styles.headerNavItem}>
              <Link href="/learn">
                <a>Learn</a>
              </Link>
            </li>
            <li className={styles.headerNavItem}>
              <Link href="/interview">
                <a>Interviews</a>
              </Link>
            </li>
            <li className={styles.headerNavItemLogo}>
              <img
                src="/images/fbprofile.jpg"
                className={classNames(utilStyles.borderCircle, styles.headerNavItemLogoImage)}
                alt="TK Premier Update"
              />
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
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li className={styles.offCanvasNavItem}>
            <Link href="/learn">
              <a>Learn</a>
            </Link>
          </li>
          <li className={styles.offCanvasNavItem}>
            <Link href="/interview">
              <a>Interviews</a>
            </Link>
          </li>
          <li className={classNames(styles.offCanvasNavItem, styles.offCanvasNavItemClose)}>
            <button onClick={handleToggle} className={styles.hamBurger} type="button" aria-label="Toggle Button">
              X
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
