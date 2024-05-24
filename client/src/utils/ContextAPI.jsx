import React, { createContext, useState } from 'react';

export const DataContext = createContext();

const ContextAPI = (props) => {
    const [loader, setLoader] = useState(false);

    return (
        <DataContext.Provider
            value={{
                loader,
                setLoader,
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
};

export default ContextAPI;
