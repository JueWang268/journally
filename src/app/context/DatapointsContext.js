import React, { createContext, useContext, useState } from 'react';
import useDatapoints from '../hooks/useDataPoints';

const DataPointsContext = createContext();

export const useDataPointsContext = () => {
    return useContext(DataPointsContext);
};

export const DataPointsProvider = ({ userId, children }) => {
    const datapointsData = useDatapoints(userId);
    // console.log(datapointsData.datapoints);
    

    return (
        <DataPointsContext.Provider value={datapointsData}>
            {children}
        </DataPointsContext.Provider>
    );
};
