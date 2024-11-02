import React from 'react';
import { useDataPointsContext } from '../context/DatapointsContext';

export default function NewEntryDataButton({ view, createNewEntry, userId }) {

  const { datapoints, dploading, dperror, createDatapoint, editDp, removeDp } = useDataPointsContext();
  
  return (
    <button className="new-entry-button" onClick={
			view === "dailyStats"? 
				( () => {
						createDatapoint(userId, "New Name", 1);
					}
				):
				createNewEntry
      }>
      +
      </button>
  );
}
