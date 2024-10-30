"use client"
import { React } from 'react';
import { useDataPointsContext } from '../context/DatapointsContext';
import DataPointItem from './DataPointItem.js';


export default function StatsBar( { userId } ) {
  const { datapoints, loading, error, createDatapoint, editDp, removeDp } = useDataPointsContext();

  
  return (
    <div className="stats-bar">
      {
        datapoints.map( dp => 
          <div>
            <DataPointItem name={dp.name} color = "red" timeline={dp.data} onEdit={editDp} onDelete={removeDp}></DataPointItem>
            <button className="add-data-button" onClick={()=>{createDatapoint(userId, dp.name, 1)}}> + </button>
          </div>
        )
      }

    </div>
  );
}
