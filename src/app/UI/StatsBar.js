"use client"
import { React } from 'react';
import { useDataPointsContext } from '../context/DatapointsContext';
import DataPointItem from './DataPointItem.js';


export default function StatsBar( { userId } ) {
  const { datapoints, loading, error, createDatapoint, editDp, removeDp } = useDataPointsContext();
  console.log(JSON.stringify(datapoints), "is the datapoints");
  
  
  return (
    <div className="stats-bar">
      {
        Object.keys(datapoints).map( dp_group_name => 
          <div>
            <DataPointItem name={dp_group_name} color = "red" timeline={datapoints[dp_group_name]} onEdit={editDp} onDelete={removeDp}></DataPointItem>
            <button className="add-data-button" onClick={()=>{createDatapoint(userId, dp_group_name, 1)}}> + </button>
          </div>
        )
      }

    </div>
  );
}
