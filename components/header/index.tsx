import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './header.module.scss';
import buttonStyles from '../button.module.scss';
import utilStyles from '../../styles/utils.module.scss';

const Header = () => {
  const [isOpen, toggleOffCanvas] = useState(false);
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
                <a>
                  <h2 className={styles.logo}>TK Premier</h2>
                </a>
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
            <li className={classNames(styles.headerNavItem, styles.headerNavItemLogo)}>
              <button
                className={classNames(buttonStyles.card, { [buttonStyles.cardIsFlipped]: isOpen })}
                onClick={handleToggle}
              >
                <img
                  className={classNames(utilStyles.iconBorderCircle, buttonStyles.cardItem, buttonStyles.cardItemBack)}
                  src="/images/close_36.svg"
                  alt="Close button"
                />
                <img
                  src="/images/headshot_48px.jpg"
                  srcSet="/images/headshot_96px.jpg 2x"
                  className={classNames(utilStyles.borderCircle, styles.headerNavItemLogoImage, buttonStyles.cardItem)}
                  alt="TK Premier Update"
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
        </ul>
      </nav>
    </>
  );
};

export default Header;
