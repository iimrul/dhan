import React from 'react';
import { FARMERS, PRODUCTS } from '../constants';
import Button from './common/Button';

const FarmerManagement: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products Sold</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {FARMERS.map(farmer => (
            <tr key={farmer.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{farmer.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{farmer.contact}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <ul className="list-disc list-inside">
                    {farmer.productIds.map(id => {
                        const product = PRODUCTS.find(p => p.id === id);
                        return <li key={id}>{product ? product.name : 'Unknown Product'}</li>;
                    })}
                </ul>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <Button className="text-xs !px-2 !py-1 bg-brand-light-green hover:bg-brand-green">View Details</Button>
                <Button className="text-xs !px-2 !py-1 bg-red-500 hover:bg-red-700">Deactivate</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FarmerManagement;