import { useState, useEffect, useCallback } from 'react';
import {
  readDp, 
  createDp, 
  readGroupedDp, 
  updateDp, 
  updateDpGroupName, 
  deleteDp } from '../api/datapointsAPI.tsx';

export default function useDatapoints(userId) {
  
  const [datapoints, setDatapoints] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch dp for user
  useEffect(() => {
  
    const fetchDp = async (userId) => {
      setLoading(true);
      try {
        const fetchedDp = await readGroupedDp(userId);
        // sort datapoints on boot
        Object.keys(fetchedDp).map(
          (k) => 
            fetchedDp[k].sort((a,b) => new Date(a.date) - new Date(b.date))
        );
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
    
  const createDatapoint = async (userId, name, value, date) => {
    // datapoints are ALWAYS GROUPED
    // console.log(`new dp created`);
    try {
      const newDp = await createDp(userId, name, value, date);
      // console.log(newDp);
      
      const newTLDP = {
        "id": newDp.id,
        "date": newDp.date,
        "value": newDp.value
      };
      setDatapoints(preDatapoints =>
        {
          const updatedDps = {...preDatapoints};
          if (updatedDps[name]){
            const sortedDpArr = [...updatedDps[name], newTLDP];
            sortedDpArr.sort((a,b) => Number(Date(a.date) - Date(b.date)));
            updatedDps[name] = sortedDpArr;
          }
          else {
            updatedDps[name] = [newTLDP];
          }
          return updatedDps;
        }
      );
    }
    catch (err) {
      setError(err);
    }
  }

  const editDp = async (dpId, name, value, date) => {
    try {
      const updatedDp = await updateDp(dpId, name, value, date);

      setDatapoints(prevDatapoints => {
        const existingDatapoints = prevDatapoints[name] || [];
        const updatedDps = existingDatapoints.map(
          dp => 
            (dp.id === dpId) ? 
          {"id": dpId, "date":date, "value":value} : dp
        );
        updatedDps.sort((a,b) => new Date(a.date) - new Date(b.date));
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

  const editDpGroupName = async (oldName, newName) => {
    try {
      const updatedDps = await updateDpGroupName(oldName, newName);
  
      setDatapoints(prevDatapoints => {
        const existingDatapoints = prevDatapoints[oldName] || [];
  
        // Update the name field in each dp
        const renamedDps = existingDatapoints.map(dp => ({
          ...dp,
          name: newName
        }));

        const { [oldName]: excluded, ...newdps } = prevDatapoints;

        // delete prevDatapoints.oldName;
        return {
          ...newdps,
          [newName]: renamedDps, // add new group
        };
      });
  
      return updatedDps;
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

        if (updatedDps[removed.name].length === 0 ){
          const { [removed.name]: _, ...newDps } = updatedDps;
          return newDps;
        }
        
        return updatedDps;
      });

    } catch (err) {
      setError(err);
    }
  }

  const removeCategory = async (name) => {
    try {
      if (Object.keys(datapoints).includes(name)) {
        const pts = datapoints[name];
        pts.forEach(dp => {
          removeDp(dp.id);
        });
      }

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
    editDpGroupName,
    removeDp,
    removeCategory,
    setDatapoints
  };
}