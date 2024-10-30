import React, { createContext, useContext, useState } from 'react';
import useDatapoints from '../hooks/useDatapoints';

const DataPointsContext = createContext();

export const useDataPointsContext = () => {
    return useContext(DataPointsContext);
};

export const DataPointsProvider = ({ userId, children }) => {
    const datapointsData = useDatapoints(userId);

    return (
        <DataPointsContext.Provider value={datapointsData}>
            {children}
        </DataPointsContext.Provider>
    );
};
