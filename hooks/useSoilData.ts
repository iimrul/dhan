
import { useState, useEffect } from 'react';
import { SoilData, HistoricalSoilEntry } from '../types';

const generateMockData = (): SoilData => {
  const fertilityLevels = ['High', 'Medium', 'Low'];
  return {
    fertility: fertilityLevels[Math.floor(Math.random() * fertilityLevels.length)],
    ph: parseFloat((5.5 + Math.random() * 2).toFixed(1)), // pH between 5.5 and 7.5
    moisture: Math.floor(40 + Math.random() * 40), // Moisture between 40% and 80%
  };
};

const generateMockHistoricalData = (): HistoricalSoilEntry[] => {
    const data: HistoricalSoilEntry[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        data.push({
            day: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            ph: parseFloat((6.5 + (Math.random() - 0.5) * 1).toFixed(1)), // pH varies around 6.5
            moisture: Math.floor(60 + (Math.random() - 0.5) * 20), // moisture varies around 60%
            fertility: 'Medium',
        });
    }
    return data;
};

export const useSoilData = () => {
  const [soilData, setSoilData] = useState<SoilData>(generateMockData());
  const [loading, setLoading] = useState(true);
  const [historicalData, setHistoricalData] = useState<HistoricalSoilEntry[]>(generateMockHistoricalData());

  const refreshData = () => {
    setSoilData(generateMockData());
  };
  
  useEffect(() => {
    // Initial load
    const initialTimer = setTimeout(() => setLoading(false), 500);

    // Set up live data simulation
    const interval = setInterval(() => {
      setSoilData(prevData => {
          const newData = { ...prevData };
          newData.ph = parseFloat(Math.max(5.0, Math.min(8.0, newData.ph + (Math.random() - 0.5) * 0.2)).toFixed(1));
          newData.moisture = Math.max(30, Math.min(90, newData.moisture + (Math.random() - 0.5) * 5));
          return newData;
      });
    }, 30000); // Update every 30 seconds

    return () => {
        clearTimeout(initialTimer);
        clearInterval(interval);
    };
  }, []);

  return { soilData, loading, refreshData, historicalData };
};