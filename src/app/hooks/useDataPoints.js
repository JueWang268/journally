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
        }, [userId]);
        
    const createDatapoint = () => {} 

    return {
        datapoints, 
        loading, 
        error
    };
}