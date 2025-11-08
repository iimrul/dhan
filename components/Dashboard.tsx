import React from 'react';
import Card from './common/Card';
import { useSoilData } from '../hooks/useSoilData';
import { View } from '../types';
import Button from './common/Button';


interface AdminDashboardProps {
    onViewChange: (view: View) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onViewChange }) => {
    const { soilData, loading, historicalData } = useSoilData();

    return (
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-4xl font-bold text-gray-800">Admin Dashboard</h2>
                <p className="text-gray-600 mt-2">Live overview of the AmaderDhan ecosystem.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card title="Live Soil pH">
                    <p className={`text-5xl font-bold ${loading ? 'text-gray-400' : 'text-brand-green'}`}>
                        {loading ? '...' : soilData.ph}
                    </p>
                    <p className="text-gray-500 mt-1">Current pH Level</p>
                </Card>
                <Card title="Live Soil Moisture">
                    <p className={`text-5xl font-bold ${loading ? 'text-gray-400' : 'text-brand-yellow'}`}>
                        {loading ? '...' : `${soilData.moisture}%`}
                    </p>
                    <p className="text-gray-500 mt-1">Current Moisture Level</p>
                </Card>
                <Card title="Soil Fertility">
                     <p className={`text-5xl font-bold ${loading ? 'text-gray-400' : 'text-brand-light-green'}`}>
                        {loading ? '...' : soilData.fertility}
                    </p>
                    <p className="text-gray-500 mt-1">Overall Assessment</p>
                </Card>
                <Card title="Quick Actions">
                    <div className="flex flex-col space-y-3">
                        <Button onClick={() => onViewChange(View.SOIL_MONITOR)} className="w-full">View Soil Details</Button>
                        <Button onClick={() => onViewChange(View.SEED_LIBRARY)} className="w-full bg-brand-light-green hover:bg-brand-green">Manage Seeds</Button>
                    </div>
                </Card>
            </div>

            <Card title="7-Day Soil Trend">
                 <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                    <p className="mb-4 text-gray-600">A visual chart of historical data would be rendered here.</p>
                    <div className="mt-4 flex justify-around flex-wrap gap-4">
                        {historicalData.map(d => (
                            <div key={d.day} className="text-sm bg-white p-3 rounded-lg shadow-sm">
                                <p className="font-semibold text-gray-800">{d.day}</p>
                                <p>pH: <span className="font-medium text-brand-green">{d.ph}</span></p>
                                <p>M: <span className="font-medium text-brand-yellow">{d.moisture}%</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AdminDashboard;