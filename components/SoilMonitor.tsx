import React, { useState, useEffect } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import { useSoilData } from '../hooks/useSoilData';
import { getRiceRecommendation } from '../services/geminiService';
import { AIRecommendation } from '../types';
import { SEEDS } from '../constants';
import { RefreshIcon } from './icons';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SoilMonitor: React.FC = () => {
    const { soilData, loading, refreshData, historicalData } = useSoilData();
    const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
    const [isRecLoading, setIsRecLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleGetRecommendations = async () => {
        setIsRecLoading(true);
        setError(null);
        try {
            const result = await getRiceRecommendation(soilData, historicalData, SEEDS);
            setRecommendations(result);
        } catch (err) {
            setError('Failed to fetch recommendations. Please try again.');
            console.error(err);
        } finally {
            setIsRecLoading(false);
        }
    };

    useEffect(() => {
        handleGetRecommendations();
    }, []); 

    const chartLabels = historicalData.map(d => d.day);
    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'pH Level',
                data: historicalData.map(d => d.ph),
                borderColor: 'rgb(40, 92, 77)',
                backgroundColor: 'rgba(40, 92, 77, 0.5)',
                yAxisID: 'y',
            },
            {
                label: 'Moisture (%)',
                data: historicalData.map(d => d.moisture),
                borderColor: 'rgb(243, 167, 18)',
                backgroundColor: 'rgba(243, 167, 18, 0.5)',
                yAxisID: 'y1',
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: '7-Day Soil pH and Moisture Trends'
            }
        },
        scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                title: {
                    display: true,
                    text: 'pH Level'
                }
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                title: {
                    display: true,
                    text: 'Moisture (%)'
                },
                grid: {
                    drawOnChartArea: false, // only draw grid lines for the first Y axis
                },
            },
        },
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                     <Card title="AI Seed Recommendations">
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">Based on your current and historical soil data, our AI recommends the following native rice varieties for optimal yield.</p>
                            <Button onClick={handleGetRecommendations} isLoading={isRecLoading}>
                                {isRecLoading ? 'Analyzing...' : 'Get New Recommendations'}
                            </Button>

                            {error && <p className="text-red-500">{error}</p>}
                            
                            {isRecLoading && !recommendations.length ? (
                                <div className="text-center p-8 text-gray-500">
                                    <p>Our AI is analyzing your soil data...</p>
                                </div>
                            ) : (
                                <div className="mt-4 space-y-3">
                                    {recommendations.map((rec, index) => (
                                        <div key={index} className="border border-gray-200 bg-white hover:bg-gray-50 rounded-lg p-4 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-lg text-gray-800">{rec.name}</h4>
                                                <span className="text-sm font-semibold bg-brand-light-green/20 text-brand-green px-2 py-1 rounded-full">Match: {rec.match_score}%</span>
                                            </div>
                                            <p className="text-sm text-gray-700 mt-1">{rec.reason}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <Card 
                        title="Live Soil Data" 
                        actions={
                            <button onClick={refreshData} className="text-brand-green hover:text-brand-dark-green disabled:text-gray-400 transition-colors" disabled={loading}>
                                <RefreshIcon className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
                            </button>
                        }
                    >
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-600">pH Level</h4>
                                <p className={`text-4xl font-bold ${loading ? 'text-gray-400' : 'text-brand-green'}`}>{loading ? '...' : soilData.ph}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-600">Moisture</h4>
                                <p className={`text-4xl font-bold ${loading ? 'text-gray-400' : 'text-brand-yellow'}`}>{loading ? '...' : `${soilData.moisture}%`}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-600">Fertility</h4>
                                <p className={`text-4xl font-bold ${loading ? 'text-gray-400' : 'text-brand-light-green'}`}>{loading ? '...' : soilData.fertility}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <Card>
                <Line options={chartOptions} data={chartData} />
            </Card>
        </div>
    );
};

export default SoilMonitor;