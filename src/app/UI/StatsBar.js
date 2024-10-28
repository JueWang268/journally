"use client"
import { React } from 'React';
import useDatapoints from '../hooks/useDatapoints';
import DataPointItem from './DataPointItem.js';

export default function StatsBar( { userId } ) {
  const { datapoints, loading, error } = useDatapoints(userId);
  // const dp_types = 
  
  return (
    <div className="stats-bar">
      {
        datapoints.map( dp => 
            <DataPointItem name={dp.name} color = "red" timeline={dp.data}></DataPointItem>
        )
      }

    </div>
  );
}
