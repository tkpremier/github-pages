import { Editor as CKEditor } from 'ckeditor5';
import { NextApiRequest } from 'next';
import React from 'react';

export type NextApiRequestWithQuery = NextApiRequest & {
  query?: {
    [key: string]: string;
  };
};

export interface ContactDB {
  createdOn: Date;
  driveIds: Array<string>;
  id: number;
  name: string;
  platform: string;
}

export interface Contact {
  createdOn: string;
  driveIds: Array<string>;
  id: number;
  name: string;
  platform: string;
}

export type DriveFile = {
  id: string;
  driveId: string;
  type: string;
  name: string;
  webViewLink: string;
  webContentLink?: string;
  thumbnailLink?: string;
  createdTime: string;
  lastViewed?: string | null;
  createdOn: string;
  duration?: number;
  modelId: Array<number>;
};

// Slider types
export type Sizes = {
  xl?: number;
  lg: number;
  md: number;
  sm?: number;
} & typeof defaultSizes;

export const defaultSizes = {
  lg: 3,
  md: 2
};

export type ISlider = {
  arrows?: boolean;
  autoplay?: boolean;
  carouselTitle?: string;
  carouselDesc?: string;
  classNames?: string;
  interval?: number;
  loop?: boolean;
  pagination?: boolean;
  children: React.ReactNode | React.ReactElement;
  sizes?: Sizes;
};

export enum DEVICE_WIDTH_TYPES {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl'
}

export type MediaQuery = {
  itemsPerSlide: number;
  mql: MediaQueryList;
};

// Drawer types
export interface DrawerProps {
  className?: string;
  closed?: boolean;
  header: string;
}

// Form types
export interface IFormProps {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

// Editor types
export interface IEventInfo {
  name: string;
  path: Array<any>;
  source: any;
}

export interface EditorProps {
  id?: string;
  data: string;
  name: string;
  onChange: (eventInfo: IEventInfo, editor: CKEditor) => void;
}

// Experience page types
export interface Exp {
  id: number;
  name: string;
  description: string;
}

export type AboutProps = {
  data: Array<Exp>;
};

// Interpolation page types
export interface ExtendedTarget extends EventTarget {
  value: string;
}

export interface ExtendedFormEvent extends React.FormEvent {
  target: HTMLFormElement;
}

// Insertion page types
export type FormValue = {
  selectionSortArray: string;
};

// DB service types
export type DbResponse = {
  rows: Array<any>;
};

export type ErrorResponse = {
  error: string;
};

export type SuccessResponse = {
  data: Array<any>;
};
