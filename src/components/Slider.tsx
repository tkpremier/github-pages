'use client';
import classNames from 'classnames';
import React, { Fragment, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import styles from '../styles/carousel.module.scss';
import { DEVICE_WIDTH_TYPES, ISlider, MediaQuery, Sizes, defaultSizes } from '../types';
const getMediaQueries = (): Map<DEVICE_WIDTH_TYPES, MediaQueryList> => {
  const sizeQueries = new Map([
    ['sm', '(max-width: 479px)'],
    ['md', '(min-width: 480px) and (max-width: 767px)'],
    ['lg', '(min-width: 768px) and (max-width: 1175px)'],
    ['xl', '(min-width: 1176px)']
  ]) as Map<DEVICE_WIDTH_TYPES, string>;
  const listenersMap = new Map();
  for (const [key, val] of sizeQueries) {
    listenersMap.set(key, window.matchMedia(val));
  }
  return listenersMap;
};

export const Slider = (props: PropsWithChildren<ISlider>) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timer>(null);
  const mqlRef = useRef<MediaQuery>(null);
  const sizes = props.sizes || defaultSizes;
  const sizesRef = useRef({
    xl: (sizes as Sizes).xl || sizes.md,
    sm: (sizes as Sizes).sm || 1,
    ...sizes
  });
  const [state, setState] = useState({
    animating: false,
    curIndex: 0,
    itemWidth: 278,
    itemsPerSlide: 1,
    nextDisabled: React.Children.count(props.children) < 2,
    prevDisabled: React.Children.count(props.children) < 2,
    wrapperWidth: 1200
  });
  useEffect(() => {
    if (carouselRef.current !== null) {
      let { itemsPerSlide } = state;
      if (typeof window !== 'undefined') {
        const mediaQueryResults = getMediaQueries();
        const enabledMQs: MediaQuery[] = [];
        for (const [key, mql] of mediaQueryResults) {
          // console.log(key);
          if (mql.matches) {
            enabledMQs.push({ itemsPerSlide: sizesRef.current[key], mql });
          }
        }
        if (enabledMQs.length > 0) {
          if (enabledMQs[enabledMQs.length - 1].itemsPerSlide !== itemsPerSlide) {
            mqlRef.current = enabledMQs.pop() || null;
            // console.log(mqlRef.current);
            itemsPerSlide = mqlRef.current?.itemsPerSlide || 1;
            if (mqlRef.current !== null) {
              mqlRef.current.mql.addEventListener('change', handleMql);
            }
          }
        }
      }
      const newItemWidth = Math.ceil(carouselRef.current.offsetWidth / itemsPerSlide);

      if (newItemWidth !== state.itemWidth) {
        setState({
          ...state,
          itemsPerSlide,
          itemWidth: newItemWidth,
          wrapperWidth: newItemWidth * (React.Children.count(props.children) + 2),
          prevDisabled: state.curIndex === 0,
          nextDisabled: state.curIndex === React.Children.count(props.children) - 1
        });
      }
    }
    if (props.autoplay) {
      setTimeout(() => {
        if (intervalRef.current === null) {
          intervalRef.current = setInterval(() => {
            const increment = 1;
            let newIndex = (state.curIndex += increment);
            if (newIndex === React.Children.count(props.children)) {
              return null;
            }
            setState({
              ...state,
              curIndex: newIndex === React.Children.count(props.children) ? 0 : newIndex,
              animating: true
            });
          }, props.interval);
        }
      }, props.interval);
    }
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      if (mqlRef.current !== null) {
        mqlRef.current.mql.removeEventListener('change', handleMql);
        mqlRef.current = null;
      }
    };
  }, []);
  const handleMql = useCallback(
    (e: MediaQueryListEvent) => {
      const mediaQueryResults = getMediaQueries();
      const enabledMQs: MediaQuery[] = [];
      for (const [key, mql] of mediaQueryResults) {
        if (mql.matches) {
          enabledMQs.push({ itemsPerSlide: sizesRef.current[key], mql });
        }
      }
      if (enabledMQs.length > 0) {
        if (enabledMQs[enabledMQs.length - 1].itemsPerSlide !== state.itemsPerSlide) {
          if (mqlRef.current && mqlRef.current.mql) {
            mqlRef.current.mql.removeEventListener('change', handleMql);
          }
          mqlRef.current = enabledMQs.pop() ?? null;
          const itemsPerSlide = mqlRef.current?.itemsPerSlide || state.itemsPerSlide;
          if (mqlRef.current !== null) {
            mqlRef.current.mql.addEventListener('change', handleMql);
            setState(prev => ({
              ...prev,
              itemsPerSlide,
              itemWidth: Math.ceil(carouselRef.current?.offsetWidth ?? 0 / itemsPerSlide)
            }));
          }
        }
      }
    },
    [state.itemsPerSlide, props.sizes]
  );
  const handleClick = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const int = parseInt(e.currentTarget.value, 10);
      if (
        (int === 1 && state.curIndex === React.Children.count(props.children)) ||
        (int === -1 && state.curIndex === -1)
      ) {
        return null;
      }
      setState(curr => ({
        ...curr,
        curIndex: curr.curIndex + int,
        animating: true
      }));
    },
    [state.curIndex]
  );
  const handleTransitionEnd = useCallback(() => {
    if (state.curIndex !== -1 && state.curIndex !== React.Children.count(props.children)) {
      return;
    }
    setState(curr => ({
      ...curr,
      animating: false,
      curIndex:
        curr.curIndex === -1
          ? React.Children.count(props.children) - 1
          : curr.curIndex === React.Children.count(props.children)
          ? 0
          : curr.curIndex
    }));
  }, [state.curIndex]);

  return (
    <div className={classNames(styles.slider, props.classNames)} ref={carouselRef}>
      {props.carouselTitle && props.carouselTitle?.length > 0 ? (
        <h2 className="phillips-carousel__title" dangerouslySetInnerHTML={{ __html: props.carouselTitle }} />
      ) : null}
      {props.carouselDesc && props.carouselDesc?.length > 0 ? (
        <span className="phillips-carousel__description" dangerouslySetInnerHTML={{ __html: props.carouselDesc }} />
      ) : null}
      <div className={styles.sliderWrapper} ref={wrapperRef}>
        {React.Children.count(props.children) > 1 ? (
          <Fragment>
            <button
              className={classNames(styles.button, styles.buttonPrevious)}
              value={-1}
              onClick={handleClick}
              type="button"
              aria-label="button-previous"
            />
            <button
              className={classNames(styles.button, styles.buttonNext)}
              value={1}
              onClick={handleClick}
              type="button"
              aria-label="button-next"
            />
          </Fragment>
        ) : null}
        {Array.isArray(props.children) ? (
          <ul
            className={classNames(styles.carouselTrack, { [styles.carouselTrackIsAnimating]: state.animating })}
            style={{
              width: `${state.wrapperWidth}px`,
              transform: `translateX(-${state.itemWidth * (state.curIndex + 1)}px)`
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            <>
              <li
                style={{
                  width: `${state.itemWidth}px`
                }}
                key={`${props.children[props.children.length - 1].key}-clone-begin`}
              >
                {props.children[props.children.length - 1]}
              </li>
              {props.children.map((child: React.ReactElement, i) => (
                <li
                  key={child.key ?? `child-${i}`}
                  style={{
                    width: `${state.itemWidth}px`
                  }}
                >
                  {child}
                </li>
              ))}
              <li
                style={{
                  width: `${state.itemWidth}px`
                }}
                key={`${props.children[0].key}-clone-end`}
              >
                {props.children[0]}
              </li>
            </>
          </ul>
        ) : null}
      </div>
    </div>
  );
};
