'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFilterSidebar } from '../../hooks/filterSidebar';
import styles from '../../styles/filterSidebar.module.scss';

export const FilterSidebar = () => {
  const [mounted, setMounted] = useState(false);
  const { isOpen, toggleSidebar, closeSidebar, content, activeFilterCount } = useFilterSidebar();

  // Only mount on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (!mounted) return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, mounted]);

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) {
    return null;
  }

  return createPortal(
    <>
      {/* Floating Action Button */}
      <button
        type="button"
        className={styles.fabButton}
        onClick={toggleSidebar}
        aria-label="Toggle filters"
        title="Toggle filters"
      >
        <span className={styles.fabIcon}>🔍</span>
        {activeFilterCount > 0 && <span className={styles.fabBadge}>{activeFilterCount}</span>}
      </button>

      {/* Backdrop */}
      {isOpen && <div className={styles.backdrop} onClick={closeSidebar} aria-hidden="true" />}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Filters & Sort</h2>
          <button type="button" className={styles.closeButton} onClick={closeSidebar} aria-label="Close filters">
            ✕
          </button>
        </div>
        <div className={styles.sidebarContent}>{content}</div>
      </aside>
    </>,
    document.body
  );
};
