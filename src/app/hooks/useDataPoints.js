import { useState, useEffect } from 'react';
import { readDp, createDp, readGroupedDp, updateDp, deleteDp } from '../api/datapointsAPI.tsx';

export default function useDatapoints(userId) {
    const [datapoints, setDatapoints] = useState([]);
    const [selectedDp, setSelectedDp] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch dp for user
    useEffect(() => {
        if (!userId) {
            setDatapoints([]);
            return;
        }

        const fetchDp = async () => {
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

        fetchDp();
        }, [userId, datapoints]);
        
    const createDatapoint = async (userId, name, value) => {
        try {
            const newDp = await createDp(userId, name, value);
            setDatapoints([...datapoints, newDp]);
        }
        catch (err) {
            setError(err);
        }
    }

    const editDp = async (dpId, name, value, date) => {
        try {
          const updatedDp = await updateDp(dpId, name, value, date);
          setDatapoints(datapoints.map((dp) => (dp.id === dpId ? updatedDp : dp)));
        } catch (err) {
          setError(err);
        }
    };
    
    const removeDp = async (dpId) => {
        try {
          const removed = await deleteDp(dpId);
          setDatapoints(datapoints.filter((dp) => dp.id !== dpId));
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
        removeDp
    };
}