import React from 'react';
import { CartItem } from '../types';
import Modal from './common/Modal';
import Button from './common/Button';
import { TrashIcon } from './icons';
import { AnimatePresence } from 'framer-motion';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onPlaceOrder: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity, onPlaceOrder }) => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <Modal onClose={onClose} title="Your Shopping Cart">
                    {cartItems.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-sm text-gray-500">৳{item.price}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10))}
                                            className="w-16 p-1 border rounded-md text-center"
                                            min="1"
                                        />
                                        <button onClick={() => onRemoveItem(item.id)} className="p-2 text-red-500 hover:text-red-700">
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="pt-4 text-right">
                                <h3 className="text-lg font-bold">Subtotal: <span className="text-brand-green">৳{subtotal.toFixed(2)}</span></h3>
                                <Button onClick={onPlaceOrder} className="mt-4 w-full">Proceed to Checkout</Button>
                            </div>
                        </div>
                    )}
                </Modal>
            )}
        </AnimatePresence>
    );
};

export default Cart;