import { PropsWithChildren } from 'react';
import { InterviewProvider } from '../../src/context/interview';

export default ({ children }: PropsWithChildren<{}>) => <InterviewProvider>{children}</InterviewProvider>;
