import { useState, useEffect } from 'react';
import { fetchUser, createUser, updateUser, deleteUser } from '../api/usersAPI.tsx';

export default function useUsers(id) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Create a new user
  const addUser = async (id, name, email, password) => {
    try {
      console.log("trying addUser call");
      const createdUser = await createUser(id, name, email, password);
    } catch (err) {
      setError(err);
    }
  };

  // Update an existing user
  const editUser = async (id, settings) => {
    try {
      const updatedUser = await updateUser(id, settings);
      console.log("Updated user:", updatedUser);
      setUser(updatedUser);
    } catch (err) {
      setError(err);
    }
  };
  

  // Fetch userID
  const getUserByID = async (id) => {
    try {
      setLoading(true);
      const fetchedUser = await fetchUser(id);
      console.log("FetechedUSER:", fetchedUser);
      setUser(fetchedUser);
      setLoading(false);
      console.log("FetechedUSER:", fetchedUser);
      return fetchedUser;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getUserByID(id);
    }
  }, [id]);


  // Delete a user
  const removeUser = async (id) => {
    try {
      await deleteUser(id);
    } catch (err) {
      setError(err);
    }
  };

  return {
    loading,
    error,
    user,
    getUserByID,
    addUser,
    editUser,
    removeUser
  };
}