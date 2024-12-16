import React, { useState } from 'react';
import { motion } from 'framer-motion';

const OrderPage = () => {
  const [cart, setCart] = useState([]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-red-500 mb-8">Your Order</h1>
      
      {/* Cart Items */}
      <div className="bg-navy-900/50 rounded-lg p-6 mb-8">
        {cart.length === 0 ? (
          <p className="text-gray-400">Your cart is empty</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-white font-bold">{item.title}</h3>
                <p className="text-gray-400">{item.details}</p>
              </div>
              <p className="text-red-500 font-bold">₹{item.price}</p>
            </div>
          ))
        )}
      </div>

      {/* Payment Section */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors"
      >
        Proceed to Payment
      </motion.button>
    </div>
  );
};

export default OrderPage; 