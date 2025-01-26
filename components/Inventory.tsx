'use client';
import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { Inventory } from '@prisma/client';

const InventoryDashboard = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/inventory');
      const data = await response.json();
      setInventoryData(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className='bg-gray-50 min-h-screen p-6'>
      <div className='max-w-7xl mx-auto'>
        {!loading && inventoryData.length > 0 ? (
          <>
            <h2 className='text-3xl font-poppins font-semibold text-gray-800 mb-6'>
              Inventory List
            </h2>
            <div className='bg-white shadow-md rounded-lg overflow-hidden'>
              <table className='min-w-full table-auto'>
                <thead className='bg-gray-800 text-white'>
                  <tr>
                    <th className='px-4 py-3 text-left'>Sr.No</th>
                    <th className='px-4 py-3 text-left'>Item Name</th>
                    <th className='px-4 py-3 text-left'>Category</th>
                    <th className='px-4 py-3 text-left'>Quantity</th>
                    <th className='px-4 py-3 text-left'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((item: Inventory, index: number) => (
                    <tr key={item.id} className='border-b'>
                      <td className='px-4 py-3'>{index + 1}</td>
                      <td className='px-4 py-3'>{item.name}</td>
                      <td className='px-4 py-3'>{item.category}</td>
                      <td className='px-4 py-3'>{item.quantity}</td>
                      <td className='px-4 py-3 text-blue-600 cursor-pointer'>
                        Edit
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className='flex flex-col justify-center items-center h-screen'>
            <Spinner />
            <p className='text-gray-600 mt-4'>Fetching inventory data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryDashboard;
