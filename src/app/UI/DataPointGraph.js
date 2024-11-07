import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the date adapter
import { useDataPointsContext } from '../context/DatapointsContext';


Chart.register(...registerables);

const list_colors = ['red', 'blue', 'green'];

const MyChart = () => {
    const chartRef = useRef(null);
    const { datapoints } = useDataPointsContext();

    useEffect(() => {
        const datasets = (Object.keys(datapoints))?.map((name, index) => {
            return {
                label: name,
                data: datapoints[name].map(dp => ({
                    x: dp.date, // Use 'x' for date
                    y: dp.value  // Use 'y' for value
                })),
                backgroundColor: list_colors[index % 3],
                borderColor: list_colors[index % 3],
                fill: false,
            };
        });

        const ctx = chartRef.current.getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: datasets // Use the separate datasets
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            tooltipFormat: 'yyyy-MM-dd', // Format for tooltips
                            displayFormats: {
                                day: 'yyyy-MM-dd' // Format on the x-axis
                            }
                        },
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Value'
                        }
                    }
                }
            }
        });

        return () => {
            myChart.destroy();
        };
    }, [datapoints]);

    return (
        <canvas
            ref={chartRef}
            style={{ width: '800px', margin: '0 0' }}
        />
    );
};

export default MyChart;
