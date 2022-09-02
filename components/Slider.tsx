import React, { useRef, useCallback, useEffect, useState, useMemo, Fragment, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './carousel.module.scss';

type ISlider = {
  arrows?: boolean;
  autoplay?: boolean;
  carouselTitle: string;
  carouselDesc?: string;
  classNames?: string;
  interval?: number;
  loop?: boolean;
  pagination?: boolean;
  children: React.ReactNode;
} & typeof defaultProps;

const defaultProps = {
  carouselTitle: '',
  carouselDesc: '',
  classNames: ''
};

const Slider = (props: PropsWithChildren<ISlider>) => {
  const carouselRef = useRef(null);
  const wrapperRef = useRef(null);
  const intervalRef = useRef(null);
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
    if (carouselRef.current !== null) {
      const newItemWidth = Math.ceil(carouselRef.current.offsetWidth / state.itemsPerSlide);
      if (newItemWidth !== state.itemWidth) {
        setState({
          ...state,
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
    };
  }, []);
  const handleClick = useCallback(
    e => {
      const int = parseInt(e.target.value, 10);
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
            props.children[React.Children.count(props.children) - 1],
            ...React.Children.toArray(props.children),
            props.children[0]
          ].map((child, i) => (
            <li
              style={{
                width: `${state.itemWidth}px`
              }}
              key={i === 0 || i === React.Children.count(props.children) + 1 ? `${child.key}-clone` : child.key}
            >
              {child}
            </li>
          ))}
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
