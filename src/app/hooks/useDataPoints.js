import { useState, useEffect, useCallback } from 'react';
import { readDp, createDp, readGroupedDp, updateDp, deleteDp } from '../api/datapointsAPI.tsx';
import { ISODate } from "../utils/ISODate";

export default function useDatapoints(userId) {
    
    const [datapoints, setDatapoints] = useState({});
    const [selectedDp, setSelectedDp] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch dp for user
    useEffect(() => {
    
        const fetchDp = async (userId) => {
            setLoading(true);
            try {
                const fetchedDp = await readGroupedDp(userId);
                setDatapoints(fetchedDp);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        if (!userId) {
            setDatapoints({});
            return;
        }

        fetchDp(userId);
        }, [userId]);
        
    const createDatapoint = async (userId, name, value) => {
        // datapoints are ALWAYS GROUPED
        // console.log(`new dp created`);
        try {
            const newDp = await createDp(userId, name, value);
            console.log(newDp);
            
            const newTLDP = {
                "id": newDp.id,
                "date": newDp.date,
                "value": newDp.value
            };
            setDatapoints(preDatapoints =>
                {
                    const updatedDps = {...preDatapoints};
                    if (updatedDps[name]){
                        updatedDps[name] = [...updatedDps[name], newTLDP];
                    }
                    else {
                        updatedDps[name] = [newTLDP];
                    }
                    return updatedDps;
                }
            );
            console.log(`new dps ${datapoints}`);
        }
        catch (err) {
            setError(err);
        }
    }

    const editDp = async (dpId, name, value, date) => {
        try {
            // console.log("is calling editDp");
            
            const updatedDp = await updateDp(dpId, name, value, date);

            setDatapoints(prevDatapoints => {
                const existingDatapoints = prevDatapoints[name] || [];
                const updatedDps = existingDatapoints.map(
                    dp => 
                        (dp.id === dpId) ? 
                    {"id": dpId, "date":date, "value":value} : dp
                );
                return {
                    ...prevDatapoints,
                    [name]: [...updatedDps]
                };
            });
            return updatedDp;
          
        } catch (err) {
            setError(err);
        }
    };
    
    const removeDp = async (dpId) => {
        try {
          const removed = await deleteDp(dpId);
          setDatapoints(prevDatapoints => {
            const updatedDps = { ...prevDatapoints };
            
            updatedDps[removed.name] = updatedDps[removed.name].filter(dp => dp.id !== dpId);
            
            return updatedDps;
          });

        } catch (err) {
          setError(err);
        }
        
    }


    return {
        datapoints, 
        loading, 
        error,
        createDatapoint,
        editDp,
        removeDp,
        setDatapoints
    };
}