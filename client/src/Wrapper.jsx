import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';

import { Wagmi } from './Wagmi';
import { makeStore } from './utils/store/store';
import ContextAPI from './utils/ContextAPI';

const Wrapper = ({ children }) => {
    const storeRef = useRef();
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }
    persistStore(storeRef.current);
    return (
        <>
            <BrowserRouter>
                <Wagmi>
                    <ContextAPI>
                        <Provider store={storeRef.current}>{children}</Provider>
                    </ContextAPI>
                </Wagmi>
            </BrowserRouter>
        </>
    );
};

export default Wrapper;
