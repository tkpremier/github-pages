import { millisecondsToHours, millisecondsToMinutes } from 'date-fns';

export const getDuration = (milliseconds: number): string => {
  let remainder = milliseconds;
  const hour = millisecondsToHours(milliseconds);
  const hours = hour * 60 * 60 * 1000;
  const min = millisecondsToMinutes(milliseconds - hours);
  remainder = (remainder - min * 60 * 1000) / 1000;
  const duration = `${hour > 0 ? `0${hour} hours, ` : ''}${min} minutes,${Math.ceil(remainder / 100)} seconds`;
  return duration;
};
