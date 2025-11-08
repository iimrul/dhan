import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { Product, UserRole } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';
import { AnimatePresence } from 'framer-motion';

interface MarketplaceProps {
    onAddToCart: (product: Product) => void;
    userRole: UserRole;
}

const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void; userRole: UserRole }> = ({ product, onAddToCart, userRole }) => {
    return (
        <Card className="flex flex-col">
            <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                <p className="text-sm font-semibold text-gray-500 mb-2">by {product.farmer}</p>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t">
                    <p className="text-2xl font-bold text-brand-green">৳{product.price}</p>
                    {userRole === UserRole.CLIENT && (
                      <Button onClick={() => onAddToCart(product)}>Add to Cart</Button>
                    )}
                </div>
            </div>
        </Card>
    );
};

const Marketplace: React.FC<MarketplaceProps> = ({ onAddToCart, userRole }) => {
    const [products, setProducts] = useState<Product[]>(PRODUCTS);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form state
    const [newProduct, setNewProduct] = useState({ name: '', farmer: '', price: '', description: '' });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        const newProductWithId: Product = {
            name: newProduct.name,
            farmer: newProduct.farmer,
            description: newProduct.description,
            id: products.length + 1 + Date.now(), // More unique ID
            price: parseFloat(newProduct.price),
            image: imagePreview || `https://picsum.photos/seed/${204 + products.length}/400/300`,
        };
        setProducts(prev => [newProductWithId, ...prev]);
        setIsModalOpen(false);
        // Reset form
        setNewProduct({ name: '', farmer: '', price: '', description: '' });
        setImagePreview(null);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.farmer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isAdmin = userRole === UserRole.ADMIN || userRole === UserRole.SUPER_ADMIN;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Marketplace</h2>
                    <p className="text-gray-600">Purchase fresh, organic produce directly from our partner farmers.</p>
                </div>
                {isAdmin && <Button onClick={() => setIsModalOpen(true)}>Add New Product</Button>}
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search for a product or farmer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-light-green"
                />
            </div>
            
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} userRole={userRole} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500">No products found matching your search.</p>
                </div>
            )}

            <AnimatePresence>
                {isModalOpen && (
                    <Modal onClose={() => setIsModalOpen(false)} title="Add New Product">
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <input type="text" placeholder="Product Name (e.g., Organic Rice (5kg))" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full p-2 border rounded" required />
                            <input type="text" placeholder="Farmer Name" value={newProduct.farmer} onChange={e => setNewProduct({...newProduct, farmer: e.target.value})} className="w-full p-2 border rounded" required />
                            <textarea placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full p-2 border rounded" required />
                            <input type="number" placeholder="Price (৳)" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full p-2 border rounded" required min="0" step="0.01" />
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Product preview" className="mx-auto h-24 w-auto rounded-md object-contain" />
                                        ) : (
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                        <div className="flex text-sm text-gray-600 justify-center">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-green hover:text-brand-dark-green focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-light-green">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full">Add Product</Button>
                        </form>
                    </Modal>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Marketplace;