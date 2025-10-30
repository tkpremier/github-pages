'use client';
import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './drawer.module.scss';

interface DrawerProps {
  className?: string;
  closed?: boolean;
  header: string;
}

export const Drawer = (props: React.PropsWithChildren<DrawerProps>) => {
  const [closed, toggleEl] = useState(props.closed);
  const [maxHeight, setMaxHeight] = useState(props.closed ? 'none' : 'auto');
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMaxHeight(`${content.current?.scrollHeight}px`);
    }
  }, []);
  const handleToggle = useCallback(() => {
    toggleEl(!closed);
  }, [closed]);
  useEffect(() => {
    if (content.current?.scrollHeight !== parseInt(maxHeight, 10)) {
      setMaxHeight(`${content.current?.scrollHeight}px`);
    }
  });
  return (
    <li className={classNames(styles.expandable, { closed })}>
      <button
        className={classNames(
          styles.expandable__button,
          {
            [styles.expandable__button__closed]: closed
          },
          props.className
        )}
        aria-label="toggle-open-drawer"
        onClick={handleToggle}
        type="button"
        dangerouslySetInnerHTML={{
          __html: props.header
        }}
      />
      <section
        ref={content}
        className={classNames(styles.panel, { [styles.panel__closed]: closed })}
        style={{
          ...(!closed && { height: maxHeight })
        }}
      >
        {props.children}
      </section>
    </li>
  );
};
