'use client';

import { FC, ReactNode } from 'react';
import { Providers } from '../app/providers';

interface ClientProvidersProps {
  children: ReactNode;
}

export const ClientProviders: FC<ClientProvidersProps> = ({ children }) => {
  return <Providers>{children}</Providers>;
};
