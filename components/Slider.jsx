import React, { useRef, useCallback, useEffect, useState, useMemo, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './carousel.module.scss';

const Slider = props => {
  const carouselRef = useRef(null);
  const wrapperRef = useRef(null);
  const intervalRef = useRef(null);
  const [state, setState] = useState({
    animating: false,
    curIndex: 0,
    itemWidth: 278,
    itemsPerSlide: 1,
    nextDisabled: props.children.length < 2,
    prevDisabled: props.children.length < 2,
    wrapperWidth: 1110
  });

  useEffect(() => {
    if (carouselRef.current !== null) {
      const newItemWidth = Math.ceil(carouselRef.current.offsetWidth / state.itemsPerSlide);
      if (newItemWidth !== state.itemWidth) {
        setState({
          ...state,
          itemWidth: newItemWidth,
          wrapperWidth: newItemWidth * (props.children.length + 2),
          prevDisabled: state.curIndex === 0,
          nextDisabled: state.curIndex === props.children.length - 1
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

    // 				if (newIndex === props.children.length) {
    // 					return null;
    // 				}
    // 				setState({
    // 					...state,
    // 					curIndex: newIndex === props.children.length ? 0 : newIndex,
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
      if ((int === 1 && state.curIndex === props.children.length) || (int === -1 && state.curIndex === -1)) {
        return null;
      }
      setState(curr => ({
        ...curr,
        curIndex: (curr.curIndex += int),
        animating: true
      }));
    },
    [state.curIndex]
  );
  const handleTransitionEnd = useCallback(() => {
    if (state.curIndex !== -1 && state.curIndex !== props.children.length) {
      return;
    }
    setState(curr => ({
      ...curr,
      animating: false,
      curIndex:
        curr.curIndex === -1 ? props.children.length - 1 : curr.curIndex === props.children.length ? 0 : curr.curIndex
    }));
  }, [state.curIndex]);
  const carousel = useMemo(
    () =>
      props.children.length > 1 ? (
        <ul
          className={classNames(styles.carouselTrack, { [styles.carouselTrackIsAnimating]: state.animating })}
          style={{
            width: `${state.wrapperWidth}px`,
            transform: `translateX(-${state.itemWidth * (state.curIndex + 1)}px)`
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          )
          {[props.children[props.children.length - 1], ...props.children, props.children[0]].map((child, i) => (
            <li
              style={{
                width: `${state.itemWidth}px`
              }}
              key={i === 0 || i === props.children.length + 1 ? `${child.key}-clone` : child.key}
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
            key={props.children.key}
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
        {props.children.length > 1 ? (
          <Fragment>
            <button
              className={classNames(styles.button, styles.buttonPrevious)}
              value={-1}
              onClick={handleClick}
              type="button"
            />
            <button
              className={classNames(styles.button, styles.buttonNext)}
              value={1}
              onClick={handleClick}
              type="button"
            />
          </Fragment>
        ) : null}
        {carousel}
      </div>
    </div>
  );
};

Slider.defaultProps = {
  autoplay: false,
  carouselTitle: '',
  carouselDesc: '',
  interval: 5000,
  loop: false,
  pagination: false
};

Slider.propTypes = {
  arrows: PropTypes.bool,
  autoplay: PropTypes.bool,
  carouselTitle: PropTypes.string,
  carouselDesc: PropTypes.string,
  interval: PropTypes.number,
  loop: PropTypes.bool,
  pagination: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.node])).isRequired
};

export default Slider;
