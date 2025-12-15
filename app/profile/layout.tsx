import { PropsWithChildren, Suspense } from 'react';
import { UnauthenticatedFallback } from './page';

export default ({ children }: PropsWithChildren<{}>) => (
  <Suspense fallback={<UnauthenticatedFallback loginUrl={'/'} />}>{children}</Suspense>
);
