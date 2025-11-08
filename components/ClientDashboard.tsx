import React from 'react';
import Card from './common/Card';
import { View } from '../types';
import Button from './common/Button';

interface ClientDashboardProps {
    onViewChange: (view: View) => void;
}

const SDGCard: React.FC<{ title: string, description: string, color: string, number: number }> = ({ title, description, color, number }) => (
    <Card className="transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg`} style={{ backgroundColor: color, color: 'white' }}>
                <span className="font-bold">SDG {number}</span>
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
        </div>
    </Card>
);


const ClientDashboard: React.FC<ClientDashboardProps> = ({ onViewChange }) => {
    return (
        <div className="space-y-8">
            <div className="text-center bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-4xl font-bold text-gray-800">Restoring Bangladesh’s Natural Rice Ecosystem</h2>
                <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
                    AmaderDhan is a movement to revive our nation's agricultural heritage. We connect farmers practicing sustainable, chemical-free farming with consumers who value health, tradition, and the environment.
                </p>
                <Button onClick={() => onViewChange(View.MARKETPLACE)} className="mt-6 text-lg !px-8 !py-3">
                    Explore the Marketplace
                </Button>
            </div>

            <Card title="Our Mission's Alignment with UN SDGs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <SDGCard 
                        number={2}
                        title="Zero Hunger" 
                        description="Promotes nutritious, naturally grown rice for better food security."
                        color="#D3382D"
                    />
                    <SDGCard 
                        number={3}
                        title="Good Health & Well-being" 
                        description="Reduces chemical exposure in food and farming for healthier communities."
                        color="#4CA146"
                    />
                    <SDGCard 
                        number={12}
                        title="Responsible Consumption & Production" 
                        description="Encourages sustainable and organic farming practices."
                        color="#C29314"
                    />
                    <SDGCard 
                        number={15}
                        title="Life on Land" 
                        description="Restores soil fertility and preserves vital agricultural biodiversity."
                        color="#3DA0D5"
                    />
                </div>
            </Card>
        </div>
    );
};

export default ClientDashboard;