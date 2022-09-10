import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './header.module.scss';
import utilStyles from '../../styles/utils.module.scss';

const Header = () => {
  const [isOpen, toggleOffCanvas] = useState('');
  return (
    <header
      className={styles.header}
      // onMouseLeave={handleMouseLeaveHeader}
    >
      <nav className={styles.offCanvasNav}>
        <ul className={styles.offCanvasNavWrapper}>
          <li className={styles.offCanvasNavItem}>
            <Link href="/about">
              <a>About TK the Dev</a>
            </Link>
          </li>
          <li className={styles.offCanvasNavItem}>
            <Link href="/learn">
              <a>My Learning</a>
            </Link>
          </li>
          <li className={styles.offCanvasNavItem}>
            <Link href="/interview">
              <a>My Interviews</a>
            </Link>
          </li>
        </ul>
      </nav>
      <nav className={styles.headerNav}>
        <ul className={styles.headerWrapper}>
          {/**
           * Off Canvas Menu
           */}
          {/**
           *  1) Hamburger Button
           *  2) Name
           *  3) Logo
           */}
          <li>
            <button className={styles.hamBurger} type="button">
              <img src="/images/menu-default-black.svg" alt="Hamburger" width="18" height="18" />
            </button>
          </li>
          <li className="header__item header__item--logo">
            <Link href="/">
              <a>
                <img
                  src="/images/fbprofile.jpg"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt="Logo"
                />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
