import { useState, useEffect } from 'react';
import { createUser, updateUser, deleteUser } from '../api/usersAPI.tsx';

export default function useUsers(id) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  const editUser = async (id, name, email, password) => {
    try {
      const updatedUser = await updateUser(id, name, email, password);
    } catch (err) {
      setError(err);
    }
  };

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
    addUser,
    editUser,
    removeUser
  };
}
