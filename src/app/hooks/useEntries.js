import { useState, useEffect } from 'react';
import { getJournalEntries, createEntry, updateEntry, deleteEntry, deleteJournalEntries } from '../api/entriesAPI.tsx';

export default function useEntries(selectedJournalId) {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch entries for the selected journal
  useEffect(() => {
    if (!selectedJournalId) {
      setEntries([]); // If no journal is selected, entries remain empty
      return;
    }

    const fetchEntries = async () => {
      setLoading(true);
      try {
        const fetchedEntries = await getJournalEntries(selectedJournalId);
        setEntries(fetchedEntries);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [selectedJournalId]);

  // refresh entries, and select a differnt entry once a diff journal is selected
  useEffect(() => {
    setSelectedEntry(entries[0])}, 
  [selectedJournalId]);

  // Create a new entry
  const addEntry = async (title, content) => {
    try {
      const createdEntry = await createEntry(selectedJournalId, title, content);
      setEntries([...entries, createdEntry]); // Add the new entry to the list
    } catch (err) {
      setError(err);
    }
  };

  // Update an existing entry
  const editEntry = async (entryId, title, content, date) => {
    try {
      const updatedEntry = await updateEntry(entryId, title, content, date);
      setEntries(entries.map((entry) => (entry.id === entryId ? updatedEntry : entry)));
    } catch (err) {
      setError(err);
    }
  };

  // Delete an entry
  const removeEntry = async (entryId) => {
    try {
      await deleteEntry(entryId);
      setEntries(entries.filter((entry) => entry.id !== entryId));
    } catch (err) {
      setError(err);
    }
  };

  const removeJournalEntries = async (journalId) => {
    deleteJournalEntries(journalId);
  }

  return {
    entries,
    loading,
    error,
    selectedEntry,
    setSelectedEntry,
    addEntry,
    editEntry,
    removeEntry,
    removeJournalEntries
  };
}
