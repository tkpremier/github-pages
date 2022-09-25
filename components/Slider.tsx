import React, { useRef, useCallback, useEffect, useState, useMemo, Fragment, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './carousel.module.scss';
import { listeners } from 'process';

type Sizes = {
  xl?: number;
  lg: number;
  md: number;
  sm?: number;
} & typeof defaultSizes;

type ISlider = {
  arrows?: boolean;
  autoplay?: boolean;
  carouselTitle: string;
  carouselDesc?: string;
  classNames?: string;
  interval?: number;
  loop?: boolean;
  pagination?: boolean;
  children: React.ReactNode | React.ReactElement;
  sizes?: Sizes;
} & typeof defaultProps;

const defaultSizes = {
  xl: 3,
  lg: 3,
  md: 2,
  sm: 1
};
const defaultProps = {
  carouselTitle: '',
  carouselDesc: '',
  classNames: '',
  sizes: defaultSizes,
  itemsPerSlide: 1
};
enum DEVICE_WIDTH_TYPES {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl'
}
type MediaQuery = {
  itemsPerSlide: number;
  mql: MediaQueryList;
};
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
  // const listeners = Object.keys(sizeQueries).map(key => {
  //   const query: string = sizeQueries;
  //   const mql = window.matchMedia(query);
  //   // mql.size = key;
  //   return mql;
  // });
};

const Slider = (props: PropsWithChildren<ISlider>) => {
  const carouselRef = useRef(null);
  const wrapperRef = useRef(null);
  const intervalRef = useRef(null);
  const mqlRef = useRef(null);
  const [state, setState] = useState({
    animating: false,
    curIndex: 0,
    itemWidth: 278,
    itemsPerSlide: 1,
    nextDisabled: React.Children.count(props.children) < 2,
    prevDisabled: React.Children.count(props.children) < 2,
    wrapperWidth: 1110
  });
  useEffect(() => {
    //    console.log(state, props.sizes);
    if (carouselRef.current !== null) {
      let { itemsPerSlide } = state;
      if (typeof window !== 'undefined') {
        const mediaQueryResults = getMediaQueries();
        const enabledMQs: MediaQuery[] = [];
        for (const [key, mql] of mediaQueryResults) {
          // console.log(key);
          if (mql.matches) {
            enabledMQs.push({ itemsPerSlide: props.sizes[key], mql });
          }
        }
        if (enabledMQs.length > 0) {
          if (enabledMQs[enabledMQs.length - 1].itemsPerSlide !== itemsPerSlide) {
            mqlRef.current = enabledMQs.pop();
            // console.log(mqlRef.current);
            itemsPerSlide = mqlRef.current.itemsPerSlide;
            if (mqlRef.current !== null) {
              mqlRef.current.mql.addEventListener('change', handleMql);
            }
          }
        }
      }
      // console.log(itemsPerSlide, carouselRef.current.offsetWidth);
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
    // if (props.autoplay) {
    // 	setTimeout(() => {
    // 		if (intervalRef.current === null) {
    // 			intervalRef.current = setInterval(() => {
    // 				const increment = 1;
    // 				let newIndex = (state.curIndex += increment);
    // 				console.log("neIndex: ", newIndex);

    // 				if (newIndex === React.Children.count(props.children)) {
    // 					return null;
    // 				}
    // 				setState({
    // 					...state,
    // 					curIndex: newIndex === React.Children.count(props.children) ? 0 : newIndex,
    // 					animating: true
    // 				});
    // 			}, props.interval);
    // 		}
    // 	}, props.interval);
    // }
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
      console.log('mediaQueryResults', mediaQueryResults);
      const enabledMQs: MediaQuery[] = [];
      console.log('e: ', e);
      for (const [key, mql] of mediaQueryResults) {
        if (mql.matches) {
          enabledMQs.push({ itemsPerSlide: props.sizes[key], mql });
        }
      }
      if (enabledMQs.length > 0) {
        console.log('handleMql enabledMQs: ', enabledMQs);
        console.log('carouselRef info: ', carouselRef.current.offsetWidth);
        // if (enabledMQs[enabledMQs.length - 1].itemsPerSlide !== state.itemsPerSlide) {
        //   if (mqlRef.current && mqlRef.current.mql) {
        //     mqlRef.current.mql.removeEventListener('change', handleMql);
        //   }
        //   mqlRef.current = enabledMQs.pop();
        //   const itemsPerSlide = mqlRef.current.mql.itemsPerSlide || state.itemsPerSlide;
        //   if (mqlRef.current !== null) {
        //     mqlRef.current.mql.addEventListener('change', handleMql);
        //     setState(prev => ({
        //       ...prev,
        //       itemsPerSlide,
        //       itemWidth: Math.ceil(carouselRef.current.offsetWidth / itemsPerSlide)
        //     }));
        //   }
        // }
      }
    },
    [state.itemsPerSlide, props.sizes, carouselRef.current]
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
  const carousel = useMemo(
    () =>
      React.Children.count(props.children) > 1 ? (
        <ul
          className={classNames(styles.carouselTrack, { [styles.carouselTrackIsAnimating]: state.animating })}
          style={{
            width: `${state.wrapperWidth}px`,
            transform: `translateX(-${state.itemWidth * (state.curIndex + 1)}px)`
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          )
          {[
            React.Children.toArray(props.children).find((child, i) => {
              if (i === React.Children.count(props.children) - 1) {
                const clone = React.isValidElement(child)
                  ? React.cloneElement(child, { key: `${child.key}-clone-begin` })
                  : undefined;
                console.log('clone', clone);
                return clone;
              }
              return undefined;
            })
          ]
            .concat(React.Children.toArray(props.children))
            .concat([
              React.Children.toArray(props.children).find((child, i) =>
                i === 0
                  ? React.isValidElement(child)
                    ? React.cloneElement(child, { key: `${child.key}-clone-end` })
                    : undefined
                  : undefined
              )
            ])
            .map((child: React.ReactElement, i) => {
              console.log(child.key);
              return (
                <li
                  style={{
                    width: `${state.itemWidth}px`
                  }}
                  key={child.key}
                >
                  {child}
                </li>
              );
            })}
        </ul>
      ) : props.children ? (
        <ul
          className={classNames(styles.carouselTrack, { [styles.carouselTrackIsAnimating]: state.animating })}
          style={{
            width: `${state.wrapperWidth}px`
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          <li
            style={{
              width: `${state.itemWidth}px`
            }}
          >
            {props.children}
          </li>
        </ul>
      ) : null,
    [props.children, state]
  );
  return (
    <div className={classNames(styles.slider, props.classNames)} ref={carouselRef}>
      {props.carouselTitle.length > 0 ? (
        <h2 className="phillips-carousel__title" dangerouslySetInnerHTML={{ __html: props.carouselTitle }} />
      ) : null}
      {props.carouselDesc.length > 0 ? (
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
        {carousel}
      </div>
    </div>
  );
};

Slider.defaultProps = defaultProps;
export default Slider;
