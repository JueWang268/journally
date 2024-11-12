import { useState, useEffect } from 'react';
import { fetchJournals, readJournal, createJournal, checkColumnInfo, updateJournal, deleteJournal, addTag, deleteTag } from '../api/journalsAPI.tsx';

const useJournals = (userId) => {
  const [journals_, setJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadJournals = async (userId) => {
    if (!userId) {
      setJournals([]);
      setLoading(false);
      return;
    }

    try {
      const data = await fetchJournals(userId);
      setJournals(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // load the journals from db
  useEffect(() => {
    loadJournals(userId);
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

  // updated with tag
  const addJournal = async (title, userId, tag) => {
    try {
      // console.log(title);
      // console.log(userId);
      // console.log(tag);
      // console.log(journals_)
      // const columnInfo = await checkColumnInfo();
      // console.log(columnInfo);
      const createdJournal = await createJournal(title, userId, tag);
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

  // add Tag
  const createTag = async (id, tag) => {
    try {
      const updatedJournal = await addTag(id, tag);
      setJournals((prev) =>
        prev.map((journal) => (journal.id === id ? updatedJournal : journal))
      );
      console.log(`Tag "${tag}" added to journal with ID ${id}`);
    } catch (err) {
      setError(err);
    }
  }

  // delete Tag
  const removeTag = async (id) => {
    try {
      const updatedJournal = await deleteTag(id);
      setJournals(journals_.map(journal => journal.id === id ? updatedJournal : journal));
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
    createTag,
    removeTag,
  };
};

export default useJournals;
