import { PropsWithChildren } from 'react';
import { ModelProvider } from '../../src/context/model';

export default ({ children }: PropsWithChildren<{}>) => <ModelProvider>{children}</ModelProvider>;
