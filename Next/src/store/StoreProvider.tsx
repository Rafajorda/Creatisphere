'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import React from 'react';
import { SessionProvider } from 'next-auth/react';

interface Props {
    children: React.ReactNode;
}

const StoreProvider = ({ children }: Props) => {
    return <Provider store={store}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </Provider>;
};

export default StoreProvider;
