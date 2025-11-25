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

export const formatBytes = bytes => {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
};

export const getImageLink = (link = '', endStr = 's220', split = 's220') => {
  const [base] = link.split(split);
  return `${base}${endStr}`;
};

const EMPTY_ARRAY = Object.freeze([]) as ReadonlyArray<never>;

export const emptyArray = <T = never>(): T[] => EMPTY_ARRAY as unknown as T[];
