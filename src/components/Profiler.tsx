'use client';
import { ProfilerProps, PropsWithChildren, Profiler as ReactProfiler } from 'react';

export const Profiler = (props: PropsWithChildren<ProfilerProps>) => (
  <ReactProfiler id={props.id} onRender={props.onRender}>
    {props.children}
  </ReactProfiler>
);
