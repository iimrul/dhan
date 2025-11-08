import React, { useState } from 'react';
import { SEEDS } from '../constants';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';
import { Seed, UserRole } from '../types';
import { AnimatePresence } from 'framer-motion';

const SeedCard: React.FC<{ seed: Seed }> = ({ seed }) => (
    <Card className="flex flex-col">
        <img src={seed.image} alt={seed.name} className="w-full h-48 object-cover" />
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{seed.name}</h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow">{seed.description}</p>
            <div className="mt-auto pt-4 border-t border-gray-200 text-sm space-y-2">
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Optimal pH:</span>
                    <span className="text-brand-green font-medium">{seed.optimal_ph}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Optimal Moisture:</span>
                    <span className="text-brand-yellow font-medium">{seed.optimal_moisture}</span>
                </div>
            </div>
        </div>
    </Card>
);

interface SeedLibraryProps {
    userRole: UserRole;
}

const SeedLibrary: React.FC<SeedLibraryProps> = ({ userRole }) => {
    const [seeds, setSeeds] = useState<Seed[]>(SEEDS);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSeed, setNewSeed] = useState({ name: '', description: '', optimal_ph: '', optimal_moisture: '' });

    const handleAddSeed = (e: React.FormEvent) => {
        e.preventDefault();
        const newSeedWithId: Seed = {
            ...newSeed,
            id: seeds.length + 1,
            image: `https://picsum.photos/seed/${106 + seeds.length}/400/300` // Placeholder image
        };
        setSeeds(prev => [newSeedWithId, ...prev]);
        setIsModalOpen(false);
        setNewSeed({ name: '', description: '', optimal_ph: '', optimal_moisture: '' }); // Reset form
    };

    const filteredSeeds = seeds.filter(seed =>
        seed.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const isAdmin = userRole === UserRole.ADMIN || userRole === UserRole.SUPER_ADMIN;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Seed Library</h2>
                    <p className="text-gray-600">Explore native Bangladeshi rice varieties suited for your land.</p>
                </div>
                {isAdmin && <Button onClick={() => setIsModalOpen(true)}>Add New Seed</Button>}
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search for a seed..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-light-green"
                />
            </div>
            
            {filteredSeeds.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredSeeds.map(seed => (
                        <SeedCard key={seed.id} seed={seed} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500">No seeds found matching your search.</p>
                </div>
            )}

            <AnimatePresence>
                {isModalOpen && (
                    <Modal onClose={() => setIsModalOpen(false)} title="Add New Seed">
                        <form onSubmit={handleAddSeed} className="space-y-4">
                            <input type="text" placeholder="Seed Name" value={newSeed.name} onChange={e => setNewSeed({...newSeed, name: e.target.value})} className="w-full p-2 border rounded" required />
                            <textarea placeholder="Description" value={newSeed.description} onChange={e => setNewSeed({...newSeed, description: e.target.value})} className="w-full p-2 border rounded" required />
                            <input type="text" placeholder="Optimal pH (e.g., 5.5-6.5)" value={newSeed.optimal_ph} onChange={e => setNewSeed({...newSeed, optimal_ph: e.target.value})} className="w-full p-2 border rounded" required />
                            <input type="text" placeholder="Optimal Moisture (e.g., Medium)" value={newSeed.optimal_moisture} onChange={e => setNewSeed({...newSeed, optimal_moisture: e.target.value})} className="w-full p-2 border rounded" required />
                            <Button type="submit" className="w-full">Add Seed</Button>
                        </form>
                    </Modal>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SeedLibrary;