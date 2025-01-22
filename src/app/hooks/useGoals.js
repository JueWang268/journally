import { useState, useEffect, useCallback } from 'react';
import { readGoals, createGoal, updateGoal, deleteGoal } from '../api/goalsAPI.tsx';
import { ISODate } from "../utils/ISODate";

export default function useGoals(userId) {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch goals for user
  useEffect(() => {
    const fetchGoals = async (userId) => {
      setLoading(true);
      try {
        const fetchedGoals = await readGoals(userId);
        // sort goals on boot
        fetchedGoals.sort((a,b) => Date(a.modified_at) - Date(b.modified_at));
        setGoals(fetchedGoals);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (!userId) {
      setGoals([]);
      return;
    }

  fetchGoals(userId);
  }, [userId]);
    
  const setNewGoal = async (userId, name, category, freq, value) => {
    try {
      const newGoal = await createGoal(userId, name, category, value, freq);
      const {"user_id": excluded, ...goalState} = newGoal;
      setGoals(
        [...goals, goalState]
      );
      // console.log(newGoal);
      
    }
    catch (err) {
      setError(err);
    }
  }

  const editGoal = async (id, newName, newCat, newVal, newFreq) => {
    const updatedGoal = await updateGoal(id, newName, newCat, newVal, newFreq);
    setGoals(
      oldGoals => {
        const updatedGoals = oldGoals.map(
          g => 
            (g.id === id) ? 
          {"id": id, "category":newCat, 
            "name":newName, "value":newVal, 
            "frequency": newFreq, "modified_at": (new Date()).toISOString()} : g
        ); 
        return updatedGoals;
        // updatedGoals.sort((a,b) => new Date(a.modified_at) - new Date(b.modified_at));
      }
    );
    return updatedGoal;
  };
  
  const removeGoal = async (goalId) => {
    const removed = await deleteGoal(goalId);
    try {
      setGoals(goals.filter(g => g.id !== goalId));

    } catch (err) {
      setError(err);
    }
    return removed;
  }


  return {
    goals, 
    loading, 
    error,
    setNewGoal,
    editGoal,
    removeGoal,
    setGoals
  };
}