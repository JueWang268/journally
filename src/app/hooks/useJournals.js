import { useState, useEffect } from 'react';
import { fetchJournals, readJournal, createJournal, updateJournal, deleteJournal } from '../api/journalsAPI.tsx';

const useJournals = () => {
  const [journals_, setJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // load the journals from db
  useEffect(() => {
    const loadJournals = async () => {
      try {
        const data = await fetchJournals();
        setJournals(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadJournals();
  }, []);

  const selectJournal = (journalId) => {
    const journal = journals_.find(j => j.id === journalId);
    setSelectedJournal(journal || null);
};

  const getJournal = async (journalId) => {
    try {
      const journal = await readJournal(journalId);
      return journal
    } catch (err) {
      setError(err);
    }
  };

  const addJournal = async (title, userId) => {
    try {
      const createdJournal = await createJournal(title, userId);
      setJournals((prev) => [...prev, createdJournal]);
    } catch (err) {
      setError(err);
    }
  };

  const editJournal = async (id, updatedTitle) => {
    try {
      const updatedJournal = await updateJournal(id, updatedTitle);
      setJournals((prev) =>
        prev.map((journal) => (journal.id === id ? updatedJournal : journal))
      );
    } catch (err) {
      setError(err);
    }
  };

  const removeJournal = async (id) => {
    try {
      await deleteJournal(id);
      setJournals((prev) => prev.filter((journal) => journal.id !== id));
    } catch (err) {
      setError(err);
    }
  };

  return {
    journals_,
    loading,
    error,
    selectedJournal,
    setSelectedJournal,
    addJournal,
    editJournal,
    removeJournal,
  };
};

export default useJournals;
