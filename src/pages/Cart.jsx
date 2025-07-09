import React from 'react';
import { useCart } from '../components/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discount = 40;
  const tax = 40;
  const total = subtotal - discount + tax;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800">
        <h1 className="text-2xl font-bold mb-6">My Cart</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={item.cartItemId || index}
                className="border rounded-lg p-2 flex flex-col sm:flex-row gap-4 items-start bg-white"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full sm:w-36 h-32 object-cover rounded-md"
                />

                <div className="flex-grow flex flex-col justify-between w-full  ">
                  <div>
                    <h2 className="font-bold">{item.title}</h2>
                    <p className="text-sm text-gray-600">Tier: {item.duration}</p>
                    <p className="text-sm text-gray-600">Starts on: {item.startDate}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-4">
                    <div>
                      <p className="font-semibold text-sm text-gray-800">Rs. {item.price}</p>
                    <p className='text-[10px] text-gray-800"'>inclusive of all taxes and gst</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="flex items-center gap-1 text-sm border px-3 py-1 cursor-pointer rounded-md transition"
                      >
                        <AiFillDelete className="text-base" />
                        Delete
                      </button>
                      <button className="text-xs rounded bg-gradient-to-r from-orange-400 to-orange-600 px-3 py-1 text-white cursor-pointer">
                        Save for later
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <div className="w-full lg:w-[300px] flex-shrink-0">
            <div className="bg-white border p-6 rounded-lg shadow">
              <h2 className="font-semibold mb-4">Order Summary</h2>

              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Discount Voucher"
                  className="flex-grow border px-2 py-1 rounded text-sm"
                />
                <button className="text-xs whitespace-nowrap rounded bg-gradient-to-r from-orange-400 to-orange-600 px-3 py-1 text-white cursor-pointer">
                  Apply
                </button>
              </div>

              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex justify-between"><span>Subtotal:</span> <span>Rs. {subtotal}</span></div>
                <div className="flex justify-between"><span>Discount:</span> <span>Rs. {discount}</span></div>
                <div className="flex justify-between"><span>Tax Charges:</span> <span>Rs. {tax}</span></div>
                <hr />
                <div className="flex justify-between font-bold"><span>Total Amount:</span> <span>Rs. {total}</span></div>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white py-2 rounded-xl cursor-pointer">
                Buy
              </button>
            </div>

            <button className="w-full mt-4 border text-gray-700 py-2 rounded-xl hover:bg-orange-50 transition">
              Continue Exploring
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[linear-gradient(to_right,white,#f0fdf4,#fefce8,white)]">
        <Footer />
      </div>
    </>
  );
};

export default Cart;
